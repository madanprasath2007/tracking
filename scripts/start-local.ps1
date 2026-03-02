$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js is not installed. Please install Node.js 18+ first.'
}

$nodeVersion = node -p "process.versions.node"
$nodeMajor = [int]($nodeVersion.Split('.')[0])
if ($nodeMajor -lt 18) {
  throw "Node.js 18+ is required. Current version: v$nodeVersion"
}

if ((-not (Test-Path 'backend/.env')) -and (Test-Path 'backend/.env.example')) {
  Copy-Item 'backend/.env.example' 'backend/.env'
  Write-Host 'Created backend/.env from example.'
}

if ((-not (Test-Path 'frontend/.env')) -and (Test-Path 'frontend/.env.example')) {
  Copy-Item 'frontend/.env.example' 'frontend/.env'
  Write-Host 'Created frontend/.env from example.'
}

Write-Host 'Installing dependencies (workspace root)...'
npm install

Write-Host 'Starting backend and frontend...'
$backend = Start-Process npm -ArgumentList 'run','dev:backend' -PassThru -NoNewWindow
$frontend = Start-Process npm -ArgumentList 'run','dev:frontend' -PassThru -NoNewWindow

Write-Host "Backend PID: $($backend.Id)"
Write-Host "Frontend PID: $($frontend.Id)"
Write-Host 'Press Ctrl+C to stop this script. If processes keep running, stop them manually.'

try {
  Wait-Process -Id $backend.Id, $frontend.Id
}
finally {
  foreach ($p in @($backend, $frontend)) {
    if ($null -ne $p -and -not $p.HasExited) {
      Stop-Process -Id $p.Id -Force
    }
  }
}
