// Shared public content for the landing site and the deck.
// Session topics, owners, dates and times are confirmed.

export const BOOTCAMP = {
  name: 'Agentic Data Engineering Winter Bootcamp',
  short: 'Winter Bootcamp',
  tagline: 'Explore what agentic AI means for modern data work.',
  subtitle:
    'Six practical paths across analytics, engineering, open source, SQL, NoSQL and AI applications.',
  season: 'Winter 2026/27',
  kickoffDate: '2026-12-04',
  kickoffLabel: 'Friday, 4 December 2026 · programme starts at 09:00',
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
    subtitle: 'From Vibe Coding to Agentic Engineering',
    owner: 'Remco van Dam',
    ownerInitials: 'RD',
    time: '09:00',
    audience: 'Everyone',
    format: 'Hands-on setup',
    scheduleMark: 'AI',
    accent: '#8fd8ff',
    spotlight: 'What if AI didn’t just help you write code, but became part of how you engineer?',
    overview:
      'In this hands-on foundation session, you’ll learn the difference between vibe coding and Agentic (data) Engineering, and the building blocks that make agentic development possible. We’ll demystify agents, skills, MCP and CLIs, and show how they work together to give AI the context, tools and instructions it needs to get real work done.\n\nYou’ll also set up your own environment so you can use these capabilities throughout the rest of the bootcamp.',
    outcomes: [
      'Understand the difference between vibe coding and Agentic Engineering',
      'Learn what agents, Agent Skills, MCP and CLIs are, and how they fit together',
      'Set up GitHub Copilot and the agentic tooling you’ll use during the bootcamp',
      'Configure your environment with the skills, tools and connections your agents need',
      'Leave with a working Agentic Engineering foundation ready for the rest of the day',
    ],
    tools: ['GitHub Copilot', 'Agents', 'Agent Skills', 'Skills for Fabric', 'MCP', 'CLIs'],
  },
  {
    id: 'analysts',
    number: '02',
    title: 'Agentic AI for Analysts: Consuming Data',
    shortTitle: 'Agentic AI for Analysts',
    track: 'Analyst',
    subtitle: 'From Data to Insights, Apps & Action',
    owner: 'Zeeshan Ali',
    ownerInitials: 'ZA',
    time: '10:00',
    audience: 'Analysts & app builders',
    format: 'Insights, apps & action',
    scheduleMark: 'BI',
    accent: '#d97cff',
    spotlight:
      'What if AI could help you go from raw data to insights, reports and applications without building everything by hand?',
    overview:
      'In this hands-on challenge, you’ll use AI to create a semantic model, build interactive reports and turn your insights into an application. You’ll go beyond traditional analytics by creating a Rayfin app with writeback, allowing users to not only consume data, but also act on it.\n\nFinally, you’ll bring your semantic model into Microsoft 365 Copilot, making governed business data available through a conversational AI experience for end users.',
    outcomes: [
      'Use AI to create and enrich semantic models',
      'Build interactive reports and visualizations',
      'Turn analytics into an application using Rayfin',
      'Add writeback so users can act on insights and update data',
      'Connect semantic models with Microsoft 365 Copilot',
      'Experience how Agentic AI changes the analyst workflow from data → insight → action',
    ],
    tools: [
      'Semantic models',
      'Interactive reports',
      'Rayfin',
      'Microsoft 365 Copilot',
      'Microsoft IQ',
      'Fabric IQ',
      'Data Agents',
    ],
  },
  {
    id: 'lakehouse',
    number: '03',
    title: 'Agentic AI for Data Engineers: Lakehouse Design',
    shortTitle: 'Lakehouse Design',
    track: 'Lakehouse',
    subtitle: 'Design and Build a Lakehouse with AI Agents',
    owner: 'Arash Nezami',
    ownerInitials: 'AN',
    time: '11:00',
    audience: 'Data engineers',
    format: 'Lakehouse design',
    scheduleMark: 'LH',
    accent: '#ffb454',
    spotlight:
      'Use Fabric Agentic Skills for Data Engineers and Project Osmos to turn requirements and source data into a modern Microsoft Fabric lakehouse.',
    overview:
      'In this hands-on session, you’ll work with AI agents to design the lakehouse architecture, build ingestion and transformation workflows, and create trusted data products for analytics and AI.',
    outcomes: [
      'Design a scalable lakehouse architecture',
      'Use Fabric Agentic Skills to build and transform data',
      'Experience Project Osmos for agentic data engineering',
      'Prepare trusted data products for analytics and AI',
    ],
    tools: ['Lakehouse', 'Fabric Agentic Skills', 'Project Osmos', 'AI agents'],
  },
  {
    id: 'open-source',
    number: '04',
    title: 'Agentic AI for Open-Source Data Engineers: DBT and Airflow',
    shortTitle: 'DBT & Airflow',
    track: 'Open source',
    subtitle: 'Build, Orchestrate & Transform with Agents',
    owner: 'Remco van Dam',
    ownerInitials: 'RD',
    time: '12:30',
    audience: 'Open-source data engineers',
    format: 'DBT + Airflow',
    scheduleMark: 'OS',
    accent: '#55d6a9',
    spotlight: 'What happens when your favourite open-source data engineering tools meet Agentic AI?',
    overview:
      'In this hands-on challenge, you’ll use AI agents to build and operate a modern data engineering workflow using familiar open-source technologies. Instead of manually writing every pipeline, transformation and command, you’ll let agents help you design, build, run and troubleshoot your data workloads.\n\nYou’ll work with technologies such as DBT, Apache Airflow, Python, SQL, Git and CLI-based tooling, while using Agent Skills and MCP to give your agents the knowledge and tools they need.',
    outcomes: [
      'Build and transform data using DBT, Python and SQL',
      'Orchestrate data workflows with Apache Airflow',
      'Use GitHub Copilot and agents throughout the engineering workflow',
      'Use Agent Skills to teach agents how to work with your tools and environment',
      'Use MCP and CLIs to let agents interact with your data platform',
      'Experience what Agentic Data Engineering looks like with the open-source tools you already know',
    ],
    tools: ['DBT', 'Apache Airflow', 'Python', 'SQL', 'Git', 'Agent Skills', 'MCP'],
  },
  {
    id: 'sql',
    number: '05',
    title: 'Agentic AI for SQL Developers & Admins',
    shortTitle: 'SQL Developers & Admins',
    track: 'SQL / DBA',
    subtitle: 'From Database Operations to AI-Assisted SQL Engineering',
    owner: 'Ajinkya Soitkar',
    ownerInitials: 'AS',
    time: '13:30',
    audience: 'SQL developers & DBAs',
    format: 'Database Hub',
    scheduleMark: 'SQL',
    accent: '#7ea7ff',
    spotlight:
      'What if your AI assistant could help you understand, troubleshoot and optimize your databases?',
    overview:
      'In this hands-on challenge, you’ll explore how GitHub Copilot and Agentic AI can change the daily workflow of database developers and administrators. You’ll start by exploring Database Hub, then use AI-assisted workflows to investigate database performance, understand SQL workloads and improve inefficient queries.\n\nInstead of manually digging through everything yourself, you’ll learn how to combine your database expertise with AI to move faster from problem → investigation → optimization.',
    outcomes: [
      'Explore Database Hub as the starting point for working with your databases',
      'Use GitHub Copilot as an AI pair for database development and administration',
      'Investigate database performance and identify potential bottlenecks',
      'Analyze, explain and improve SQL queries',
      'Use AI to assist with SQL tuning and troubleshooting',
      'Experience how Agentic AI changes database engineering from monitor → investigate → optimize',
    ],
    tools: ['Database Hub', 'GitHub Copilot', 'SQL', 'Performance tuning'],
  },
  {
    id: 'nosql',
    number: '06',
    title: 'Agentic AI for NoSQL Developers & Admins',
    shortTitle: 'NoSQL Developers & Admins',
    track: 'NoSQL',
    subtitle: 'Build Your Own AI Chat App using Cosmos DB NoSQL',
    owner: 'René Bremer',
    ownerInitials: 'RB',
    time: '14:30',
    audience: 'NoSQL developers at scale',
    format: 'AI chat application',
    scheduleMark: 'NoSQL',
    accent: '#4fd1e8',
    spotlight:
      'Can you build your own ChatGPT-style application using GitHub Copilot and Cosmos DB NoSQL in just one hour?',
    overview:
      'In this hands-on challenge, your team will use GitHub Copilot, Agent Skills and MCP to turn an idea into a working AI application. Instead of writing everything yourself, you will specify what you want to build and let AI help you design, develop and interact with the underlying data platform.\n\nAzure Cosmos DB is built for globally distributed, highly scalable AI applications such as ChatGPT and Microsoft Copilot. Now it’s your turn to see how far you can get with AI-assisted development + NoSQL.',
    outcomes: [
      'Provide a ChatGPT-style chat experience',
      'Connect to an AI model',
      'Store and retrieve conversations using Azure Cosmos DB',
      'Use Cosmos DB Agent Skills to guide the implementation',
      'Use MCP to interact with Cosmos DB',
    ],
    tools: ['GitHub Copilot', 'Agent Skills', 'MCP', 'Azure Cosmos DB NoSQL'],
  },
]

export const SESSION_DATES = [
  { id: '2026-12-04', label: 'Friday, 4 December 2026', short: '4 Dec', day: '04', month: 'DEC' },
  { id: '2026-12-11', label: 'Friday, 11 December 2026', short: '11 Dec', day: '11', month: 'DEC' },
  { id: '2026-12-18', label: 'Friday, 18 December 2026', short: '18 Dec', day: '18', month: 'DEC' },
  { id: '2027-01-08', label: 'Friday, 8 January 2027', short: '8 Jan', day: '08', month: 'JAN' },
  { id: '2027-01-15', label: 'Friday, 15 January 2027', short: '15 Jan', day: '15', month: 'JAN' },
  { id: '2027-01-22', label: 'Friday, 22 January 2027', short: '22 Jan', day: '22', month: 'JAN' },
]

export const registrationSlotId = (dateId, session) => `${dateId}|${session.time}|${session.id}`

export const PERSONAS = [
  {
    id: 'de', icon: '🛠️', label: 'Data engineers',
    desc: 'Pipelines, transformations, orchestration and trusted data products.',
    does: 'Design, build and operate data workflows with agents working from your requirements and repository context.',
    stack: ['Lakehouse', 'DBT', 'Airflow', 'Python', 'SQL'],
  },
  {
    id: 'da', icon: '📊', label: 'Data analysts',
    desc: 'Queries, semantic models, reports, applications and action.',
    does: 'Move from a business question to governed insights and experiences while keeping review and publishing decisions in your hands.',
    stack: ['SQL', 'Semantic models', 'BI', 'Apps', 'Writeback'],
  },
  {
    id: 'ba', icon: '💼', label: 'Business analysts',
    desc: 'Describe the outcome in plain English.',
    does: 'Describe the question you need answered and turn it into a spec that an agent can build from.',
    stack: ['Specs', 'Metrics', 'Reports', 'Applications'],
  },
  {
    id: 'dbdev', icon: '🧩', label: 'Database developers',
    desc: 'Schema design, SQL development, performance and application data access.',
    does: 'Use agents to understand database context, develop and review SQL, investigate query plans and improve application data workflows.',
    stack: ['SQL', 'Schemas', 'Query plans', 'GitHub Copilot'],
  },
  {
    id: 'dba', icon: '🛡️', label: 'Database administrators',
    desc: 'Operations, reliability, troubleshooting and safe optimization.',
    does: 'Combine operational expertise with AI-assisted investigation while keeping approval, validation and production decisions with the DBA.',
    stack: ['Database Hub', 'Monitoring', 'Performance', 'Governance'],
  },
]

export const TEAM = [
  {
    id: 'nathan',
    name: 'Nathan Brahmbhatt',
    initials: 'NB',
    role: 'Host',
    focus: 'Bootcamp host and programme coordination',
    accent: '#ff4d61',
  },
  {
    id: 'remco',
    name: 'Remco van Dam',
    initials: 'RD',
    role: 'Session owner',
    focus: 'Foundations · Open-source Data Engineering',
    accent: '#8fd8ff',
  },
  {
    id: 'zeeshan',
    name: 'Zeeshan Ali',
    initials: 'ZA',
    role: 'Session owner',
    focus: 'Agentic AI for Analysts',
    accent: '#d97cff',
  },
  {
    id: 'arash',
    name: 'Arash Nezami',
    initials: 'AN',
    role: 'Session owner',
    focus: 'Lakehouse Design',
    accent: '#ffb454',
  },
  {
    id: 'ajinkya',
    name: 'Ajinkya Soitkar',
    initials: 'AS',
    role: 'Session owner',
    focus: 'SQL Developers & Admins',
    accent: '#7ea7ff',
  },
  {
    id: 'rene',
    name: 'René Bremer',
    initials: 'RB',
    role: 'Session owner',
    focus: 'NoSQL Developers & Admins',
    accent: '#4fd1e8',
  },
]

export const PILLARS = [
  {
    id: 'handson',
    icon: '🧪',
    title: 'Built around real data work',
    desc: 'Work across analytics, engineering, databases, open source and AI applications.',
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
    title: 'Bring the tools you know',
    desc: 'Use agents, skills, MCP and CLIs with Microsoft and open-source data platforms.',
  },
]

export const GOLDEN_TICKET = {
  eyebrow: 'GitHub Golden Ticket',
  title: 'Event organization access and $100 of GitHub Copilot AI credits.',
  description:
    'A few days before the event starts, registered attendees will receive an invitation containing the link to join the event GitHub organization. The Golden Ticket environment includes $100 worth of AI credits to use with GitHub Copilot.',
}

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

export const TERMINAL_SCRIPTS = [
  {
    workspace: '~/data-product',
    prompt: 'Turn retail_sales.csv into a trusted data product with tested transformations and an analyst-ready experience',
    lines: [
      { kind: 'info', text: 'Reading spec', meta: 'specs/retail-sales.md' },
      { kind: 'info', text: 'Planning', meta: 'profile → transform → test → experience' },
      { kind: 'ok', text: 'source profile', meta: '1,204,331 rows' },
      { kind: 'ok', text: 'sales_clean', meta: '12 checks passed' },
      { kind: 'ok', text: 'demand_by_region', meta: '52 weeks × 9 regions' },
      { kind: 'done', text: 'Data product ready for review' },
    ],
  },
  {
    workspace: '~/analyst-experience',
    prompt: 'Create a semantic model, interactive report and app with writeback for customer feedback',
    lines: [
      { kind: 'info', text: 'Understanding the business question', meta: 'feedback → action' },
      { kind: 'ok', text: 'semantic model', meta: 'measures enriched' },
      { kind: 'ok', text: 'interactive report', meta: '4 pages generated' },
      { kind: 'ok', text: 'Rayfin application', meta: 'writeback enabled' },
      { kind: 'done', text: 'Insight-to-action flow ready' },
    ],
  },
  {
    workspace: '~/open-data-stack',
    prompt: 'Add a tested DBT model and an Airflow DAG for the daily orders workflow',
    lines: [
      { kind: 'info', text: 'Reading repository context', meta: 'DBT · Airflow · SQL' },
      { kind: 'ok', text: 'orders_daily model', meta: 'tests passing' },
      { kind: 'ok', text: 'daily_orders DAG', meta: 'dependencies linked' },
      { kind: 'ok', text: 'documentation', meta: 'lineage updated' },
      { kind: 'done', text: 'Open-source workflow ready for review' },
    ],
  },
  {
    workspace: '~/database-operations',
    prompt: 'Investigate why this SQL workload slowed down and propose a safe optimization',
    lines: [
      { kind: 'info', text: 'Reading database context', meta: 'Database Hub' },
      { kind: 'ok', text: 'query plan analysed', meta: 'hot path identified' },
      { kind: 'ok', text: 'optimization proposed', meta: 'review required' },
      { kind: 'ok', text: 'validation workload', meta: 'latency improved' },
      { kind: 'done', text: 'Investigation summary ready' },
    ],
  },
  {
    workspace: '~/nosql-chat',
    prompt: 'Build a ChatGPT-style support app with conversations stored in Cosmos DB NoSQL',
    lines: [
      { kind: 'info', text: 'Reading application spec', meta: 'chat · model · data' },
      { kind: 'ok', text: 'conversation model', meta: 'partitioned for scale' },
      { kind: 'ok', text: 'chat experience', meta: 'model connected' },
      { kind: 'ok', text: 'Cosmos DB tools', meta: 'skills + MCP' },
      { kind: 'done', text: 'AI chat application ready to test' },
    ],
  },
]

export const PREP = [
  { id: 'github', icon: '🐙', title: 'GitHub account ready', desc: 'Use the GitHub.com account that will accept the Golden Ticket organization invitation.' },
  { id: 'core-cli', icon: '⌨️', title: 'Azure, GitHub and Copilot CLIs', desc: 'The foundations setup checks az, gh and GitHub Copilot CLI.' },
  { id: 'fabric-cli', icon: '🧊', title: 'Python 3.10–3.13 and Fabric CLI', desc: 'The setup script audits both and can install Python 3.13 and ms-fabric-cli when requested.' },
  { id: 'agent-tools', icon: '🧰', title: 'Skills and MCP servers', desc: 'Install Azure Skills, Skills for Fabric, Microsoft Learn MCP and GitHub MCP.' },
  { id: 'fabric-access', icon: '🔑', title: 'Fabric access confirmed', desc: 'Sign in with az and fab, then verify the workspace and capacity shared for the labs.' },
  { id: 'data', icon: '🔒', title: 'Sample data only', desc: 'No customer, personal or production data. Synthetic or public data only.' },
]

export const READINESS_PATHS = [
  {
    id: 'ready',
    title: 'Already fully ready',
    desc: 'If every check passes before the event, you may skip Agentic AI Foundations and register for a local environment.',
  },
  {
    id: 'setup',
    title: 'Able to install locally',
    desc: 'Choose “I will install the tools locally” and attend Agentic AI Foundations to complete and verify the setup.',
  },
  {
    id: 'cloud',
    title: 'Unsure or unable to install',
    desc: 'Choose “I need a cloud development environment”. Only 200 environments are available, so a place is not guaranteed.',
  },
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
    a: 'Agentic AI foundations, consuming data as an analyst, lakehouse design, DBT and Airflow, SQL development and administration, and building an AI chat application with NoSQL.',
  },
  {
    q: 'When does it start?',
    a: 'The complete six-session programme runs on Friday 4, 11 and 18 December 2026, followed by Friday 8, 15 and 22 January 2027. Sessions start at 09:00, 10:00, 11:00, 12:30, 13:30 and 14:30.',
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
    a: 'The bootcamp is free. The Golden Ticket environment also includes $100 worth of AI credits to use with GitHub Copilot.',
  },
  {
    q: 'How do I access the GitHub environment?',
    a: 'A few days before the event starts, your event invitation will include a Golden Ticket link to join the dedicated GitHub organization.',
  },
  {
    q: 'How do I register?',
    a: 'Provide and confirm your company email, choose the dates and session times you plan to attend, and select your development environment. No GitHub sign-in is required on this website.',
  },
]

export const REGISTER_STEPS = [
  'Enter and confirm your company email address',
  'Choose the dates, session times and development environment you need',
  'Receive the Golden Ticket organization link a few days before the event',
]

export const REGISTRATION = {
  eyebrow: 'Registration',
  title: 'Join the Agentic Data Winter Bootcamp.',
  subtitle: 'Confirm your company email, choose the dates and session times you want to attend, and provide the details needed for event access.',
  slotHelp: 'Every date runs the same six-session programme. Select any date and session-time combination you plan to attend.',
  environments: [
    {
      id: 'local',
      label: 'I will install the tools locally',
      desc: 'Choose this if your setup is already ready or you will attend Foundations to complete it.',
    },
    {
      id: 'cloud',
      label: 'I need a cloud development environment',
      desc: 'Only 200 cloud environments are available. Selecting this option does not guarantee a place.',
    },
  ],
  consent:
    'I consent to Microsoft using my company, company email, session choices and environment preference to administer the bootcamp, send the Golden Ticket organization invitation, provision access, communicate with me and improve the programme. Registration data is deleted after the administration period.',
}
