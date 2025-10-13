# Kartavya Windows Setup Script
# Run this script in PowerShell to check prerequisites and setup the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Kartavya - Windows Setup Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    
    # Check npm
    if (Test-Command "npm") {
        $npmVersion = npm --version
        Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
        $nodeInstalled = $true
    } else {
        Write-Host "❌ npm is not found" -ForegroundColor Red
        $nodeInstalled = $false
    }
} else {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    $nodeInstalled = $false
}

# Check Git
Write-Host "Checking Git installation..." -ForegroundColor Yellow
if (Test-Command "git") {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
    $gitInstalled = $true
} else {
    Write-Host "❌ Git is not installed" -ForegroundColor Red
    $gitInstalled = $false
}

Write-Host ""

# If prerequisites are missing, provide installation instructions
if (-not $nodeInstalled -or -not $gitInstalled) {
    Write-Host "❌ Missing Prerequisites!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install the following:" -ForegroundColor Yellow
    
    if (-not $nodeInstalled) {
        Write-Host "📦 Node.js (includes npm):" -ForegroundColor White
        Write-Host "   1. Go to https://nodejs.org/" -ForegroundColor Gray
        Write-Host "   2. Download the LTS version" -ForegroundColor Gray
        Write-Host "   3. Run the installer" -ForegroundColor Gray
        Write-Host "   4. Restart PowerShell after installation" -ForegroundColor Gray
        Write-Host ""
    }
    
    if (-not $gitInstalled) {
        Write-Host "📦 Git:" -ForegroundColor White
        Write-Host "   1. Go to https://git-scm.com/download/win" -ForegroundColor Gray
        Write-Host "   2. Download and install Git for Windows" -ForegroundColor Gray
        Write-Host ""
    }
    
    Write-Host "After installing, restart PowerShell and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit
}

# If all prerequisites are installed, proceed with setup
Write-Host "✅ All prerequisites are installed!" -ForegroundColor Green
Write-Host ""

# Ask user if they want to proceed with installation
$proceed = Read-Host "Do you want to install project dependencies? (y/n)"
if ($proceed -ne "y" -and $proceed -ne "Y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Installing project dependencies..." -ForegroundColor Cyan

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "backend"
try {
    npm install
    Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating environment file..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Environment file created!" -ForegroundColor Green
    Write-Host "⚠️  Please edit backend/.env with your configuration" -ForegroundColor Yellow
}

Set-Location ".."

# Install frontend dependencies
Write-Host "📱 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location "frontend"
try {
    npm install
    Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

Set-Location ".."

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   🎉 Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend/.env with your MongoDB URI and other settings" -ForegroundColor White
Write-Host "2. Start MongoDB (if using local installation)" -ForegroundColor White
Write-Host "3. Open two PowerShell windows:" -ForegroundColor White
Write-Host "   - In first: cd backend; npm run dev" -ForegroundColor Gray
Write-Host "   - In second: cd frontend; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "For detailed setup instructions, see WINDOWS_SETUP.md" -ForegroundColor Yellow
Write-Host ""

# Ask if user wants to start the servers now
$startNow = Read-Host "Do you want to start the backend server now? (y/n)"
if ($startNow -eq "y" -or $startNow -eq "Y") {
    Write-Host ""
    Write-Host "Starting backend server..." -ForegroundColor Cyan
    Write-Host "Note: You will need to start the frontend in another PowerShell window" -ForegroundColor Yellow
    Write-Host ""
    Set-Location "backend"
    npm run dev
}

Read-Host "Press Enter to exit"