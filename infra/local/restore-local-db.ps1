param(
  [Parameter(Mandatory = $true)]
  [string]$BacpacPath,
  [string]$TargetDatabaseName = 'ManitobaMastersLocal',
  [string]$LocalSaPassword
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

function Get-LocalEnvValue {
  param([string]$Name)

  $envPath = Join-Path $PSScriptRoot '.env'
  if (-not (Test-Path $envPath)) {
    return $null
  }

  $match = Get-Content $envPath |
    Where-Object { $_ -match "^\s*$Name\s*=" } |
    Select-Object -First 1

  if (-not $match) {
    return $null
  }

  return ($match -split '=', 2)[1].Trim()
}

function Get-LocalConnectionString {
  $password = $LocalSaPassword
  if (-not $password) {
    $password = $env:MBAM_SQL_SA_PASSWORD
  }
  if (-not $password) {
    $password = Get-LocalEnvValue -Name 'MBAM_SQL_SA_PASSWORD'
  }
  if (-not $password) {
    $password = 'LocalDevSql!234'
  }

  return "Server=localhost,1433;Initial Catalog=master;User ID=sa;Password=$password;Encrypt=False;TrustServerCertificate=True;Connection Timeout=30;"
}

function Get-LocalSaPassword {
  $password = $LocalSaPassword
  if (-not $password) {
    $password = $env:MBAM_SQL_SA_PASSWORD
  }
  if (-not $password) {
    $password = Get-LocalEnvValue -Name 'MBAM_SQL_SA_PASSWORD'
  }
  if (-not $password) {
    $password = 'LocalDevSql!234'
  }

  return $password
}

function Invoke-NonQuery {
  param(
    [string]$ConnectionString,
    [string]$CommandText
  )

  Add-Type -AssemblyName System.Data

  $connection = New-Object System.Data.SqlClient.SqlConnection($ConnectionString)
  try {
    $connection.Open()
    $command = $connection.CreateCommand()
    $command.CommandTimeout = 1200
    $command.CommandText = $CommandText
    [void]$command.ExecuteNonQuery()
  }
  finally {
    $connection.Dispose()
  }
}

if (-not (Test-Path $BacpacPath)) {
  throw "Bacpac file not found: $BacpacPath"
}

$sqlPackage = Get-SqlPackagePath
$resolvedLocalSaPassword = Get-LocalSaPassword
$localMasterConnectionString = "Server=localhost,1433;Initial Catalog=master;User ID=sa;Password=$resolvedLocalSaPassword;Encrypt=False;TrustServerCertificate=True;Connection Timeout=30;"

Write-Host "Dropping local database $TargetDatabaseName if it exists ..."
$escapedDbName = $TargetDatabaseName.Replace("]", "]]")
$dropSql = @"
IF DB_ID(N'$escapedDbName') IS NOT NULL
BEGIN
  ALTER DATABASE [$escapedDbName] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [$escapedDbName];
END
"@
Invoke-NonQuery -ConnectionString $localMasterConnectionString -CommandText $dropSql

Write-Host "Importing bacpac into local database $TargetDatabaseName ..."
& $sqlPackage `
  /Action:Import `
  /TargetServerName:localhost,1433 `
  "/TargetDatabaseName:$TargetDatabaseName" `
  /TargetUser:sa `
  "/TargetPassword:$resolvedLocalSaPassword" `
  /TargetEncryptConnection:False `
  /TargetTrustServerCertificate:True `
  "/SourceFile:$BacpacPath" `
  /p:CommandTimeout=1200 `
  /p:LongRunningCommandTimeout=1200

if ($LASTEXITCODE -ne 0) {
  throw "SqlPackage import failed."
}

Write-Host "Restore complete."
