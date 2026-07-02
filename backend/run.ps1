# ============================================================
# Trip Mind AI - Backend Startup Script
# Loads .env variables then starts Spring Boot
# Usage: .\run.ps1  (from the backend/ directory)
# ============================================================

$envFile = Join-Path $PSScriptRoot ".env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        # Skip comments and blank lines
        if ($_ -notmatch '^\s*#' -and $_ -match '=') {
            $parts = $_ -split '=', 2
            $key   = $parts[0].Trim()
            $value = $parts[1].Trim()
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
            Write-Host "  Loaded: $key"
        }
    }
    Write-Host ""
    Write-Host "Environment loaded from .env" -ForegroundColor Green
} else {
    Write-Host "WARNING: .env file not found at $envFile" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting Spring Boot backend..." -ForegroundColor Cyan
mvn spring-boot:run
