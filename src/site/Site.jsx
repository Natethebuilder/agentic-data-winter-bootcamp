import { useEffect, useMemo, useRef, useState } from 'react'
import { ChristmasLights, Logos, Mascot, Snowflake } from '../winter/Decor.jsx'
import { SnowToggle } from '../winter/Snowfall.jsx'
import { Gift } from '../slides/WinterSlides.jsx'
import {
  BOOTCAMP, FAQ, PERSONAS, PILLARS, PREP, REGISTER_STEPS, SESSIONS, TOOLBOX, WEEKS,
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

function daysUntilChristmas(now = new Date()) {
  let xmas = new Date(now.getFullYear(), 11, 25)
  if (now > new Date(now.getFullYear(), 11, 25, 23, 59, 59)) xmas = new Date(now.getFullYear() + 1, 11, 25)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((xmas - start) / 86400000)
}

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
    return () => io.disconnect()
  }, [rootRef])
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className={`${s.section} ${s.reveal}`}>
      <div className={s.sectionHead}>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h2>{title}</h2>
        {subtitle && <p className={s.lead}>{subtitle}</p>}
      </div>
      {children}
    </section>
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
  const nice = count === PREP.length

  return (
    <div className={s.checklist}>
      <div className={s.checkHead}>
        <div>
          <span className={s.checkScore}>{count}/{PREP.length}</span>
          <span className={s.checkLabel}>{nice ? "You're on the nice list 🎅" : 'Checking it twice…'}</span>
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
              <span>
                <strong>{p.title}</strong>
                <small>{p.desc}</small>
              </span>
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
  const sleeps = useMemo(() => daysUntilChristmas(), [])
  useReveal(rootRef)

  const go = (id) => rootRef.current?.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className={s.site} ref={rootRef} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 40)}>
      <ChristmasLights count={36} className={s.lights} />

      <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <button type="button" className={s.brand} onClick={() => go('top')}>
          <Snowflake className={s.brandFlake} />
          <span>Winter Bootcamp</span>
        </button>
        <nav className={s.navLinks} aria-label="Sections">
          {NAV.map(([id, label]) => (
            <button key={id} type="button" onClick={() => go(id)}>{label}</button>
          ))}
        </nav>
        <div className={s.navActions}>
          <SnowToggle enabled={snow} onToggle={onToggleSnow} />
          <a className={s.btnPrimary} href="#/deck">▶ Deck</a>
        </div>
      </header>

      <main>
        <section id="top" className={s.hero}>
          <div className={s.heroText}>
            <span className={s.pill}>❄️ {BOOTCAMP.season} · Online · Free</span>
            <h1>
              Agentic Data Engineering <span className={s.highlight}>Winter Bootcamp</span>
            </h1>
            <p className={s.heroLead}>
              <strong>{BOOTCAMP.tagline}</strong> {BOOTCAMP.subtitle}
            </p>
            <div className={s.ctaRow}>
              <a className={s.btnPrimary} href="#/deck">▶ Present the deck</a>
              <button type="button" className={s.btnGhost} onClick={() => go('prepare')}>🎒 Get ready</button>
            </div>
            <div className={s.chips}>
              <span className={s.chip}>🎄 <strong>{sleeps}</strong> sleeps until Christmas</span>
              <span className={s.chip}>📅 Kick-off date announced soon</span>
            </div>
          </div>
          <div className={s.heroArt}>
            <div className={s.globe}>
              <Mascot className={s.heroMascot} />
              <Snowflake className={`${s.orbitFlake} ${s.f1}`} />
              <Snowflake className={`${s.orbitFlake} ${s.f2}`} />
              <Snowflake className={`${s.orbitFlake} ${s.f3}`} />
            </div>
            <Logos size="md" className={s.heroLogos} />
          </div>
        </section>

        <Section
          id="why"
          eyebrow="Why join"
          title="Engineer data with agents. Unwrap your impact."
          subtitle="A hands-on program that does for the data community what the Summer Bootcamp did for developers."
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
          <div className={s.personas}>
            <span className={s.personasLabel}>Made for</span>
            {PERSONAS.map((p) => (
              <span key={p.id} className={s.persona} title={p.desc}>{p.icon} {p.label}</span>
            ))}
          </div>
        </Section>

        <Section
          id="lineup"
          eyebrow="The lineup"
          title="Six sessions, still being wrapped 🎁"
          subtitle="Topics, levels and presenters are being finalised by the elves. Unwrap a gift to peek, and check back soon."
        >
          <div className={`${s.grid} ${s.g3} ${s.gifts}`}>
            {SESSIONS.map((session, i) => <Gift key={session.id} session={session} i={i} />)}
          </div>
        </Section>

        <Section
          id="schedule"
          eyebrow="Schedule"
          title="Winter Fridays, your way"
          subtitle="The same sessions run every week. Join one or many, whatever fits your calendar."
        >
          <ol className={s.advent}>
            {WEEKS.map((w, i) => (
              <li key={w.id} className={s.door}>
                <span className={s.doorNum}>{i + 1}</span>
                <span className={s.doorWeek}>{w.week}</span>
                <span className={s.doorDate}>Friday · {w.date}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="toolbox"
          eyebrow="Santa's toolbox"
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
          eyebrow="Get ready"
          title="Make a list, check it twice"
          subtitle="Tick off your prep. Your progress is saved in this browser only."
        >
          <PrepChecklist />
        </Section>

        <Section id="faq" eyebrow="FAQ" title="Frosty questions">
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <section className={`${s.register} ${s.reveal}`}>
          <div>
            <p className={s.eyebrow}>Ready to join?</p>
            <h2>Registration opens soon</h2>
            <ol className={s.steps}>
              {REGISTER_STEPS.map((step, i) => (
                <li key={step}><span>{i + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
          <Mascot kind="duck" className={s.registerDuck} />
        </section>
      </main>

      <footer className={s.footer}>
        <Logos size="sm" />
        <p>
          Educational workshop series delivered by Microsoft. Not a consulting engagement. Use sample or
          synthetic data only. Workshop outputs are learning artifacts.
        </p>
        <p className={s.footerSmall}>Built with DECKIO · Happy holidays ❄️</p>
      </footer>
    </div>
  )
}
