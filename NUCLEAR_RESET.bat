@echo off
title Kartavya - Nuclear Reset
color 0C
echo.
echo ========================================
echo    Kartavya - Nuclear Reset
echo ========================================
echo.
echo WARNING: This will completely reset the frontend
echo and rebuild everything from scratch.
echo.
pause
echo.
echo Performing nuclear reset...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo.
echo 1. Removing node_modules...
rmdir /s /q node_modules >nul 2>&1
echo.
echo 2. Removing package-lock.json...
del package-lock.json >nul 2>&1
echo.
echo 3. Clearing npm cache...
npm cache clean --force
echo.
echo 4. Installing fresh dependencies...
npm install
echo.
echo 5. Starting with ultra-minimal app...
npx expo start --clear --reset-cache
echo.
pause