// Shared public content for the landing site and the deck.
// Session topics and leads are confirmed; dates remain placeholders until published.

export const BOOTCAMP = {
  name: 'Agentic Data Engineering Winter Bootcamp',
  short: 'Winter Bootcamp',
  tagline: 'Clear your data backlog with agents.',
  subtitle:
    'Pipelines, lakehouses, semantic models and Power BI, built spec-first with GitHub Copilot in Microsoft Fabric.',
  season: 'Winter 2026/27',
  kickoffDate: '2026-12-04',
  kickoffLabel: 'Friday, 4 December 2026 · time TBA',
  // Add an ISO 8601 time with offset when the start time is confirmed.
  kickoff: null,
  footer: 'Agentic Data Engineering Winter Bootcamp',
}

export const SESSIONS = [
  {
    id: 'foundations',
    number: '01',
    title: 'Agentic AI Foundations',
    shortTitle: 'Agentic AI Foundations',
    track: 'Foundation',
    subtitle: 'From vibe coding to agentic engineering',
    lead: 'Remco van Dam',
    audience: 'Everyone',
    format: 'Hands-on setup',
    icon: '🧭',
    overview:
      'The common starting point for every participant. Configure GitHub Copilot CLI with reusable instructions, skills and MCP connections, then validate Azure, GitHub, Fabric and Rayfin sign-in before the role-based labs.',
    outcomes: [
      'Move from ad-hoc prompting to durable, version-controlled agent instructions.',
      'Understand when to use skills, specialist agents, MCP servers and command-line tools.',
      'Verify the participant toolchain and tenant access without storing credentials.',
    ],
    challenge:
      'Run the bootcamp audit, install only what is missing, connect the required services and prove the agent can discover the Fabric toolchain.',
    tools: ['Copilot CLI', 'Azure CLI', 'GitHub CLI', 'Fabric CLI', 'Skills', 'MCP'],
  },
  {
    id: 'analysts',
    number: '02',
    title: 'Agentic AI for Analysts: Consuming Data',
    shortTitle: 'Agentic AI for Analysts',
    track: 'Analyst',
    subtitle: 'From data to insights, apps and action',
    lead: 'Zeeshan Ali',
    audience: 'Data analysts & app builders',
    format: 'Rayfin + Power BI',
    icon: '📊',
    overview:
      'Turn a business question into a governed data experience with an agent doing the heavy lifting. Use Rayfin and Power BI to explore data, shape an analytical experience and keep the analyst in control of what gets published.',
    outcomes: [
      'Translate a business question into a clear analytical specification.',
      'Use Rayfin and agent skills to accelerate data exploration and experience creation.',
      'Review generated queries, models and visuals before sharing the result.',
    ],
    challenge:
      'Start with a question and sample data, then produce a review-ready analytical experience and Power BI output.',
    tools: ['Rayfin', 'Power BI', 'Microsoft Fabric', 'GitHub Copilot'],
  },
  {
    id: 'lakehouse',
    number: '03',
    title: 'Agentic AI for Data Engineers: Lakehouse Design',
    shortTitle: 'Lakehouse Design',
    track: 'Lakehouse',
    subtitle: 'Design and build a lakehouse with AI agents',
    lead: 'Arash Nezami',
    audience: 'Fabric data engineers',
    format: 'Fabric + Osmos',
    icon: '🏗️',
    overview:
      'Design and build a Microsoft Fabric lakehouse from a data-product specification. Use Fabric-native skills, CLI and MCP connections with Project Osmos patterns to move from architecture to working engineering artifacts.',
    outcomes: [
      'Define lakehouse boundaries, medallion layers and data contracts before implementation.',
      'Use an agent to scaffold notebooks, pipelines and lakehouse assets from the specification.',
      'Review generated assets, lineage and quality gates before publishing.',
    ],
    challenge:
      'Create a small lakehouse path from raw data to a curated table, with the architecture decisions and checks captured alongside the code.',
    tools: ['Fabric Lakehouse', 'Notebooks', 'Pipelines', 'Project Osmos', 'Fabric CLI'],
  },
  {
    id: 'open-source',
    number: '04',
    title: 'Agentic AI for Open-Source Data Engineers: dbt and Airflow',
    shortTitle: 'dbt & Airflow',
    track: 'Open source',
    subtitle: 'Build, orchestrate and transform with agents',
    lead: 'Remco van Dam',
    audience: 'Open-source data engineers',
    format: 'dbt + Airflow',
    icon: '🔧',
    overview:
      'Apply agentic engineering to open-source data stacks, not only Fabric. Work with dbt and Airflow projects, use repository context to understand dependencies, and accelerate transformations, tests, documentation and orchestration.',
    outcomes: [
      'Navigate an existing dbt and Airflow repository with an agent that understands its structure.',
      'Design or update models and DAGs while keeping tests and documentation aligned.',
      'Review lineage, schedules and failure paths before merging the change.',
    ],
    challenge:
      'Extend a sample pipeline with a dbt model and Airflow orchestration while keeping dependencies, tests and documentation consistent.',
    tools: ['dbt', 'Apache Airflow', 'GitHub Copilot', 'GitHub'],
  },
  {
    id: 'sql',
    number: '05',
    title: 'Agentic AI for SQL Developers & Admins',
    shortTitle: 'SQL Engineering',
    track: 'SQL / DBA',
    subtitle: 'Monitor, investigate and optimize databases',
    lead: 'Ajinkya Soitkar',
    audience: 'SQL developers & DBAs',
    format: 'Database Hub',
    icon: '🗄️',
    overview:
      'Use agentic workflows across SQL development and administration. Explore Database Hub, ask targeted questions of database context, investigate performance and turn findings into reviewed tuning actions.',
    outcomes: [
      'Inspect the SQL estate and focus an investigation with Database Hub context.',
      'Explain queries and execution behaviour to identify likely bottlenecks.',
      'Generate and review scripts for tuning, maintenance and repeatable administration.',
    ],
    challenge:
      'Investigate a slow sample workload, identify the likely cause, then propose and validate an optimization.',
    tools: ['SQL', 'Database Hub', 'GitHub Copilot', 'Monitoring'],
  },
  {
    id: 'nosql',
    number: '06',
    title: 'Agentic AI for NoSQL Developers & Admins',
    shortTitle: 'NoSQL & AI Apps',
    track: 'NoSQL',
    subtitle: 'Build an AI chat app with Cosmos DB',
    lead: 'Rene Bremer',
    audience: 'NoSQL developers & architects',
    format: 'Cosmos DB + MCP',
    icon: '🌐',
    overview:
      'Build an AI-enabled application backed by operational NoSQL data. Use Cosmos DB patterns and MCP-connected tools to ground a chat experience in application data while keeping model and data access under explicit review.',
    outcomes: [
      'Model and query NoSQL data for an AI-enabled application.',
      'Connect an agent or chat workflow to sample Cosmos DB data.',
      'Review grounding, latency, correctness and safe data access before release.',
    ],
    challenge:
      'Build a small chat experience that answers against a sample Cosmos DB dataset and makes the returned data easy to inspect.',
    tools: ['Azure Cosmos DB', 'MCP', 'AI chat', 'GitHub Copilot'],
  },
]

const SESSION_DATES = [
  ['2026-12-04', 'Fri 4 Dec 2026'],
  ['2026-12-11', 'Fri 11 Dec 2026'],
  ['2026-12-18', 'Fri 18 Dec 2026'],
  ['2027-01-08', 'Fri 8 Jan 2027'],
  ['2027-01-15', 'Fri 15 Jan 2027'],
  ['2027-01-22', 'Fri 22 Jan 2027'],
]

export const SCHEDULE = SESSIONS.map((session, index) => ({
  ...session,
  dateIso: SESSION_DATES[index][0],
  date: SESSION_DATES[index][1],
  status: session.id === 'foundations' ? 'foundations first' : 'confirmed',
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
  { id: 'github', icon: '🐙', title: 'GitHub account verified', desc: 'Sign in through the registration page so your exact GitHub handle is captured.' },
  { id: 'core-cli', icon: '⌨️', title: 'Azure, GitHub and Copilot CLIs', desc: 'The foundations setup checks az, gh and GitHub Copilot CLI.' },
  { id: 'fabric-cli', icon: '🧊', title: 'Python 3.10–3.13 and Fabric CLI', desc: 'The setup script audits both and can install Python 3.13 and ms-fabric-cli when requested.' },
  { id: 'agent-tools', icon: '🧰', title: 'Skills and MCP servers', desc: 'Install Azure Skills, Skills for Fabric, Microsoft Learn MCP and GitHub MCP.' },
  { id: 'fabric-access', icon: '🔑', title: 'Fabric access confirmed', desc: 'Sign in with az and fab, then verify the workspace and capacity shared for the labs.' },
  { id: 'data', icon: '🔒', title: 'Sample data only', desc: 'No customer, personal or production data. Synthetic or public data only.' },
]

export const SETUP_RESOURCES = [
  { id: 'az', label: 'Azure CLI', check: 'az version', login: 'az login --tenant <tenant-id>', href: 'https://learn.microsoft.com/cli/azure/install-azure-cli' },
  { id: 'gh', label: 'GitHub CLI', check: 'gh --version', login: 'gh auth login', href: 'https://cli.github.com/' },
  { id: 'fab', label: 'Fabric CLI', check: 'fab --version', login: 'fab auth login', href: 'https://microsoft.github.io/fabric-cli/' },
  { id: 'rayfin', label: 'Rayfin CLI', check: 'npx rayfin --version', login: 'npx rayfin login', href: 'https://rayfin.ai/docs/start/installation' },
  { id: 'azure-skills', label: 'Azure Skills', check: '/skills', login: '/plugin install azure@azure-skills', href: 'https://github.com/microsoft/azure-skills' },
  { id: 'fabric-skills', label: 'Skills for Fabric', check: '/skills', login: '/plugin install fabric-skills@fabric-collection', href: 'https://github.com/microsoft/skills-for-fabric' },
  { id: 'learn-mcp', label: 'Microsoft Learn MCP', check: '/mcp', login: 'Verify the Learn MCP server is running', href: 'https://learn.microsoft.com/training/support/mcp' },
  { id: 'github-mcp', label: 'GitHub MCP Server', check: '/mcp', login: 'Verify GitHub MCP is connected', href: 'https://github.com/github/github-mcp-server' },
]

export const FAQ = [
  {
    q: 'What are the session topics?',
    a: 'Foundations, analyst experiences with Rayfin and Power BI, Fabric lakehouse engineering, open-source data engineering, SQL engineering, and a Cosmos DB AI chat application.',
  },
  {
    q: 'When does it start?',
    a: 'The sessions run on Friday 4, 11 and 18 December 2026, followed by Friday 8, 15 and 22 January 2027. Session start times will be added when confirmed.',
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
    a: 'Sign in with GitHub on the registration page. Your verified GitHub handle is attached automatically, then you choose sessions and provide your company details.',
  },
]

export const REGISTER_STEPS = [
  'Sign in with your personal GitHub.com account',
  'Choose sessions and add your company details',
  'Receive setup guidance and access information by email',
]

export const REGISTRATION = {
  eyebrow: 'Registration',
  title: 'One verified GitHub handle. No typos.',
  subtitle: 'GitHub sign-in supplies your handle. We only ask for the details needed to run the bootcamp and provision access.',
  environments: [
    { id: 'local', label: 'I will install the tools locally' },
    { id: 'cloud', label: 'I need a cloud development environment' },
  ],
  consent:
    'I consent to Microsoft using my company, company email, session choices, GitHub.com username and environment preference to administer the bootcamp, provision access, communicate with me and improve the programme. Registration data is deleted after the administration period.',
}
