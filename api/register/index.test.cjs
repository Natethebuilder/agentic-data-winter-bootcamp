const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const test = require('node:test')
const register = require('./index.js')
const siteState = require('../site-state.json')
const { consentVersion } = require('../consent-version.json')

// These tests exercise the on-site registration path (state 1) whatever api/site-state.json is
// set to. State tests switch with withRegistrationState.
siteState.registration = 1

const registrationToken = '123e4567-e89b-42d3-a456-426614174000'

function request(body) {
  return { headers: {}, body }
}

function validBody() {
  return {
    company: 'Example Org',
    email: 'Builder@Example.com',
    emailConfirmation: 'builder@example.com',
    registrationToken,
    sessions: ['2026-12-04|09:00|foundations', '2027-01-22|14:30|nosql'],
    environment: 'cloud',
    consent: true,
  }
}

// Mirrors the Power Automate HTTP response: 202 with an outcome, 409 on an email mismatch.
function flowReply(status, body = { ok: true, outcome: 'created' }) {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
  }
}

async function registerWithFlowReply(reply) {
  configuredEnvironment()
  global.fetch = async () => reply
  const context = {}
  await register(context, request(validBody()))
  return context.res
}

async function withRegistrationState(state, run) {
  const original = siteState.registration
  siteState.registration = state
  try {
    await run()
  } finally {
    siteState.registration = original
  }
}

function configuredEnvironment() {
  process.env.REGISTRATION_FLOW_URL = 'https://flow.example.test/register'
  process.env.REGISTRATION_FLOW_SHARED_SECRET = 'test-only-secret'
}

test('rejects mismatched email confirmation', async () => {
  configuredEnvironment()
  const context = {}
  const body = validBody()
  body.emailConfirmation = 'different@example.com'
  await register(context, request(body))
  assert.equal(context.res.status, 400)
})

test('rejects unknown or duplicate date and session slots', async () => {
  configuredEnvironment()
  const context = {}
  const body = validBody()
  body.sessions = ['2026-12-04|09:00|foundations', '2026-12-04|09:00|foundations']
  await register(context, request(body))
  assert.equal(context.res.status, 400)
})

test('accepts registrations while registration is open (state 1)', async () => {
  configuredEnvironment()
  let called = false
  global.fetch = async () => {
    called = true
    return flowReply(202)
  }
  await withRegistrationState(1, async () => {
    const context = {}
    await register(context, request(validBody()))
    assert.equal(context.res.status, 202)
    assert.equal(called, true)
  })
})

test('refuses registrations in every state other than open on this site, failing closed', async () => {
  const cases = [
    [2, 'Registration will open soon.'],
    [3, 'Registration is closed.'],
    [4, 'Registration has moved to a new form. Refresh this page to register.'],
    [0, 'Registration is not open.'],
    [5, 'Registration is not open.'],
    ['1', 'Registration is not open.'],
    ['4', 'Registration is not open.'],
    [null, 'Registration is not open.'],
    [undefined, 'Registration is not open.'],
  ]
  for (const [state, error] of cases) {
    configuredEnvironment()
    let called = false
    global.fetch = async () => {
      called = true
      return flowReply(202)
    }
    await withRegistrationState(state, async () => {
      const context = {}
      await register(context, request(validBody()))
      assert.equal(context.res.status, 403, `state ${String(state)}`)
      assert.deepEqual(context.res.body, { error }, `state ${String(state)}`)
      assert.equal(called, false, `state ${String(state)}`)
    })
  }
})

test('refuses the on-site form once registration moves to the Microsoft Form (state 4)', async () => {
  configuredEnvironment()
  let called = false
  global.fetch = async () => {
    called = true
    return flowReply(202)
  }
  const original = siteState.registrationFormUrl
  siteState.registrationFormUrl = 'https://forms.office.com/Pages/ResponsePage.aspx?id=sample'
  try {
    await withRegistrationState(4, async () => {
      const context = {}
      await register(context, request(validBody()))
      assert.equal(context.res.status, 403)
      assert.equal(context.res.headers['Cache-Control'], 'no-store')
      assert.deepEqual(context.res.body, {
        error: 'Registration has moved to a new form. Refresh this page to register.',
      })
      assert.equal(called, false)
    })
  } finally {
    siteState.registrationFormUrl = original
  }
})

test('reports a new registration as received and returns the token', async () => {
  const res = await registerWithFlowReply(flowReply(202, { ok: true, outcome: 'created' }))
  assert.equal(res.status, 202)
  assert.deepEqual(res.body, { ok: true, outcome: 'received', registrationToken })
})

test('answers an already registered email exactly like a new registration', async () => {
  const created = await registerWithFlowReply(flowReply(202, { ok: true, outcome: 'created' }))
  const unchanged = await registerWithFlowReply(flowReply(202, { ok: true, outcome: 'unchanged' }))
  assert.equal(unchanged.status, created.status)
  assert.deepEqual(unchanged.headers, created.headers)
  assert.deepEqual(unchanged.body, created.body)
  assert.deepEqual(unchanged.body, { ok: true, outcome: 'received', registrationToken })
})

test('treats a flow reply without a readable outcome as received', async () => {
  const replies = [
    flowReply(202, { ok: true }),
    flowReply(202, ''),
    flowReply(202, 'Accepted'),
    flowReply(202, { ok: true, outcome: 'something-new' }),
    { ok: true, status: 202 },
    { ok: true, status: 202, text: async () => { throw new Error('body unavailable') } },
  ]
  for (const reply of replies) {
    const res = await registerWithFlowReply(reply)
    assert.equal(res.status, 202)
    assert.deepEqual(res.body, { ok: true, outcome: 'received', registrationToken })
  }
})

test('reports an update when the flow updated the saved registration', async () => {
  const res = await registerWithFlowReply(flowReply(202, { ok: true, outcome: 'updated' }))
  assert.equal(res.status, 202)
  assert.deepEqual(res.body, { ok: true, outcome: 'updated', registrationToken })
})

test('maps an email mismatch to 409 without returning a token', async () => {
  const res = await registerWithFlowReply(flowReply(409, { ok: false, outcome: 'email-mismatch' }))
  assert.equal(res.status, 409)
  assert.deepEqual(res.body, {
    error:
      'This email address doesn\u2019t match the registration saved in this browser. Check the address, or choose "Not you? Start a new registration".',
    code: 'registration-email-mismatch',
  })
})

test('reports other flow failures as 502', async () => {
  for (const status of [400, 401, 404, 500]) {
    const res = await registerWithFlowReply(flowReply(status, { ok: false }))
    assert.equal(res.status, 502, `flow status ${status}`)
    assert.deepEqual(res.body, { error: 'Registration storage rejected the request.' })
  }
})

test('sends the server-side consent wording version, ignoring caller values', async () => {
  configuredEnvironment()
  let payload
  global.fetch = async (url, options) => {
    payload = JSON.parse(options.body)
    return flowReply(202)
  }
  const body = validBody()
  body.consentVersion = 'caller-controlled'
  await register({}, request(body))

  assert.match(consentVersion, /^\d{4}-\d{2}-\d{2}$/)
  assert.ok(consentVersion.length >= 1 && consentVersion.length <= 40)
  assert.equal(payload.consentVersion, consentVersion)
})

test('requires the shared backend URL', async () => {
  delete process.env.REGISTRATION_FLOW_URL
  delete process.env.REGISTRATION_FLOW_SHARED_SECRET
  const context = {}
  await register(context, request(validBody()))
  assert.equal(context.res.status, 503)
})

test('forwards validated slots in a deterministic upsert payload', async () => {
  configuredEnvironment()
  let received
  global.fetch = async (url, options) => {
    received = { url, options, body: JSON.parse(options.body) }
    return flowReply(202)
  }

  const context = {}
  await register(context, request(validBody()))

  assert.equal(context.res.status, 202)
  // The flow's trigger schema rejects unknown fields, so the payload must not grow by accident.
  assert.deepEqual(Object.keys(received.body).sort(), [
    'company',
    'companyEmail',
    'consent',
    'consentVersion',
    'environmentPreference',
    'eventId',
    'registrationEmailKey',
    'registrationId',
    'sessionSelections',
    'updatedAt',
  ])
  assert.equal(received.body.consent, true)
  assert.equal(received.body.consentVersion, consentVersion)
  assert.equal(String(received.url), 'https://flow.example.test/register')
  assert.equal(received.options.headers['x-registration-secret'], 'test-only-secret')
  assert.equal(received.body.companyEmail, 'builder@example.com')
  assert.equal(received.body.eventId, 'agentic-data-winter-bootcamp')
  assert.deepEqual(received.body.sessionSelections, validBody().sessions)
  assert.equal(received.body.environmentPreference, 'cloud')
  assert.equal('githubUserId' in received.body, false)
  assert.equal('githubUsername' in received.body, false)
  assert.equal('email' in received.body, false)
  assert.equal('sessions' in received.body, false)
  assert.equal('environment' in received.body, false)
  assert.equal(
    received.body.registrationId,
    createHash('sha256').update(`agentic-data-winter-bootcamp:${registrationToken}`).digest('hex'),
  )
  assert.equal(
    received.body.registrationEmailKey,
    createHash('sha256').update('agentic-data-winter-bootcamp:builder@example.com').digest('hex'),
  )
  assert.equal(context.res.body.registrationToken, registrationToken)
  assert.equal('registrationEmailKey' in context.res.body, false)
})

test('gives a slow flow time to answer within the 45 s Static Web Apps limit', async () => {
  configuredEnvironment()
  const timeout = AbortSignal.timeout
  let timeoutMs
  AbortSignal.timeout = (ms) => {
    timeoutMs = ms
    return timeout.call(AbortSignal, ms)
  }
  global.fetch = async () => flowReply(202)

  const context = {}
  try {
    await register(context, request(validBody()))
  } finally {
    AbortSignal.timeout = timeout
  }

  assert.equal(context.res.status, 202)
  assert.ok(timeoutMs >= 20_000)
  assert.ok(timeoutMs < 45_000)
})

test('derives the email key from normalized input and ignores caller values', async () => {
  configuredEnvironment()
  const payloads = []
  global.fetch = async (url, options) => {
    payloads.push(JSON.parse(options.body))
    return flowReply(202)
  }

  const normalized = validBody()
  normalized.email = '  BUILDER@EXAMPLE.COM '
  normalized.emailConfirmation = 'builder@example.com'
  normalized.registrationEmailKey = 'caller-controlled'
  await register({}, request(normalized))

  const sameEmail = validBody()
  await register({}, request(sameEmail))

  const differentEmail = validBody()
  differentEmail.email = 'another@example.com'
  differentEmail.emailConfirmation = 'another@example.com'
  await register({}, request(differentEmail))

  assert.equal(payloads[0].registrationEmailKey, payloads[1].registrationEmailKey)
  assert.notEqual(payloads[0].registrationEmailKey, payloads[2].registrationEmailKey)
  assert.notEqual(payloads[0].registrationEmailKey, normalized.registrationEmailKey)
})
