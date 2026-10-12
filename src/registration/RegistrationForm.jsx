import { useEffect, useState } from 'react'
import { REGISTRATION, SESSION_DATES, SESSIONS, registrationSlotId } from '../content.js'
import s from './RegistrationForm.module.css'

async function loadPrincipal() {
  if (import.meta.env.DEV) {
    return { identityProvider: 'github', userDetails: 'preview-github-user', userId: 'local-preview' }
  }
  const response = await fetch('/.auth/me', { headers: { Accept: 'application/json' } })
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Auth host unavailable')
  const payload = await response.json()
  return payload.clientPrincipal
}

export default function RegistrationForm({ postLoginRedirect = '/?register=1' }) {
  const [principal, setPrincipal] = useState(undefined)
  const [authUnavailable, setAuthUnavailable] = useState(false)
  const [slots, setSlots] = useState([])
  const [activeDate, setActiveDate] = useState(SESSION_DATES[0].id)
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [environment, setEnvironment] = useState('local')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadPrincipal().then(setPrincipal).catch(() => { setPrincipal(null); setAuthUnavailable(true) })
  }, [])

  const signedIn = principal?.identityProvider === 'github'
  const valid = signedIn && slots.length > 0 && company.trim() && email.trim() && consent
  const selectedDateCount = new Set(slots.map((slot) => slot.split('|')[0])).size
  const loginUrl = `/.auth/login/github?post_login_redirect_uri=${encodeURIComponent(postLoginRedirect)}`

  const toggleSlot = (id) => setSlots((current) => (
    current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
  ))

  const submit = async (event) => {
    event.preventDefault()
    if (!valid || status === 'submitting') return
    setStatus('submitting')
    setMessage('')
    try {
      if (import.meta.env.DEV) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      } else {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ company: company.trim(), email: email.trim(), sessions: slots, environment, consent }),
        })
        const result = await response.json()
        if (!response.ok) throw new Error(result.error || 'Registration could not be saved')
      }
      setStatus('success')
      setMessage(`Thanks @${principal.userDetails}. Your registration is saved.`)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  if (principal === undefined) {
    return <div className={s.authCard}><span className={s.spinner} /> Checking GitHub sign-in…</div>
  }

  if (!signedIn) {
    return (
      <div className={s.authCard}>
        <span className={s.githubMark}>GH</span>
        <div>
          <h3>Sign in with GitHub to register</h3>
          <p>Your handle comes directly from GitHub, so it is valid and typo-free.</p>
          {authUnavailable && <small>GitHub sign-in is temporarily unavailable. Please try again shortly.</small>}
        </div>
        <a className={s.signIn} href={loginUrl}>Continue with GitHub</a>
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={submit}>
      <div className={s.identity}>
        <span className={s.avatar} aria-hidden="true">GH</span>
        <div><span>Verified GitHub account</span><strong>@{principal.userDetails}</strong></div>
        {!import.meta.env.DEV && <a href="/.auth/logout?post_logout_redirect_uri=/">Use another account</a>}
      </div>

      <div className={s.fields}>
        <label>
          <span>Company or organisation</span>
          <input required autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label>
          <span>Company email address</span>
          <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      <fieldset className={s.sessionField}>
        <legend>Choose your dates and session times</legend>
        <p className={s.sessionHint}>{REGISTRATION.slotHelp}</p>
        <div className={s.dateTabs} role="tablist" aria-label="Choose a bootcamp date">
          {SESSION_DATES.map((date) => {
            const count = slots.filter((slot) => slot.startsWith(`${date.id}|`)).length
            return (
              <button
                key={date.id}
                type="button"
                role="tab"
                aria-selected={date.id === activeDate}
                className={date.id === activeDate ? s.dateTabOn : ''}
                onClick={() => setActiveDate(date.id)}
              >
                <span>{date.short}</span>
                <small>{count ? `${count} selected` : 'Choose sessions'}</small>
              </button>
            )
          })}
        </div>
        <div className={s.sessionGrid} role="tabpanel">
          {SESSIONS.map((session) => {
            const id = registrationSlotId(activeDate, session)
            const selected = slots.includes(id)
            return (
              <label key={session.id} className={selected ? s.sessionOn : ''}>
                <input type="checkbox" checked={selected} onChange={() => toggleSlot(id)} />
                <time dateTime={session.time}>{session.time}</time>
                <span><strong>{session.number} · {session.title}</strong><small>Owner · {session.owner}</small></span>
                <i aria-hidden="true">{selected ? '✓' : '+'}</i>
              </label>
            )
          })}
        </div>
        <p className={s.selectionSummary}>
          {slots.length
            ? `${slots.length} session time${slots.length === 1 ? '' : 's'} selected across ${selectedDateCount} date${selectedDateCount === 1 ? '' : 's'}`
            : 'No date or session time selected yet'}
        </p>
      </fieldset>

      <fieldset className={s.environment}>
        <legend>Development environment</legend>
        {REGISTRATION.environments.map((option) => (
          <label key={option.id}>
            <input type="radio" name="environment" value={option.id} checked={environment === option.id} onChange={(e) => setEnvironment(e.target.value)} />
            <span><strong>{option.label}</strong><small>{option.desc}</small></span>
          </label>
        ))}
      </fieldset>

      <label className={s.consent}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{REGISTRATION.consent}</span>
      </label>

      <div className={s.submitRow}>
        <button type="submit" disabled={!valid || status === 'submitting' || status === 'success'}>
          {status === 'submitting' ? 'Saving…' : status === 'success' ? 'Registered ✓' : 'Submit registration'}
        </button>
        <small>We never ask for or store your GitHub password.</small>
      </div>
      {message && <p className={`${s.message} ${status === 'error' ? s.error : ''}`} role="status">{message}</p>}
    </form>
  )
}
