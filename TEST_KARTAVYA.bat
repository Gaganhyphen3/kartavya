@echo off
echo ========================================
echo KARTAVYA APPLICATION TEST
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
echo ✓ Node.js installed
echo.

echo [2/4] Checking dependencies...
if not exist "backend\node_modules" (
    echo ERROR: Backend dependencies not installed!
    echo Run: cd backend ^&^& npm install
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

if not exist "web-kartavya\node_modules" (
    echo ERROR: Web app dependencies not installed!
    echo Run: cd web-kartavya ^&^& npm install
    pause
    exit /b 1
)
echo ✓ Web app dependencies installed
echo.

echo [3/4] Starting Backend Server...
echo Backend will run on http://localhost:5000
start "Kartavya Backend" cmd /k "cd backend && npm start"
timeout /t 5 /nobreak >nul
echo ✓ Backend started
echo.

echo [4/4] Starting Web Application...
echo Web app will run on http://localhost:3000
start "Kartavya Web" cmd /k "cd web-kartavya && npm start"
echo ✓ Web app starting...
echo.

echo ========================================
echo TEST COMPLETE!
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Web App: http://localhost:3000
echo.
echo Two windows will open:
echo 1. Backend Server (port 5000)
echo 2. Web Application (port 3000)
echo.
echo Your browser should open automatically.
echo If not, visit: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
