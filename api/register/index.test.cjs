const assert = require('node:assert/strict')
const { createHash } = require('node:crypto')
const test = require('node:test')
const register = require('./index.js')

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
    return { ok: true }
  }

  const context = {}
  await register(context, request(validBody()))

  assert.equal(context.res.status, 202)
  assert.equal(String(received.url), 'https://flow.example.test/register')
  assert.equal(received.options.headers['x-registration-secret'], 'test-only-secret')
  assert.equal(received.body.email, 'builder@example.com')
  assert.equal(received.body.eventId, 'agentic-data-winter-bootcamp')
  assert.equal(received.body.githubUserId, 'not-collected')
  assert.equal(received.body.githubUsername, 'not-collected')
  assert.deepEqual(received.body.sessions, validBody().sessions)
  assert.equal(
    received.body.registrationId,
    createHash('sha256').update(`agentic-data-winter-bootcamp:${registrationToken}`).digest('hex'),
  )
  assert.equal(context.res.body.registrationToken, registrationToken)
})
