[CmdletBinding()]
param(
  [switch]$InstallMissing,
  [switch]$ConfigureMicrosoftNpmProxy,
  [switch]$Login,
  [string]$TenantId
)

$ErrorActionPreference = 'Stop'
$script:Failures = 0

function Write-Check([string]$Name, [bool]$Ok, [string]$Detail) {
  $icon = if ($Ok) { '[PASS]' } else { '[TODO]' }
  $colour = if ($Ok) { 'Green' } else { 'Yellow' }
  Write-Host ("{0} {1,-18} {2}" -f $icon, $Name, $Detail) -ForegroundColor $colour
  if (-not $Ok) { $script:Failures++ }
}

function Test-Command([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WingetPackage([string]$Id, [string]$Label) {
  if (-not $InstallMissing) { return }
  if (-not (Test-Command winget)) { throw "winget is required to install $Label automatically." }
  Write-Host "Installing $Label..." -ForegroundColor Cyan
  winget install --exact --id $Id --accept-package-agreements --accept-source-agreements
  if ($LASTEXITCODE -ne 0) { throw "$Label installation failed with exit code $LASTEXITCODE." }
}

function Get-PythonCommand {
  foreach ($candidate in @('py', 'python', 'python3')) {
    if (-not (Test-Command $candidate)) { continue }
    $version = (& $candidate --version 2>&1) -join ''
    if ($version -match 'Python\s+3\.(10|11|12|13)\.') {
      return $candidate
    }
  }
  return $null
}

Write-Host "`nAgentic Data Engineering Bootcamp - participant setup" -ForegroundColor Cyan
Write-Host "Audit mode is the default. Use -InstallMissing to make changes.`n"

if ($ConfigureMicrosoftNpmProxy) {
  if (-not (Test-Command npm)) { throw 'npm must be installed before configuring the Microsoft package proxy.' }
  $previousRegistry = npm config get registry
  npm config set registry 'https://packagefeedproxy.microsoft.io/npm/'
  if ($LASTEXITCODE -ne 0) { throw 'Could not configure the Microsoft npm package proxy.' }
  Write-Host "npm registry changed from $previousRegistry to https://packagefeedproxy.microsoft.io/npm/" -ForegroundColor Cyan
  Write-Warning 'The package feed proxy is for Microsoft employees only.'
}

$requirements = @(
  @{ Name = 'Azure CLI'; Command = 'az'; Package = 'Microsoft.AzureCLI' },
  @{ Name = 'GitHub CLI'; Command = 'gh'; Package = 'GitHub.cli' },
  @{ Name = 'Node.js'; Command = 'node'; Package = 'OpenJS.NodeJS.LTS' },
  @{ Name = 'npm'; Command = 'npm'; Package = $null },
  @{ Name = 'Copilot CLI'; Command = 'copilot'; Package = 'GitHub.Copilot' }
)

foreach ($requirement in $requirements) {
  $found = Test-Command $requirement.Command
  if (-not $found -and $requirement.Package) {
    Install-WingetPackage $requirement.Package $requirement.Name
    $found = Test-Command $requirement.Command
  }
  $detail = if ($found) { ((& $requirement.Command --version 2>&1 | Select-Object -First 1) -join '') } else { 'not found' }
  Write-Check $requirement.Name $found $detail
}

$python = Get-PythonCommand
if (-not $python) {
  Install-WingetPackage 'Python.Python.3.13' 'Python 3.13'
  $python = Get-PythonCommand
}
Write-Check 'Python' ([bool]$python) $(if ($python) { ((& $python --version 2>&1) -join '') } else { 'Python 3.10-3.13 required; reopen PowerShell after installation and rerun.' })

if ($python) {
  if (-not (Test-Command fab) -and $InstallMissing) {
    Write-Host 'Installing Microsoft Fabric CLI...' -ForegroundColor Cyan
    & $python -m pip install --upgrade ms-fabric-cli
    if ($LASTEXITCODE -ne 0) { throw "Fabric CLI installation failed with exit code $LASTEXITCODE." }
  }
  Write-Check 'Fabric CLI' (Test-Command fab) $(if (Test-Command fab) { ((fab --version 2>&1 | Select-Object -First 1) -join '') } else { 'pip install ms-fabric-cli' })
} else {
  Write-Check 'Fabric CLI' $false 'blocked until supported Python is available'
}

$rayfinAvailable = $false
if ((Test-Path '.\package.json') -and (Test-Command npx)) {
  npx --no-install rayfin --version *> $null
  $rayfinAvailable = $LASTEXITCODE -eq 0
}
Write-Check 'Rayfin CLI' $rayfinAvailable $(if ($rayfinAvailable) { 'project-local CLI available' } else { 'installed per lab project with npm install; do not install globally' })

if ($Login) {
  if (Test-Command az) {
    if ($TenantId) { az login --tenant $TenantId } else { az login }
  }
  if (Test-Command gh) {
    gh auth status *> $null
    if ($LASTEXITCODE -ne 0) { gh auth login }
  }
  if (Test-Command fab) { fab auth login }
  if ($rayfinAvailable) { npx rayfin login }
}

Write-Host "`nInside GitHub Copilot CLI, run:" -ForegroundColor Cyan
@(
  '/plugin marketplace add microsoft/azure-skills',
  '/plugin install azure@azure-skills',
  '/plugin marketplace add microsoft/skills-for-fabric',
  '/plugin install fabric-skills@fabric-collection',
  '/plugin install powerbi-authoring@fabric-collection',
  '/skills',
  '/mcp'
) | ForEach-Object { Write-Host "  $_" }

Write-Host "`nAdmin-only gates (not changed by this participant script):" -ForegroundColor Cyan
Write-Host '  - Fabric trial/capacity assigned to the lab workspace'
Write-Host '  - Fabric Apps / Rayfin tenant setting enabled for the participant group'
Write-Host '  - Fabric Core MCP tenant access enabled where required'

if ($script:Failures -gt 0) {
  Write-Host "`n$script:Failures item(s) still need attention." -ForegroundColor Yellow
  exit 1
}

Write-Host "`nAll machine checks passed." -ForegroundColor Green
