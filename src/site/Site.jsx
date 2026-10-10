import { useEffect, useRef, useState } from 'react'
import { Logos, Mascot, Snowflake } from '../winter/Decor.jsx'
import { SnowToggle } from '../winter/Snowfall.jsx'
import { AgentTerminal, Countdown, ScheduleQuery } from '../data/DataViz.jsx'
import SetupWizard from '../setup/SetupWizard.jsx'
import RegistrationForm from '../registration/RegistrationForm.jsx'
import {
  BOOTCAMP, FAQ, PERSONAS, PILLARS, PREP, REGISTRATION, SESSIONS, TOOLBOX,
} from '../content.js'
import s from './Site.module.css'

const NAV = [
  ['why', 'Why join'],
  ['lineup', 'Lineup'],
  ['schedule', 'Schedule'],
  ['toolbox', 'Toolbox'],
  ['prepare', 'Get ready'],
  ['faq', 'FAQ'],
]

const PREP_KEY = 'winter-bootcamp:prep'

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const els = root.querySelectorAll(`.${s.reveal}`)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add(s.in)),
      { root, threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))

    // Items pop in as they scroll into view; long single-column phone sections otherwise feel static
    const items = root.querySelectorAll(`.${s.grid} > *, .${s.checkItem}, .${s.faqItem}, .${s.personaBox}, .${s.flow}`)
    const itemIo = new IntersectionObserver((entries) => {
      entries.filter((e) => e.isIntersecting).forEach((e, k) => {
        e.target.style.setProperty('--i', k)
        e.target.classList.add(s.popIn)
        itemIo.unobserve(e.target)
      })
    }, { root, threshold: 0.15, rootMargin: '0px 0px -6% 0px' })
    items.forEach((el) => { el.classList.add(s.pop); itemIo.observe(el) })

    return () => { io.disconnect(); itemIo.disconnect() }
  }, [rootRef])
}

// Each section is a self-contained, full-height panel so it reads on its own.
function Section({ id, idx, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className={s.panel} data-panel>
      <div className={`${s.section} ${s.reveal}`}>
        <div className={s.sectionHead}>
          <p className={s.eyebrow}><span className={s.eyebrowIdx}>{idx}</span>{eyebrow}</p>
          <h2>{title}</h2>
          {subtitle && <p className={s.lead}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

function useActiveSection(rootRef) {
  const [active, setActive] = useState('top')
  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root, rootMargin: '-45% 0px -50% 0px' },
    )
    root.querySelectorAll('[data-panel]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
  return active
}

function PersonaPicker() {
  const [sel, setSel] = useState(PERSONAS[0].id)
  const p = PERSONAS.find((x) => x.id === sel)
  return (
    <div className={s.personaBox}>
      <div className={s.personaTabs} role="tablist" aria-label="Pick your role">
        <span className={s.personasLabel}>Made for</span>
        {PERSONAS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={x.id === sel}
            className={`${s.persona} ${x.id === sel ? s.personaOn : ''}`}
            onClick={() => setSel(x.id)}
          >
            {x.icon} {x.label}
          </button>
        ))}
      </div>
      <div className={s.personaPanel} role="tabpanel" key={sel}>
        <p>{p.does}</p>
        <div className={s.stack}>
          <span className={s.stackLabel}>your stack</span>
          {p.stack.map((t) => <span key={t} className={s.stackChip}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

function ProgrammeReveal() {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.programmeReveal}>
      <button
        type="button"
        className={`${s.programmeGift} ${open ? s.programmeGiftOpen : ''}`}
        aria-expanded={open}
        aria-controls="programme-sessions"
        onClick={() => setOpen(true)}
      >
        <span className={s.programmeGiftInside}>
          <span>Full programme</span>
          <strong>Six sessions unwrapped</strong>
          <small>{open ? 'Everything is below' : 'Open once to reveal everything'}</small>
        </span>
        <span className={s.programmeGiftPaper} aria-hidden="true" />
        <span className={s.programmeRibbonV} aria-hidden="true" />
        <span className={s.programmeRibbonH} aria-hidden="true" />
        <span className={s.programmeGiftLid} aria-hidden="true">
          <span className={s.programmeBow}>◆</span>
        </span>
        <span className={s.programmeGiftLabel}>{open ? 'Programme open' : 'Unwrap the programme'}</span>
      </button>

      {open && (
        <div id="programme-sessions" className={s.sessionList}>
          {SESSIONS.map((session, index) => (
            <article key={session.id} className={s.sessionRow} style={{ '--i': index }}>
              <div className={s.sessionTop}>
                <span className={s.sessionNumber}>{session.number}</span>
                <span className={s.sessionIcon} aria-hidden="true">{session.icon}</span>
                <div className={s.sessionHeading}>
                  <span className={s.sessionAudience}>{session.audience}</span>
                  <h3>{session.title}</h3>
                  <p>{session.subtitle}</p>
                </div>
                <div className={s.sessionLead}>
                  <span>Session lead</span>
                  <strong>{session.lead}</strong>
                </div>
              </div>

              <p className={s.sessionOverview}>{session.overview}</p>

              <div className={s.sessionDepth}>
                <div>
                  <h4>What you will explore</h4>
                  <ul>
                    {session.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
                  </ul>
                </div>
                <div className={s.sessionChallenge}>
                  <span>Hands-on challenge</span>
                  <p>{session.challenge}</p>
                  <div className={s.sessionTools}>
                    {session.tools.map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function PrepChecklist() {
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PREP_KEY)) || {} } catch { return {} }
  })
  useEffect(() => {
    try { localStorage.setItem(PREP_KEY, JSON.stringify(done)) } catch { /* ignore */ }
  }, [done])

  const count = PREP.filter((p) => done[p.id]).length
  const pct = Math.round((count / PREP.length) * 100)
  const all = count === PREP.length

  return (
    <div className={s.checklist}>
      <div className={s.checkHead}>
        <div>
          <span className={s.checkScore}>{count}/{PREP.length}</span>
          <span className={s.checkLabel}>{all ? 'All checks passed. You are ready.' : 'checks passed'}</span>
        </div>
        <div className={s.progress} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ul>
        {PREP.map((p) => (
          <li key={p.id}>
            <label className={`${s.checkItem} ${done[p.id] ? s.checked : ''}`}>
              <input
                type="checkbox"
                checked={Boolean(done[p.id])}
                onChange={(e) => setDone((d) => ({ ...d, [p.id]: e.target.checked }))}
              />
              <span className={s.checkBox} aria-hidden="true">{done[p.id] ? '✓' : ''}</span>
              <span className={s.checkIcon} aria-hidden="true">{p.icon}</span>
              <span className={s.checkText}>
                <strong>{p.title}</strong>
                <small>{p.desc}</small>
              </span>
              <span className={`${s.badge} ${done[p.id] ? s.badgePass : ''}`}>{done[p.id] ? 'PASS' : 'PENDING'}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Site({ snow, onToggleSnow }) {
  const rootRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  useReveal(rootRef)
  const active = useActiveSection(rootRef)

  const go = (id) => rootRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('register') === '1') {
      const id = setTimeout(() => go('join'), 100)
      return () => clearTimeout(id)
    }
    return undefined
  }, [])

  return (
    <div className={s.site} ref={rootRef} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 40)}>

      <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <button type="button" className={s.brand} onClick={() => go('top')}>
          <span className={s.brandMark}><Snowflake className={s.brandFlake} /></span>
          <span className={s.brandText}><small>Agentic Data</small><strong>Winter Bootcamp</strong></span>
        </button>
        <nav className={s.navLinks} aria-label="Sections">
          {NAV.map(([id, label]) => (
            <button key={id} type="button" className={active === id ? s.navActive : ''} aria-current={active === id ? 'true' : undefined} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <div className={s.navActions}>
          <SnowToggle enabled={snow} onToggle={onToggleSnow} />
          <button
            type="button"
            className={`${s.btnPrimary} ${s.navRegister} ${active === 'join' ? s.navRegisterActive : ''}`}
            aria-current={active === 'join' ? 'true' : undefined}
            onClick={() => go('join')}
          >
            Register
          </button>
          <a className={`${s.btnGhost} ${s.navDeck}`} href="#/deck">▶ Deck</a>
        </div>
      </header>

      <main>
        <section id="top" className={`${s.panel} ${s.heroPanel}`} data-panel>
          <div className={s.hero}>
          <div className={s.heroText}>
            <span className={s.pill}>❄️ {BOOTCAMP.season} · Online · Free · For the data community</span>
            <h1>
              Agentic Data Engineering <span className={s.highlight}>Winter Bootcamp</span>
            </h1>
            <p className={s.heroLead}>
              <strong>{BOOTCAMP.tagline}</strong> {BOOTCAMP.subtitle}
            </p>
            <div className={s.ctaRow}>
              <a className={s.btnGhost} href="#/deck">▶ Present the deck</a>
              <button type="button" className={s.btnGhost} onClick={() => go('lineup')}>See the lineup</button>
              <button type="button" className={s.btnPrimary} onClick={() => go('join')}>Register now</button>
            </div>
            <Countdown
              target={BOOTCAMP.kickoff}
              date={BOOTCAMP.kickoffDate}
              dateLabel={BOOTCAMP.kickoffLabel}
              className={s.countdown}
            />
          </div>
          <div className={s.heroArt}>
            <AgentTerminal className={s.terminal}>
              <Mascot className={s.perched} />
            </AgentTerminal>
            <Logos size="md" className={s.heroLogos} />
          </div>
          </div>
          <button type="button" className={s.scrollCue} onClick={() => go('why')} aria-label="Next section">
            <span>scroll</span><i aria-hidden="true">↓</i>
          </button>
        </section>

        <Section
          id="why"
          idx="01"
          eyebrow="Why join"
          title="Engineer data with agents. Ship data products."
          subtitle="A hands-on programme for the data community, following the Summer Bootcamp for developers."
        >
          <div className={`${s.grid} ${s.g3}`}>
            {PILLARS.map((p) => (
              <article key={p.id} className={s.card}>
                <span className={s.icon}>{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
          <PersonaPicker />
        </Section>


        <Section
          id="lineup"
          idx="02"
          eyebrow="The lineup"
          title="One gift. The full programme."
          subtitle="Unwrap once to see every confirmed session, the lead, the tools and the hands-on challenge."
        >
          <ProgrammeReveal />
        </Section>

        <Section
          id="schedule"
          idx="03"
          eyebrow="Schedule"
          title="Start with Foundations. Choose your path."
          subtitle="Six Fridays from 4 December 2026 to 22 January 2027. Foundations prepares your machine for every hands-on challenge."
        >
          <ScheduleQuery />
        </Section>

        <Section
          id="toolbox"
          idx="04"
          eyebrow="The toolbox"
          title="Fabric expertise, packaged for your agent"
          subtitle="The building blocks we use to turn GitHub Copilot into a Microsoft Fabric data engineer."
        >
          <div className={`${s.grid} ${s.g4}`}>
            {TOOLBOX.map((t) => (
              <article key={t.id} className={s.card}>
                <span className={s.num}>{t.num}</span>
                <span className={s.kicker}>{t.kicker}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </article>
            ))}
          </div>
          <div className={s.flow}>
            <span>Agent orchestrates</span><i>→</i><span>Skill guides</span><i>→</i>
            <span>Fabric CLI executes</span><i>↔</i><span>MCP connects live tools</span>
          </div>
        </Section>

        <Section
          id="prepare"
          idx="05"
          eyebrow="Get ready"
          title="Pre-flight checks"
          subtitle="Run the foundations setup, sign in, then tick off the checks. Checklist progress stays in this browser only."
        >
          <div className={s.setupStack}>
            <SetupWizard />
            <PrepChecklist />
          </div>
        </Section>

        <Section id="faq" idx="06" eyebrow="FAQ" title="Frequently asked questions">
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section
          id="join"
          idx="07"
          eyebrow={REGISTRATION.eyebrow}
          title={REGISTRATION.title}
          subtitle={REGISTRATION.subtitle}
        >
          <RegistrationForm />
        </Section>

        <footer className={s.footer}>
          <Logos size="sm" />
          <p>
            Educational workshop series delivered by Microsoft. Not a consulting engagement. Use sample or
            synthetic data only. Workshop outputs are learning artifacts.
          </p>
          <p className={s.footerSmall}>Built with DECKIO</p>
        </footer>
      </main>
    </div>
  )
}
