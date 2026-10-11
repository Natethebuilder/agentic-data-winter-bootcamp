import { useState } from 'react'
import { SETUP_RESOURCES } from '../content.js'
import s from './SetupWizard.module.css'

const BASE = import.meta.env.BASE_URL

const COPILOT_COMMANDS = [
  '/plugin marketplace add microsoft/azure-skills',
  '/plugin install azure@azure-skills',
  '/plugin marketplace add microsoft/skills-for-fabric',
  '/plugin install fabric-skills@fabric-collection',
  '/plugin install powerbi-authoring@fabric-collection',
  '/skills',
  '/mcp',
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return <button type="button" className={s.copy} onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
}

export default function SetupWizard() {
  const [tab, setTab] = useState('machine')

  return (
    <div className={s.wizard}>
      <div className={s.tabs} role="tablist" aria-label="Foundations setup">
        <button type="button" role="tab" aria-selected={tab === 'machine'} onClick={() => setTab('machine')}>1 · Machine</button>
        <button type="button" role="tab" aria-selected={tab === 'agent'} onClick={() => setTab('agent')}>2 · Agent tools</button>
        <button type="button" role="tab" aria-selected={tab === 'signin'} onClick={() => setTab('signin')}>3 · Sign in</button>
      </div>

      {tab === 'machine' && (
        <div className={s.panel} role="tabpanel">
          <div className={s.intro}>
            <div>
              <span className={s.kicker}>Windows · PowerShell 7</span>
              <h3>Audit first. Install only what is missing.</h3>
              <p>The participant script checks Azure CLI, GitHub CLI, Node.js, npm, Python and Fabric CLI. Rayfin stays project-local, as recommended.</p>
            </div>
            <a className={s.download} href={`${BASE}setup/prepare-agentic-data.ps1`} download>↓ Download setup script</a>
          </div>
          <div className={s.command}>
            <code>pwsh -File .\prepare-agentic-data.ps1</code>
            <CopyButton text={'pwsh -File .\\prepare-agentic-data.ps1'} />
          </div>
          <div className={s.command}>
            <code>pwsh -File .\prepare-agentic-data.ps1 -InstallMissing</code>
            <CopyButton text={'pwsh -File .\\prepare-agentic-data.ps1 -InstallMissing'} />
          </div>
        </div>
      )}

      {tab === 'agent' && (
        <div className={s.panel} role="tabpanel">
          <span className={s.kicker}>Inside GitHub Copilot CLI</span>
          <h3>Install the skills, then verify MCP.</h3>
          <p className={s.panelLead}>Run these slash commands in order. Restart Copilot after installing the plug-ins.</p>
          <div className={s.commandBlock}>
            <pre><code>{COPILOT_COMMANDS.join('\n')}</code></pre>
            <CopyButton text={COPILOT_COMMANDS.join('\n')} />
          </div>
          <div className={s.resourceGrid}>
            {SETUP_RESOURCES.slice(4).map((item) => (
              <a key={item.id} className={s.resource} href={item.href} target="_blank" rel="noreferrer">
                <strong>{item.label}</strong>
                <span>{item.login}</span>
                <i>Official guidance ↗</i>
              </a>
            ))}
          </div>
        </div>
      )}

      {tab === 'signin' && (
        <div className={s.panel} role="tabpanel">
          <span className={s.kicker}>Use your assigned tenant</span>
          <h3>Complete browser sign-in during Foundations.</h3>
          <div className={s.signins}>
            {SETUP_RESOURCES.slice(0, 4).map((item) => (
              <article key={item.id}>
                <div><strong>{item.label}</strong><a href={item.href} target="_blank" rel="noreferrer">docs ↗</a></div>
                <code>{item.login}</code>
              </article>
            ))}
          </div>
          <div className={s.note}>
            The script can launch these flows with <code>-Login -TenantId &lt;tenant-id&gt;</code>. Passwords and tokens are never stored by the script.
          </div>
        </div>
      )}
    </div>
  )
}
