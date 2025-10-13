# Kartavya Startup Script
Write-Host "🚀 Starting Kartavya Civic-Tech App" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check current location
$currentLocation = Get-Location
Write-Host "📍 Current location: $currentLocation" -ForegroundColor Yellow

# Navigate to project directory
$projectPath = "C:\Users\shett\Desktop\karthavya"
if (Test-Path $projectPath) {
    Write-Host "✅ Project directory found" -ForegroundColor Green
    Set-Location $projectPath
} else {
    Write-Host "❌ Project directory not found at $projectPath" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎯 Instructions to start Kartavya:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. BACKEND SERVER:" -ForegroundColor Yellow
Write-Host "   Open PowerShell and run:" -ForegroundColor White
Write-Host "   cd C:\Users\shett\Desktop\karthavya\backend" -ForegroundColor Gray
Write-Host "   node simple-server.js" -ForegroundColor Gray
Write-Host ""
Write-Host "2. FRONTEND APP:" -ForegroundColor Yellow
Write-Host "   Open ANOTHER PowerShell window and run:" -ForegroundColor White
Write-Host "   cd C:\Users\shett\Desktop\karthavya\frontend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "3. MOBILE TESTING:" -ForegroundColor Yellow
Write-Host "   - Install 'Expo Go' app on your phone" -ForegroundColor White
Write-Host "   - Scan QR code from step 2" -ForegroundColor White
Write-Host "   - Kartavya app loads on your phone!" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Test URLs:" -ForegroundColor Cyan
Write-Host "   Backend Health: http://localhost:3000/health" -ForegroundColor Gray
Write-Host "   Backend Test: http://localhost:3000/api/test" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Enter to continue..." -ForegroundColor Yellow
Read-Host