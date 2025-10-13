@echo off
title Kartavya - Expo Diagnostics
color 0F
echo.
echo ========================================
echo    Kartavya - Expo Diagnostics
echo ========================================
echo.
echo Checking Expo installation...
npk expo --version
echo.
echo Checking Node.js version...
node --version
echo.
echo Checking npm version...
npm --version
echo.
echo Navigating to frontend directory...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Checking package.json exists...
if exist package.json (
    echo ✅ package.json found
) else (
    echo ❌ package.json not found
)
echo.
echo Checking node_modules exists...
if exist node_modules (
    echo ✅ node_modules found
) else (
    echo ❌ node_modules not found - run npm install
)
echo.
echo Starting Expo with verbose logging...
npk expo start --clear --verbose
echo.
pause