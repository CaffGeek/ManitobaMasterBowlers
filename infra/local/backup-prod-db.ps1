param(
  [string]$SourceConnectionString,
  [string]$BacpacPath
)

$ErrorActionPreference = 'Stop'

function Get-SqlPackagePath {
  $command = Get-Command SqlPackage -ErrorAction SilentlyContinue
  if ($command) {
    return $command.Source
  }

  $candidates = @(
    "$env:ProgramFiles\Microsoft SQL Server\170\DAC\bin\SqlPackage.exe",
    "$env:ProgramFiles\Microsoft SQL Server\160\DAC\bin\SqlPackage.exe",
    "$env:ProgramFiles\Microsoft SQL Server\150\DAC\bin\SqlPackage.exe",
    "$env:ProgramFiles(x86)\Microsoft SQL Server\170\DAC\bin\SqlPackage.exe",
    "$env:ProgramFiles(x86)\Microsoft SQL Server\160\DAC\bin\SqlPackage.exe",
    "$env:ProgramFiles(x86)\Microsoft SQL Server\150\DAC\bin\SqlPackage.exe"
  ) | Where-Object { $_ -and (Test-Path $_) }

  if ($candidates.Count -gt 0) {
    return $candidates[0]
  }

  throw "SqlPackage.exe was not found. Install it first: https://learn.microsoft.com/sql/tools/sqlpackage/sqlpackage-download"
}

function Get-SourceConnectionString {
  if ($SourceConnectionString) {
    return $SourceConnectionString
  }

  $prodSettingsPath = Join-Path $PSScriptRoot '..\..\api\prod.settings.json'
  if (-not (Test-Path $prodSettingsPath)) {
    throw "No source connection string provided, and api/prod.settings.json was not found."
  }

  $settings = Get-Content $prodSettingsPath -Raw | ConvertFrom-Json
  $connectionString = $settings.Values.SqlConnectionString
  if (-not $connectionString) {
    throw "SqlConnectionString was not found in api/prod.settings.json."
  }

  return $connectionString
}

$sqlPackage = Get-SqlPackagePath
$source = Get-SourceConnectionString

if (-not $BacpacPath) {
  $bacpacDirectory = Join-Path $PSScriptRoot '..\.backups'
  if (-not (Test-Path $bacpacDirectory)) {
    New-Item -ItemType Directory -Path $bacpacDirectory -Force | Out-Null
  }

  $timestamp = Get-Date -Format 'yyyyMMddHHmmss'
  $BacpacPath = Join-Path $bacpacDirectory "mbam-prod-$timestamp.bacpac"
}
else {
  $bacpacDirectory = Split-Path -Parent $BacpacPath
  if ($bacpacDirectory -and -not (Test-Path $bacpacDirectory)) {
    New-Item -ItemType Directory -Path $bacpacDirectory -Force | Out-Null
  }
}

Write-Host "Exporting production database to $BacpacPath ..."
& $sqlPackage `
  /Action:Export `
  "/SourceConnectionString:$source" `
  "/TargetFile:$BacpacPath" `
  /p:CommandTimeout=1200 `
  /p:LongRunningCommandTimeout=1200 `
  /OverwriteFiles:True

if ($LASTEXITCODE -ne 0) {
  throw "SqlPackage export failed."
}

Write-Host "Backup complete: $BacpacPath"
