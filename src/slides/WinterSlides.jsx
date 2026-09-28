import { useState } from 'react'
import { BottomBar, Editable, Slide, useSlides } from '@deckio/deck-engine'
import { ChristmasLights, Logos, Mascot, Snowflake } from '../winter/Decor.jsx'
import {
  BOOTCAMP, PERSONAS, PILLARS, PREP, REGISTER_STEPS, SESSIONS, TOOLBOX, WEEKS,
} from '../content.js'
import s from './Slides.module.css'

const LIGHTS = 34

// The light string doubles as the deck progress bar.
function SlideLights({ index }) {
  const { visibleIndices = [], totalSlides } = useSlides()
  const order = visibleIndices.length ? visibleIndices : Array.from({ length: totalSlides }, (_, i) => i)
  const pos = Math.max(0, order.indexOf(index))
  const at = (p) => Math.round(((p + 1) / order.length) * LIGHTS)
  return (
    <ChristmasLights
      count={LIGHTS}
      className="slide-lights"
      lit={at(pos)}
      prevLit={pos === 0 ? 0 : at(pos - 1)}
      complete={pos === order.length - 1}
    />
  )
}

function Frame({ index, id, children, orbs = ['orbIce', 'orbPine'] }) {
  return (
    <Slide index={index} className={s.slide}>
      <SlideLights index={index} />
      {orbs.map((o) => <div key={o} className={`orb ${s[o]}`} />)}
      <div className={`${s.body} content-frame content-gutter`}>{children}</div>
      <BottomBar text={<Editable as="span" id={`${id}.footer`}>{BOOTCAMP.footer}</Editable>} />
    </Slide>
  )
}

function Header({ id, eyebrow, title, subtitle }) {
  return (
    <div className={s.header}>
      <Editable as="p" id={`${id}.eyebrow`} className={s.eyebrow}>{eyebrow}</Editable>
      <Editable as="h1" id={`${id}.title`}>{title}</Editable>
      {subtitle && <Editable as="p" id={`${id}.subtitle`} multiline className={s.subtitle}>{subtitle}</Editable>}
    </div>
  )
}

export function WinterTitleSlide({ index }) {
  return (
    <Slide index={index} className={s.slide}>
      <SlideLights index={index} />
      <div className={`orb ${s.orbIce}`} />
      <div className={`orb ${s.orbHolly}`} />
      <div className={`orb ${s.orbPine}`} />
      <div className={`${s.hero} content-frame content-gutter`}>
        <div>
          <span className={s.pill}>❄️ <Editable as="span" id="title.pill">{BOOTCAMP.season} edition · Online</Editable></span>
          <h1>
            <Editable as="span" id="title.before">Agentic Data Engineering</Editable>{' '}
            <Editable as="span" id="title.highlight" className={s.highlight}>Winter Bootcamp</Editable>
          </h1>
          <Editable as="p" id="title.subtitle" multiline className={s.subtitle}>
            {`${BOOTCAMP.tagline} ${BOOTCAMP.subtitle}`}
          </Editable>
        </div>
        <Mascot className={s.heroMascot} />
      </div>
      <Logos className={s.heroLogos} size="md" />
      <BottomBar text={<Editable as="span" id="title.footer">{BOOTCAMP.footer}</Editable>} />
    </Slide>
  )
}

export function OfferingSlide({ index }) {
  return (
    <Frame index={index} id="offering" orbs={['orbIce', 'orbHolly']}>
      <div className={s.header}>
        <Editable as="p" id="offering.eyebrow" className={s.eyebrow}>Your invitation · Online event</Editable>
        <h1>
          <Editable as="span" id="offering.titleBefore">Engineer data with agents.</Editable>{' '}
          <Editable as="span" id="offering.titleHighlight" className={s.highlight}>Ship data products.</Editable>
        </h1>
        <Editable as="p" id="offering.subtitle" multiline className={s.subtitle}>
          A hands-on program that does for the data community what the Summer Bootcamp did for developers.
        </Editable>
      </div>
      <div className={`${s.grid} ${s.grid3}`}>
        {PILLARS.map((p) => (
          <div key={p.id} className={s.card}>
            <span className={s.icon}>{p.icon}</span>
            <Editable as="h3" id={`offering.${p.id}.title`}>{p.title}</Editable>
            <Editable as="p" id={`offering.${p.id}.desc`}>{p.desc}</Editable>
          </div>
        ))}
      </div>
      <div className={s.stats}>
        {[
          ['online', 'Online', 'Join live from anywhere'],
          ['weeks', 'Winter Fridays', 'Dates to be announced'],
          ['levels', 'All levels', 'From first prompt to squads'],
          ['cost', 'Free', 'Only your time'],
          ['team', 'Delivered by', 'Microsoft Solution Engineers & Architects'],
        ].map(([k, v, l]) => (
          <div key={k} className={s.stat}>
            <Editable as="span" id={`offering.stats.${k}.value`} className={s.statValue}>{v}</Editable>
            <Editable as="span" id={`offering.stats.${k}.label`} className={s.statLabel}>{l}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function AudienceSlide({ index }) {
  return (
    <Frame index={index} id="audience" orbs={['orbIce', 'orbPine']}>
      <Header
        id="audience"
        eyebrow="Who it's for"
        title="Made for the data community"
        subtitle="Anyone who works with data every day. No deep coding background required."
      />
      <div className={`${s.grid} ${s.grid3}`}>
        {PERSONAS.map((p) => (
          <div key={p.id} className={s.card}>
            <span className={s.icon}>{p.icon}</span>
            <Editable as="h3" id={`audience.${p.id}.title`}>{p.label}</Editable>
            <Editable as="p" id={`audience.${p.id}.desc`}>{p.desc}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

const GIFT_COLORS = ['giftRed', 'giftGreen', 'giftBlue']
const CONFETTI = ['❄', '0', '1', '■', '✦', '{}', '❄', '1', '0', '■', '✦', '❄']

function Bow() {
  return (
    <svg className={s.bow} viewBox="0 0 64 36" aria-hidden="true">
      <path d="M32 20 C 18 2, 2 6, 6 18 C 9 28, 24 26, 32 20 Z" />
      <path d="M32 20 C 46 2, 62 6, 58 18 C 55 28, 40 26, 32 20 Z" />
      <path d="M29 22 L 20 36 L 26 34 L 31 24 Z M35 22 L 44 36 L 38 34 L 33 24 Z" />
      <circle cx="32" cy="20" r="6" />
    </svg>
  )
}

export function Gift({ session, i }) {
  const [open, setOpen] = useState(false)
  const color = s[GIFT_COLORS[i % 3]]
  return (
    <button
      type="button"
      className={`${s.gift} ${open ? s.giftOpen : ''}`}
      onClick={() => setOpen((v) => !v)}
      aria-pressed={open}
      aria-label={`Session ${session.number}: ${open ? `${session.title}, ${session.level}, ${session.format}` : 'reveal topic'}`}
    >
      <span className={s.giftContent}>
        <span className={s.num}>SESSION {session.number}</span>
        <span className={s.giftTitle}>{session.title}</span>
        <span className={s.giftMeta}>
          <span className={`${s.tag} ${s.tagIce}`}>{session.level}</span>
          <span className={`${s.tag} ${s.tagPine}`}>{session.format}</span>
        </span>
      </span>
      <span className={s.giftWrap} aria-hidden="true">
        <span className={`${s.paper} ${s.paperL} ${color}`}>
          <span className={s.giftLabel}><span className={s.giftLabelWord}>Session </span>{session.number}</span>
        </span>
        <span className={`${s.paper} ${s.paperR} ${color}`}>
          <span className={s.giftHint}>Reveal topic</span>
        </span>
        <span className={s.ribbonV} />
        <span className={s.ribbonH} />
        <span className={`${s.lid} ${color}`}>
          <Bow />
        </span>
      </span>
      <span className={s.confetti} aria-hidden="true">
        {CONFETTI.map((c, k) => {
          const a = (k / CONFETTI.length) * Math.PI * 2 + i
          return (
            <i key={k} style={{ '--dx': `${Math.cos(a) * (70 + (k % 3) * 30)}px`, '--dy': `${Math.sin(a) * (45 + (k % 4) * 14) - 20}px`, '--r': `${(k % 2 ? 1 : -1) * (90 + k * 20)}deg` }}>
              {c}
            </i>
          )
        })}
      </span>
    </button>
  )
}

export function SessionsSlide({ index }) {
  return (
    <Frame index={index} id="sessions" orbs={['orbIce', 'orbHolly']}>
      <div className={s.headerRow}>
        <Header
          id="sessions"
          eyebrow="The lineup"
          title="Six sessions, topics coming soon"
          subtitle="Topics, levels and presenters are being finalised. Open a box to see the latest."
        />
        <div className={s.legend}>
          <span className={`${s.tag} ${s.tagIce}`}>Hands-on</span>
          <span className={`${s.tag} ${s.tagPine}`}>Presenter-led</span>
          <span className={`${s.tag} ${s.tagHolly}`}>All levels</span>
        </div>
      </div>
      <div className={`${s.grid} ${s.grid3} ${s.gifts}`}>
        {SESSIONS.map((session, i) => <Gift key={session.id} session={session} i={i} />)}
      </div>
    </Frame>
  )
}

export function FormatSlide({ index }) {
  return (
    <Frame index={index} id="format" orbs={['orbIce', 'orbPine']}>
      <Header
        id="format"
        eyebrow="How you take part"
        title="Two ways to take part"
        subtitle="Every session has clear prerequisites. Meet them and build along, or sit back and follow live."
      />
      <div className={`${s.grid} ${s.grid2}`}>
        <div className={s.card}>
          <span className={s.kicker}>Hands-on</span>
          <span className={s.icon}>🧑‍💻</span>
          <Editable as="h3" id="format.handson.title">Build it yourself</Editable>
          <Editable as="p" id="format.handson.desc">
            Get your hands dirty in Microsoft Fabric with GitHub Copilot driving. It is the real thing, in a real environment.
          </Editable>
        </div>
        <div className={s.card}>
          <span className={s.kicker}>Presenter-led</span>
          <span className={s.icon}>👀</span>
          <Editable as="h3" id="format.follow.title">Follow along</Editable>
          <Editable as="p" id="format.follow.desc">
            Watch the presenter build it live, ask questions, and take the materials home to try later.
          </Editable>
        </div>
      </div>
    </Frame>
  )
}

export function TimetableSlide({ index }) {
  return (
    <Frame index={index} id="timetable" orbs={['orbIce', 'orbHolly']}>
      <Header
        id="timetable"
        eyebrow="How it works"
        title="Winter Fridays, your way"
        subtitle="The same sessions run every week. Join one or many, whatever fits your calendar."
      />
      <div className={`${s.grid} ${s.grid6}`}>
        {WEEKS.map((w, i) => (
          <div key={w.id} className={s.door}>
            <Snowflake className={s.flake} />
            <span className={s.doorNum}>{i + 1}</span>
            <Editable as="span" id={`timetable.${w.id}.week`} className={s.doorWeek}>{w.week}</Editable>
            <Editable as="span" id={`timetable.${w.id}.date`} className={s.doorDate}>{w.date}</Editable>
          </div>
        ))}
      </div>
      <Editable as="p" id="timetable.caption" className={s.caption}>
        Dates will be published before registration opens. Pick your sessions in the registration form.
      </Editable>
    </Frame>
  )
}

export function ToolboxSlide({ index }) {
  return (
    <Frame index={index} id="toolbox" orbs={['orbIce', 'orbPine']}>
      <Header
        id="toolbox"
        eyebrow="The toolbox"
        title="Fabric expertise, packaged for your agent"
        subtitle="The building blocks we use to turn GitHub Copilot into a Fabric data engineer."
      />
      <div className={`${s.grid} ${s.grid4}`}>
        {TOOLBOX.map((t) => (
          <div key={t.id} className={s.card}>
            <span className={s.num}>{t.num}</span>
            <span className={s.kicker}>{t.kicker}</span>
            <Editable as="h3" id={`toolbox.${t.id}.title`}>{t.title}</Editable>
            <Editable as="p" id={`toolbox.${t.id}.desc`}>{t.desc}</Editable>
          </div>
        ))}
      </div>
      <div className={s.flow}>
        <span>Agent orchestrates</span><span className={s.flowArrow}>→</span>
        <span>Skill guides</span><span className={s.flowArrow}>→</span>
        <span>Fabric CLI executes</span><span className={s.flowArrow}>↔</span>
        <span>MCP connects live tools</span>
      </div>
    </Frame>
  )
}

export function SetupSlide({ index }) {
  return (
    <Frame index={index} id="setup" orbs={['orbIce', 'orbHolly']}>
      <Header
        id="setup"
        eyebrow="Get ready"
        title="Before your first session"
        subtitle="A few small things to get ready. Full setup guides and an FAQ are shared before the first session."
      />
      <div className={`${s.grid} ${s.grid4}`}>
        {PREP.slice(0, 4).map((p) => (
          <div key={p.id} className={s.card}>
            <span className={s.icon}>{p.icon}</span>
            <Editable as="h3" id={`setup.${p.id}.title`}>{p.title}</Editable>
            <Editable as="p" id={`setup.${p.id}.desc`}>{p.desc}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function SurveySlide({ index }) {
  return (
    <Frame index={index} id="survey" orbs={['orbIce', 'orbPine']}>
      <Header
        id="survey"
        eyebrow="One request from us"
        title="Tell us how we did"
        subtitle="A very short survey after each session. It shows us what landed and shapes the next edition."
      />
      <div className={s.points}>
        {[
          ['⏱️', 'short', 'Very short, about 2 minutes'],
          ['🔒', 'pii', 'No PII captured. Feedback links to a company, not a person'],
          ['📈', 'improve', 'Shapes how we improve the program'],
        ].map(([icon, k, text]) => (
          <div key={k} className={s.point}>
            <span className={s.icon}>{icon}</span>
            <Editable as="span" id={`survey.${k}`}>{text}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function RegisterSlide({ index }) {
  return (
    <Frame index={index} id="register" orbs={['orbIce', 'orbHolly']}>
      <Header
        id="register"
        eyebrow="Ready to join?"
        title="How to register"
        subtitle="Registration opens soon. It takes about two minutes."
      />
      <div className={s.points}>
        {REGISTER_STEPS.map((text, i) => (
          <div key={i} className={s.point}>
            <span className={s.stepNum}>{i + 1}</span>
            <Editable as="span" id={`register.step${i + 1}`}>{text}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function TeamSlide({ index }) {
  return (
    <Frame index={index} id="team" orbs={['orbIce', 'orbPine']}>
      <Header
        id="team"
        eyebrow="Brought to you by"
        title="Your presenters"
        subtitle="Microsoft Solution Engineers and Architects. The full line-up is announced soon."
      />
      <div className={`${s.grid} ${s.grid6}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`${s.card} ${s.helper}`}>
            <span className={s.helperAvatar}>{['🛠️', '📊', '🧊', '🤖', '📐', '🔎'][i]}</span>
            <Editable as="h3" id={`team.h${i}.name`}>To be announced</Editable>
            <Editable as="p" id={`team.h${i}.role`}>Presenter</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function DisclaimerSlide({ index }) {
  const items = [
    ['advisory', '🎓', 'Educational, not consulting', "This is an educational, hands-on workshop series. Microsoft's role is advisory and facilitative on a best-effort basis. It is not a consulting engagement, managed service, implementation project, or delivery of a finished product. Exercises are for learning only and should not be used in production without your own review, testing, security, privacy and compliance approvals."],
    ['data', '🔒', 'No sensitive data', 'Do not use real customer data, personal data, confidential information, production credentials, production systems or business-critical repositories during the workshops. Use sample, synthetic or non-sensitive materials only.'],
    ['outputs', '🧪', 'Sample artifacts only', 'Any workshop outputs are sample and learning artifacts only. You are responsible for reviewing, adapting, testing, securing and approving any later use outside the workshop.'],
  ]
  return (
    <Frame index={index} id="disclaimer" orbs={['orbIce', 'orbHolly']}>
      <Header id="disclaimer" eyebrow="Please note" title="Workshop disclaimer" />
      <div className={`${s.grid} ${s.grid3} ${s.small}`}>
        {items.map(([k, icon, title, desc]) => (
          <div key={k} className={s.card}>
            <span className={s.icon}>{icon}</span>
            <Editable as="h3" id={`disclaimer.${k}.title`}>{title}</Editable>
            <Editable as="p" id={`disclaimer.${k}.desc`} multiline>{desc}</Editable>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export function ThankYouSlide({ index }) {
  return (
    <Slide index={index} className={s.slide}>
      <SlideLights index={index} />
      <div className={`orb ${s.orbIce}`} />
      <div className={`orb ${s.orbHolly}`} />
      <div className={`orb ${s.orbPine}`} />
      <div className={`${s.thanks} content-frame content-gutter`}>
        <span className={s.pill}>❄️ Thank you</span>
        <h1><Editable as="span" id="thankYou.title" className={s.highlight}>See you this winter</Editable></h1>
        <Editable as="p" id="thankYou.subtitle" multiline className={s.subtitle}>
          Questions? Reach out to your Microsoft contact.
        </Editable>
        <div className={s.thanksMascots}>
          <Mascot kind="duck" className={s.thanksDuck} />
          <Mascot className={s.thanksCopilot} />
        </div>
        <Logos size="sm" />
      </div>
      <BottomBar text={<Editable as="span" id="thankYou.footer">{BOOTCAMP.footer}</Editable>} />
    </Slide>
  )
}
