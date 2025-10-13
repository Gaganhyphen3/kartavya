# Kartavya Backend Startup Script

Write-Host "🚀 Starting Kartavya Backend..." -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location "backend"

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
    exit 1
}

# Check if dependencies are installed
if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Dependencies not found. Run 'npm install' first" -ForegroundColor Red
    exit 1
}

# Start the server
Write-Host "🔄 Starting server..." -ForegroundColor Yellow
Write-Host ""

try {
    # Start the simple server first
    Write-Host "Testing with simple server..." -ForegroundColor Cyan
    node simple-server.js
} catch {
    Write-Host "❌ Error starting server: $_" -ForegroundColor Red
}