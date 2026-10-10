const { createHash } = require('node:crypto')

const SESSION_IDS = new Set(['foundations', 'analysts', 'lakehouse', 'open-source', 'sql', 'nosql'])
const ENVIRONMENTS = new Set(['local', 'cloud'])

function response(status, body) {
  return { status, headers: { 'Content-Type': 'application/json' }, body }
}

function getHeader(req, name) {
  if (typeof req.headers?.get === 'function') return req.headers.get(name)
  return req.headers?.[name] || req.headers?.[name.toLowerCase()]
}

function readPrincipal(req) {
  const header = getHeader(req, 'x-ms-client-principal')
  if (!header) return null
  return JSON.parse(Buffer.from(header, 'base64').toString('utf8'))
}

module.exports = async function register(context, req) {
  let principal
  try {
    principal = readPrincipal(req)
  } catch {
    context.res = response(401, { error: 'Invalid authentication context.' })
    return
  }

  if (!principal || principal.identityProvider !== 'github' || !principal.userDetails || !principal.userId) {
    context.res = response(401, { error: 'Sign in with GitHub before registering.' })
    return
  }

  const body = req.body || {}
  const company = typeof body.company === 'string' ? body.company.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const requestedSessions = Array.isArray(body.sessions) ? body.sessions : []
  const sessions = [...new Set(requestedSessions.filter((id) => SESSION_IDS.has(id)))]
  const environment = ENVIRONMENTS.has(body.environment) ? body.environment : ''

  if (!company || company.length > 160) {
    context.res = response(400, { error: 'Enter a valid company or organisation.' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    context.res = response(400, { error: 'Enter a valid company email address.' })
    return
  }
  if (!sessions.length || sessions.length !== requestedSessions.length) {
    context.res = response(400, { error: 'Choose at least one session.' })
    return
  }
  if (!environment || body.consent !== true) {
    context.res = response(400, { error: 'Choose an environment and provide data consent.' })
    return
  }

  const flowUrl = process.env.REGISTRATION_FLOW_URL
  if (!flowUrl) {
    context.res = response(503, { error: 'Registration storage is not configured yet.' })
    return
  }

  const payload = {
    registrationId: createHash('sha256').update(principal.userId).digest('hex'),
    githubUserId: principal.userId,
    githubUsername: principal.userDetails,
    company,
    email,
    sessions,
    environment,
    consent: true,
    updatedAt: new Date().toISOString(),
  }

  const headers = { 'Content-Type': 'application/json' }
  if (process.env.REGISTRATION_FLOW_SHARED_SECRET) {
    headers['x-registration-secret'] = process.env.REGISTRATION_FLOW_SHARED_SECRET
  }

  let flowResponse
  try {
    flowResponse = await fetch(flowUrl, { method: 'POST', headers, body: JSON.stringify(payload) })
  } catch {
    context.res = response(502, { error: 'Registration storage is temporarily unavailable.' })
    return
  }

  if (!flowResponse.ok) {
    context.res = response(502, { error: 'Registration storage rejected the request.' })
    return
  }

  context.res = response(202, { ok: true })
}
