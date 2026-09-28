// Shared public content for the landing site and the deck.
// Topics, dates and presenters are placeholders until the core team confirms them.

export const BOOTCAMP = {
  name: 'Agentic Data Engineering Winter Bootcamp',
  short: 'Winter Bootcamp',
  tagline: 'Clear your data backlog with agents.',
  subtitle:
    'Pipelines, lakehouses, semantic models and Power BI, built spec-first with GitHub Copilot in Microsoft Fabric.',
  season: 'Winter 2026',
  // First session start (ISO 8601 with offset), e.g. '2026-11-06T10:00:00+01:00'. null = not announced yet.
  kickoff: null,
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
  {
    id: 'de', icon: '🛠️', label: 'Data engineers',
    desc: 'Pipelines, lakehouses and medallion architectures.',
    does: 'Ingest, transform and orchestrate while Copilot writes the PySpark, SQL and pipeline code from your spec.',
    stack: ['Lakehouse', 'Notebooks', 'Pipelines', 'Fabric CLI'],
  },
  {
    id: 'da', icon: '📊', label: 'Data analysts',
    desc: 'SQL, semantic models and Power BI.',
    does: 'Query, model and visualise with an agent that drafts the SQL, measures and report pages for you to review.',
    stack: ['Warehouse', 'SQL', 'Semantic models', 'Power BI'],
  },
  {
    id: 'ba', icon: '💼', label: 'Business analysts',
    desc: 'Describe the outcome in plain English.',
    does: 'Describe the question you need answered and turn it into a spec that an agent can build from.',
    stack: ['Specs', 'Semantic models', 'Power BI'],
  },
]

export const PILLARS = [
  {
    id: 'handson',
    icon: '🧪',
    title: 'Raw to gold, hands-on',
    desc: 'Build real lakehouses, pipelines and reports in Microsoft Fabric with GitHub Copilot at the wheel.',
  },
  {
    id: 'spec',
    icon: '📐',
    title: 'Spec-driven data products',
    desc: 'Define schemas, contracts and quality checks first, then let the agent build to spec.',
  },
  {
    id: 'agentic',
    icon: '🤖',
    title: 'Agents that speak Fabric',
    desc: 'Skills, MCP servers and the Fabric CLI give your agent real data platform know-how.',
  },
]

export const PIPELINE = [
  {
    id: 'src', label: 'Sources', sub: 'csv · api · sql', color: '#8fd8ff',
    what: 'Files, APIs and operational databases, as they are.',
    prompt: 'Profile the retail_sales feed and capture its schema in the spec.',
    gate: 'Schema captured',
  },
  {
    id: 'bronze', label: 'Bronze', sub: 'raw', color: '#d98c4a',
    what: 'Land data in OneLake exactly as it arrives. Append-only and fully traceable.',
    prompt: 'Ingest retail_sales.csv into the bronze lakehouse.',
    gate: 'Row counts reconciled',
  },
  {
    id: 'silver', label: 'Silver', sub: 'clean', color: '#c9d4e3',
    what: 'Deduplicate, type, validate and conform.',
    prompt: 'Clean and conform the sales table and quarantine bad rows.',
    gate: 'Quality checks passing',
  },
  {
    id: 'gold', label: 'Gold', sub: 'curated', color: '#ffd36b',
    what: 'Business-ready tables and metrics that people trust.',
    prompt: 'Build weekly demand by region and product line.',
    gate: 'Metrics match the spec',
  },
  {
    id: 'bi', label: 'Power BI', sub: 'insight', color: '#f2c811',
    what: 'A semantic model and a report on top of gold.',
    prompt: 'Create a semantic model and a demand report for the ops team.',
    gate: 'Reviewed and published',
  },
]

export const TERMINAL_SCRIPT = {
  prompt: 'Build a medallion lakehouse from retail_sales.csv and a Power BI report on demand by region',
  lines: [
    { kind: 'info', text: 'Reading spec', meta: 'specs/retail-sales.md' },
    { kind: 'info', text: 'Planning', meta: 'bronze → silver → gold → report' },
    { kind: 'ok', text: 'bronze.retail_sales', meta: '1,204,331 rows' },
    { kind: 'ok', text: 'silver.sales_clean', meta: '12 checks passed' },
    { kind: 'ok', text: 'gold.demand_by_region', meta: '52 weeks × 9 regions' },
    { kind: 'ok', text: 'report: Regional Demand', meta: 'ready for review' },
    { kind: 'done', text: 'Done in 4m 12s · all tests green' },
  ],
}

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
    a: 'Topics, levels and presenters are being finalised and will be announced here soon.',
  },
  {
    q: 'When does it start?',
    a: 'This winter, on Fridays over several weeks. Exact dates will be published on this page.',
  },
  {
    q: 'Do I need to be a developer?',
    a: 'No. Sessions are designed for data engineers, data analysts and business analysts, at every level.',
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
