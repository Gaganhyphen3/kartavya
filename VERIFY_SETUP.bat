@echo off
echo ========================================
echo KARTAVYA SETUP VERIFICATION
echo ========================================
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found
    exit /b 1
) else (
    echo ✓ Node.js installed
)
echo.

echo Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm not found
    exit /b 1
) else (
    echo ✓ npm installed
)
echo.

echo Checking backend dependencies...
if exist "backend\node_modules" (
    echo ✓ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing
    echo Run: cd backend ^&^& npm install
)
echo.

echo Checking web app dependencies...
if exist "web-kartavya\node_modules" (
    echo ✓ Web app dependencies installed
) else (
    echo ❌ Web app dependencies missing
    echo Run: cd web-kartavya ^&^& npm install
)
echo.

echo Checking project structure...
if exist "backend\server.js" (echo ✓ Backend server found) else (echo ❌ Backend server missing)
if exist "web-kartavya\src\App.js" (echo ✓ Web app found) else (echo ❌ Web app missing)
if exist "backend\package.json" (echo ✓ Backend package.json found) else (echo ❌ Backend package.json missing)
if exist "web-kartavya\package.json" (echo ✓ Web package.json found) else (echo ❌ Web package.json missing)
echo.

echo ========================================
echo VERIFICATION COMPLETE
echo ========================================
echo.
echo Ready to test? Run: TEST_KARTAVYA.bat
echo.
pause
