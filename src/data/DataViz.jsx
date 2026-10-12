import { useEffect, useState } from 'react'
import { PIPELINE, SESSION_DATES, SESSIONS, TERMINAL_SCRIPTS } from '../content.js'
import d from './Data.module.css'

const BASE = import.meta.env.BASE_URL

/* ── Countdown to the first session, styled as a scheduled pipeline run ── */
export function Countdown({ target, date, dateLabel, className = '' }) {
  const t = target ? new Date(target).getTime() : null
  const dateOnly = !t && date ? new Date(`${date}T12:00:00`) : null
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!t) return undefined
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [t])

  const diff = t == null ? null : Math.max(0, t - now)
  const parts = diff != null
    ? [
        Math.floor(diff / 86400000),
        Math.floor(diff / 3600000) % 24,
        Math.floor(diff / 60000) % 60,
        Math.floor(diff / 1000) % 60,
      ].map((n) => String(n).padStart(2, '0'))
    : dateOnly
      ? [
          String(dateOnly.getDate()).padStart(2, '0'),
          dateOnly.toLocaleString('en', { month: 'short' }).toUpperCase(),
          String(dateOnly.getFullYear()),
          dateOnly.toLocaleString('en', { weekday: 'short' }).toUpperCase(),
        ]
      : ['--', '--', '--', '--']
  const labels = dateOnly ? ['day', 'month', 'year', 'starts'] : ['days', 'hrs', 'min', 'sec']
  const status = t == null ? (dateOnly ? 'dates confirmed' : 'awaiting schedule') : diff > 0 ? 'scheduled' : 'live now'
  const statusClass = t == null ? (dateOnly ? d.statusOk : d.statusWait) : diff > 0 ? d.statusOk : d.statusLive

  return (
    <div className={`${d.countdown} ${className}`} role={t ? 'timer' : 'group'} aria-live="off">
      <div className={d.cdHead}>
        <span className={d.mono}>▸ next run · session_01</span>
        <span className={`${d.status} ${statusClass}`}><i />{status}</span>
      </div>
      <div className={d.cdDigits}>
        {labels.map((label, i) => (
          <div key={label} className={d.cdCell}>
            <span className={`${d.cdNum} ${t == null && !dateOnly ? d.cdPending : ''}`}>{parts[i]}</span>
            <span className={d.cdLabel}>{label}</span>
          </div>
        ))}
      </div>
      {(t != null || dateLabel) && (
        <p className={d.cdFoot}>
          First session: {t != null ? new Date(t).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' }) : dateLabel}
        </p>
      )}
    </div>
  )
}

/* ── Copilot CLI terminal that types a data engineering request ── */
export function AgentTerminal({ className = '', children }) {
  const [scriptIndex, setScriptIndex] = useState(0)
  const { workspace, prompt, lines } = TERMINAL_SCRIPTS[scriptIndex]
  const [chars, setChars] = useState(0)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let id
    if (chars < prompt.length) id = setTimeout(() => setChars((c) => c + 1), 24)
    else if (shown < lines.length) id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 520)
    else {
      id = setTimeout(() => {
        setChars(0)
        setShown(0)
        setScriptIndex((current) => (current + 1) % TERMINAL_SCRIPTS.length)
      }, 4200)
    }
    return () => clearTimeout(id)
  }, [chars, shown, prompt.length, lines.length, scriptIndex])

  const typing = chars < prompt.length
  const working = !typing && shown < lines.length

  return (
    <div className={`${d.terminal} ${className}`}>
      {children}
      <div className={d.termBar}>
        <span className={d.dots}><i /><i /><i /></span>
        <span className={d.termTitle}>copilot · {workspace}</span>
      </div>
      <div className={d.termBody} aria-label={`Example: ${prompt}`}>
        <p className={d.termDim}>$ copilot</p>
        <p className={d.termPrompt}>
          <span className={d.termUser}>›</span> {prompt.slice(0, chars)}
          {typing && <span className={d.caret} />}
        </p>
        <ul className={d.termLines}>
          {lines.slice(0, shown).map((l) => (
            <li key={l.text} className={d[`line_${l.kind}`]}>
              <span className={d.lineIcon}>{l.kind === 'ok' ? '✓' : l.kind === 'done' ? '★' : '●'}</span>
              <span className={d.lineText}>{l.text}</span>
              {l.meta && <span className={d.lineMeta}>{l.meta}</span>}
            </li>
          ))}
          {working && (
            <li className={d.line_info}>
              <span className={d.spinner} />
              <span className={d.termDim}>working…</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

/* ── Medallion lineage graph with an agent at every hop ── */
const NODE_W = 150
const NODE_H = 78
const NODE_Y = 206
const AGENT = { x: 565, y: 44 }
const XS = [95, 330, 565, 800, 1035]

export function MedallionFlow({ compact = false, className = '' }) {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto) return undefined
    const id = setInterval(() => setActive((a) => (a + 1) % PIPELINE.length), 3200)
    return () => clearInterval(id)
  }, [auto])

  const pick = (i) => { setAuto(false); setActive(i) }
  const stage = PIPELINE[active]

  return (
    <div className={`${d.flowWrap} ${compact ? d.flowCompact : ''} ${className}`}>
      <div className={d.flowScroll}>
        <svg className={d.flowSvg} viewBox="0 0 1130 260" role="group" aria-label="Medallion data pipeline">
          <defs>
            <pattern id="flow-grid" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="rgba(143,216,255,0.06)" strokeWidth="1" />
            </pattern>
            <filter id="flow-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="1130" height="260" fill="url(#flow-grid)" />

          {XS.map((x, i) => (
            <path
              key={`a${i}`}
              d={`M${AGENT.x} ${AGENT.y + 24} C ${AGENT.x} 120, ${x} 110, ${x} ${NODE_Y - NODE_H / 2}`}
              className={`${d.agentLine} ${i === active ? d.agentLineOn : ''}`}
            />
          ))}

          {XS.slice(0, -1).map((x, i) => {
            const path = `M${x + NODE_W / 2} ${NODE_Y} L${XS[i + 1] - NODE_W / 2} ${NODE_Y}`
            return (
              <g key={`e${i}`}>
                <path d={path} className={d.edge} />
                {[0, 1, 2].map((k) => (
                  <rect key={k} x="-5" y="-3.5" width="10" height="7" rx="2" className={d.packet} style={{ fill: PIPELINE[i + 1].color }}>
                    <animateMotion dur="1.8s" begin={`${-k * 0.6}s`} repeatCount="indefinite" path={path} />
                  </rect>
                ))}
              </g>
            )
          })}

          <g className={d.agentNode}>
            <rect x={AGENT.x - 122} y={AGENT.y - 24} width="244" height="48" rx="24" />
            <image href={`${BASE}copilot-mascot.png`} x={AGENT.x - 112} y={AGENT.y - 19} width="38" height="38" />
            <text x={AGENT.x - 66} y={AGENT.y + 6}>GitHub Copilot agent</text>
          </g>

          {PIPELINE.map((p, i) => (
            <g
              key={p.id}
              className={`${d.node} ${i === active ? d.nodeOn : ''}`}
              transform={`translate(${XS[i] - NODE_W / 2} ${NODE_Y - NODE_H / 2})`}
              style={{ '--c': p.color }}
              role="button"
              tabIndex={0}
              aria-pressed={i === active}
              aria-label={`${p.label}: ${p.what}`}
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i) }
              }}
            >
              <rect width={NODE_W} height={NODE_H} rx="16" className={d.nodeBox} />
              <circle cx="26" cy="32" r="8" fill={p.color} filter={i === active ? 'url(#flow-glow)' : undefined} />
              <text x="44" y="38" className={d.nodeLabel}>{p.label}</text>
              <text x="18" y="62" className={d.nodeSub}>{p.sub}</text>
            </g>
          ))}
        </svg>
      </div>

      <div className={d.flowDetail} style={{ '--c': stage.color }} aria-live="polite">
        <div>
          <span className={d.detailKicker}>{String(active + 1).padStart(2, '0')} · {stage.label}</span>
          <p>{stage.what}</p>
        </div>
        <div>
          <span className={d.detailKicker}>Ask the agent</span>
          <p className={d.detailPrompt}>“{stage.prompt}”</p>
        </div>
        <div>
          <span className={d.detailKicker}>Quality gate</span>
          <p className={d.detailGate}>✓ {stage.gate}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Six repeated event dates and the shared full-day agenda ── */
export function ScheduleBoard() {
  return (
    <div className={d.scheduleBoard}>
      <div className={d.dateRail} aria-label="Bootcamp dates">
        {SESSION_DATES.map((date) => (
          <article key={date.id} className={d.dateCard}>
            <span>{date.month}</span>
            <strong>{date.day}</strong>
            <small>Full programme</small>
          </article>
        ))}
      </div>
      <div className={d.agenda}>
        <div className={d.agendaHead}>
          <div>
            <span>Every event date</span>
            <strong>Six-session daily agenda</strong>
          </div>
          <p>Select any combination of dates and session times during registration.</p>
        </div>
        <div className={d.agendaGrid}>
          {SESSIONS.map((session) => (
            <article key={session.id} className={d.agendaSlot} style={{ '--slot-accent': session.accent }}>
              <time dateTime={session.time}>{session.time}</time>
              <div>
                <span>{session.number} · {session.track}</span>
                <strong>{session.shortTitle}</strong>
                <small>Owner · {session.owner}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
