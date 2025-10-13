# Simple Kartavya Setup Checker for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Kartavya - Setup Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
        $nodeOK = $true
    } else {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
        $nodeOK = $false
    }
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    $nodeOK = $false
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
        $npmOK = $true
    } else {
        Write-Host "❌ npm not found" -ForegroundColor Red
        $npmOK = $false
    }
} catch {
    Write-Host "❌ npm not found" -ForegroundColor Red
    $npmOK = $false
}

Write-Host ""

if ($nodeOK -and $npmOK) {
    Write-Host "✅ Prerequisites are installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now install the project:" -ForegroundColor Cyan
    Write-Host "1. cd backend" -ForegroundColor White
    Write-Host "2. npm install" -ForegroundColor White
    Write-Host "3. copy .env.example .env" -ForegroundColor White
    Write-Host "4. cd ..\frontend" -ForegroundColor White
    Write-Host "5. npm install" -ForegroundColor White
    Write-Host ""
    Write-Host "See WINDOWS_SETUP.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host "❌ Missing Prerequisites!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download LTS version" -ForegroundColor White
    Write-Host "3. Install and restart PowerShell" -ForegroundColor White
    Write-Host ""
    Write-Host "Then run this script again" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to continue"