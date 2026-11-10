import { useEffect, useRef, useState } from 'react'
import { REGISTRATION_MICROSOFT_FORM as FORM } from '../content.js'
import { REGISTRATION_FORM_EMBED_URL, REGISTRATION_FORM_URL } from '../siteState.js'
import s from './MicrosoftFormRegistration.module.css'

// Registration state 4: the bootcamp's Microsoft Form replaces the on-site form.

function NewTabLink() {
  return (
    <a className={s.newTab} href={REGISTRATION_FORM_URL} target="_blank" rel="noopener noreferrer">
      {FORM.newTab} <span aria-hidden="true">↗</span>
    </a>
  )
}

function FormFrame({ frameRef, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`${s.frameWrap} ${className}`}>
      {!loaded && <p className={s.loading} role="status">{FORM.loading}</p>}
      <iframe
        ref={frameRef}
        className={s.frame}
        src={REGISTRATION_FORM_EMBED_URL}
        title={FORM.frameTitle}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function Toolbar() {
  return (
    <div className={s.toolbar}>
      <p className={s.note}>{FORM.provider}</p>
      <NewTabLink />
    </div>
  )
}

// For privacy and performance nothing loads from Microsoft Forms until the visitor chooses
// Start registration.
export default function MicrosoftFormRegistration() {
  const [started, setStarted] = useState(false)
  const cardRef = useRef(null)
  const frameRef = useRef(null)

  // The Start button disappears, so move focus to the form and bring it into view.
  useEffect(() => {
    if (!started) return
    cardRef.current?.scrollIntoView({ block: 'start' })
    frameRef.current?.focus({ preventScroll: true })
  }, [started])

  return (
    <div ref={cardRef} className={`${s.card} ${started ? s.started : ''}`}>
      {started ? (
        <>
          <Toolbar />
          <FormFrame frameRef={frameRef} />
        </>
      ) : (
        <>
          <div className={s.notice}>
            <span aria-hidden="true">GH</span>
            <div>
              <strong>{FORM.access.title}</strong>
              <p>{FORM.access.body}</p>
            </div>
          </div>
          <h3 className={s.heading}>{FORM.heading}</h3>
          <p className={s.intro}>{FORM.intro}</p>
          <ol className={s.needs} role="list">
            {FORM.needs.map((need, i) => (
              <li key={need.title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{need.title}</strong>
                  <small>{need.desc}</small>
                </div>
              </li>
            ))}
          </ol>
          <div className={s.actions}>
            <button type="button" className={s.start} onClick={() => setStarted(true)}>
              {FORM.start} <span aria-hidden="true">→</span>
            </button>
            <NewTabLink />
          </div>
          <p className={s.note}>{FORM.provider} {FORM.privacy}</p>
        </>
      )}
    </div>
  )
}

// The deck's registration dialog shows the form straight away: opening the dialog is already the
// visitor's choice.
export function MicrosoftFormFrame() {
  return (
    <div className={s.dialog}>
      <Toolbar />
      <FormFrame className={s.dialogFrame} />
    </div>
  )
}
