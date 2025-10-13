# Kartavya Windows Setup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Kartavya - Windows Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Test-CommandExists "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    $nodeOK = $true
} else {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    $nodeOK = $false
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
if (Test-CommandExists "npm") {
    $npmVersion = npm --version
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
    $npmOK = $true
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
    $npmOK = $false
}

Write-Host ""

# If prerequisites missing, show instructions
if (-not $nodeOK -or -not $npmOK) {
    Write-Host "❌ Missing Prerequisites!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download LTS version" -ForegroundColor White
    Write-Host "3. Install and restart PowerShell" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

# Prerequisites OK, proceed with installation
Write-Host "✅ Prerequisites installed!" -ForegroundColor Green
Write-Host ""

$install = Read-Host "Install project dependencies? (y/n)"
if ($install -ne "y") {
    Write-Host "Setup cancelled" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan

# Backend
Write-Host "📦 Backend..." -ForegroundColor Yellow
Set-Location "backend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend installed" -ForegroundColor Green
} else {
    Write-Host "❌ Backend failed" -ForegroundColor Red
    exit
}

# Create .env
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Environment file created" -ForegroundColor Green
}

Set-Location ".."

# Frontend
Write-Host "📱 Frontend..." -ForegroundColor Yellow
Set-Location "frontend"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend installed" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend failed" -ForegroundColor Red
    exit
}

Set-Location ".."

Write-Host ""
Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend\.env file" -ForegroundColor White
Write-Host "2. Run: cd backend; npm run dev" -ForegroundColor White
Write-Host "3. Run: cd frontend; npm start" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to finish"