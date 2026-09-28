// Shared public content for the landing site and the deck.
// Topics, dates and presenters are placeholders until the core team confirms them.

export const BOOTCAMP = {
  name: 'Agentic Data Engineering Winter Bootcamp',
  short: 'Winter Bootcamp',
  tagline: 'Sleigh your data backlog.',
  subtitle:
    'From vibe coding to spec-driven data engineering with GitHub Copilot and Microsoft Fabric.',
  season: 'Winter 2026',
  footer: 'Agentic Data Engineering Winter Bootcamp',
}

export const SESSIONS = Array.from({ length: 6 }, (_, i) => ({
  id: `s${i + 1}`,
  number: String(i + 1).padStart(2, '0'),
  title: 'Topic to be announced',
  level: 'Level TBA',
  format: 'Format TBA',
}))

export const WEEKS = Array.from({ length: 6 }, (_, i) => ({
  id: `w${i + 1}`,
  week: `Week ${i + 1}`,
  date: 'Date TBA',
}))

export const PERSONAS = [
  { id: 'de', icon: '🛠️', label: 'Data engineers', desc: 'Pipelines, lakehouses and medallion architectures.' },
  { id: 'ml', icon: '🧠', label: 'ML engineers', desc: 'Features, notebooks and model-ready data.' },
  { id: 'da', icon: '📊', label: 'Data analysts', desc: 'SQL, semantic models and Power BI.' },
  { id: 'ba', icon: '💼', label: 'Business analysts', desc: 'Describe the outcome in plain English.' },
]

export const PILLARS = [
  {
    id: 'handson',
    icon: '🧤',
    title: 'Hands-on, not theory',
    desc: 'Build in Microsoft Fabric with GitHub Copilot at the wheel. We bring the materials.',
  },
  {
    id: 'spec',
    icon: '📜',
    title: 'Spec before code',
    desc: 'Move from vibe coding to spec-driven, reviewable, governed data engineering.',
  },
  {
    id: 'agentic',
    icon: '🦌',
    title: 'Agentic by design',
    desc: 'Skills, agents and MCP servers that know Fabric, from first prompt to a full squad.',
  },
]

export const TOOLBOX = [
  { id: 'skill', num: '01', kicker: 'Reusable expertise', title: 'Skills', desc: 'Patterns, guardrails and examples that teach the agent a Fabric task.' },
  { id: 'agent', num: '02', kicker: 'Role-based orchestrator', title: 'Agents', desc: 'Specialist personas that plan the goal and coordinate skills.' },
  { id: 'mcp', num: '03', kicker: 'Live tool connection', title: 'MCP servers', desc: 'Runtime endpoints to discover, query and change live systems.' },
  { id: 'cli', num: '04', kicker: 'Repeatable execution', title: 'Fabric CLI', desc: 'A scriptable command surface for terminals, scripts and CI/CD.' },
]

export const PREP = [
  { id: 'github', icon: '🐙', title: 'Personal GitHub.com account', desc: 'Copilot access links to a GitHub username. Details are shared at registration.' },
  { id: 'cli', icon: '⌨️', title: 'GitHub Copilot CLI installed', desc: 'We work in the terminal. Install it and sign in before your first session.' },
  { id: 'fabric', icon: '🧊', title: 'Microsoft Fabric access', desc: 'Environment details are to be confirmed. Follow-along is always possible.' },
  { id: 'data', icon: '🔒', title: 'Sample data only', desc: 'No customer, personal or production data. Synthetic or public data only.' },
  { id: 'survey', icon: '📝', title: 'Two minutes for the survey', desc: 'A short, anonymous survey after each session helps us improve.' },
]

export const FAQ = [
  {
    q: 'What are the session topics?',
    a: 'The elves are still wrapping them. Topics, levels and presenters will be announced here soon.',
  },
  {
    q: 'When does it start?',
    a: 'This winter, on Fridays over several weeks. Exact dates will be published on this page.',
  },
  {
    q: 'Do I need to be a developer?',
    a: 'No. Sessions are designed for data engineers, ML engineers, data analysts and business analysts, at every level.',
  },
  {
    q: 'Is it hands-on?',
    a: 'Yes, where possible. Each session has clear prerequisites. If you meet them, build along. If not, follow the presenter live.',
  },
  {
    q: 'What does it cost?',
    a: 'Only your time. The bootcamp is delivered online by Microsoft Solution Engineers and Architects.',
  },
  {
    q: 'How do I register?',
    a: 'Your Microsoft contact will share a registration link. Pick your sessions and weeks, and we follow up by email.',
  },
]

export const REGISTER_STEPS = [
  'Your Microsoft contact shares a registration link',
  'Complete the short form: sessions, weeks and details',
  'We follow up by email with everything you need',
]
