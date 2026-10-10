import { BottomBar, Editable, Slide, useSlides } from '@deckio/deck-engine'
import { ChristmasLights, Logos, Mascot, Snowflake } from '../winter/Decor.jsx'
import {
  BOOTCAMP, PERSONAS, PILLARS, PREP, REGISTER_STEPS, SCHEDULE, SESSIONS, TOOLBOX,
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
          ['weeks', 'Winter Fridays', '4 Dec 2026 – 22 Jan 2027'],
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

export function SessionsSlide({ index }) {
  return (
    <Frame index={index} id="sessions" orbs={['orbIce', 'orbHolly']}>
      <Header
        id="sessions"
        eyebrow="The lineup"
        title="Six sessions, one shared foundation"
        subtitle="Start together, then follow the role-based path that matches the data work you do."
      />
      <div className={s.sessionOverview}>
        {SESSIONS.map((session) => (
          <div className={s.sessionOverviewRow} key={session.id}>
            <span className={s.sessionOverviewNum}>{session.number}</span>
            <span className={s.sessionOverviewIcon}>{session.icon}</span>
            <div className={s.sessionOverviewMain}>
              <Editable as="h3" id={`sessions.${session.id}.title`}>{session.shortTitle}</Editable>
              <Editable as="p" id={`sessions.${session.id}.subtitle`}>{session.subtitle}</Editable>
            </div>
            <Editable as="span" id={`sessions.${session.id}.audience`} className={s.sessionOverviewAudience}>{session.audience}</Editable>
          </div>
        ))}
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
        title="Start together. Then choose your path."
        subtitle="Six Fridays from 4 December 2026 to 22 January 2027. Foundations prepares your machine for every hands-on challenge."
      />
      <div className={`${s.grid} ${s.grid6}`}>
        {SCHEDULE.map((session, i) => (
          <div key={session.id} className={s.door}>
            <Snowflake className={s.flake} />
            <span className={s.doorNum}>{i + 1}</span>
            <Editable as="span" id={`timetable.${session.id}.week`} className={s.doorWeek}>{session.track}</Editable>
            <Editable as="span" id={`timetable.${session.id}.date`} className={s.doorDate}>{session.format}</Editable>
          </div>
        ))}
      </div>
      <Editable as="p" id="timetable.caption" className={s.caption}>
        4, 11 and 18 December 2026 · 8, 15 and 22 January 2027
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
        title="Your Foundations setup"
        subtitle="Audit first, install only what is missing, then sign in to the correct tenant."
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

export function SessionDetailsIntroSlide({ index }) {
  return (
    <Frame index={index} id="session-details-intro" orbs={['orbIce', 'orbHolly', 'orbPine']}>
      <div className={s.detailIntro}>
        <span className={s.pill}>❄️ The programme</span>
        <Editable as="h1" id="sessionDetailsIntro.title">
          Six sessions. <span className={s.highlight}>Six practical challenges.</span>
        </Editable>
        <Editable as="p" id="sessionDetailsIntro.subtitle" multiline className={s.subtitle}>
          The next slides go deeper into the purpose, tools and hands-on outcome of every session.
        </Editable>
        <div className={s.detailIntroTracks}>
          {SESSIONS.map((session) => (
            <span key={session.id}><b>{session.number}</b>{session.track}</span>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function SessionDetailSlide({ index, session }) {
  return (
    <Frame index={index} id={`detail-${session.id}`} orbs={['orbIce', 'orbPine']}>
      <div className={s.detailBody}>
        <div className={s.detailMeta}>
          <span className={s.detailNumber}>SESSION {session.number}</span>
          <span className={s.tag}>{session.audience}</span>
          <span className={`${s.tag} ${s.tagPine}`}>{session.format}</span>
        </div>
        <div className={s.detailHeader}>
          <span className={s.detailIcon}>{session.icon}</span>
          <div>
            <Editable as="h1" id={`detail.${session.id}.title`}>{session.title}</Editable>
            <Editable as="p" id={`detail.${session.id}.subtitle`} className={s.detailSubtitle}>{session.subtitle}</Editable>
          </div>
        </div>
        <Editable as="p" id={`detail.${session.id}.overview`} multiline className={s.detailOverview}>
          {session.overview}
        </Editable>
        <div className={s.detailGrid}>
          <div className={s.detailPanel}>
            <span className={s.detailLabel}>What you will explore</span>
            <ul>
              {session.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
            </ul>
          </div>
          <div className={s.detailStack}>
            <div className={`${s.detailPanel} ${s.detailChallenge}`}>
              <span className={s.detailLabel}>Hands-on challenge</span>
              <p>{session.challenge}</p>
            </div>
            <div className={`${s.detailPanel} ${s.detailToolbox}`}>
              <div><span className={s.detailLabel}>Session lead</span><strong>{session.lead}</strong></div>
              <div className={s.detailTools}>{session.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}

export const sessionDetailSlides = SESSIONS.map((session) => {
  function SessionDetailComponent({ index }) {
    return <SessionDetailSlide index={index} session={session} />
  }
  SessionDetailComponent.displayName = `${session.id}SessionDetailSlide`
  return SessionDetailComponent
})

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
        subtitle="Registration is open. Sign in with GitHub; it takes about two minutes."
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
        title="Your session leads"
        subtitle="Specialists from the data and AI community lead each hands-on challenge."
      />
      <div className={`${s.grid} ${s.grid6}`}>
        {SESSIONS.map((session) => (
          <div key={session.id} className={`${s.card} ${s.helper}`}>
            <span className={s.helperAvatar}>{session.icon}</span>
            <Editable as="h3" id={`team.${session.id}.name`}>{session.lead}</Editable>
            <Editable as="p" id={`team.${session.id}.role`}>{session.shortTitle}</Editable>
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
