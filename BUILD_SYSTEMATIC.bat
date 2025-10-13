@echo off
title Kartavya - Systematic Build Process
color 0A
echo.
echo ========================================
echo    Kartavya - Systematic Build
echo ========================================
echo.
echo Building Kartavya step-by-step from nuclear version
echo.
echo Step 1: Nuclear Reset (Clean Foundation)
echo Step 2: Civic Design System
echo Step 3: Navigation Structure  
echo Step 4: Core Screens
echo Step 5: Authentication
echo Step 6: Issue Management
echo Step 7: Leaderboards
echo Step 8: Backend Integration
echo Step 9: Production Build
echo.
echo Starting with Step 1: Nuclear Reset...
echo.
pause
echo.
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo.
echo Performing nuclear reset...
rmdir /s /q node_modules >nul 2>&1
del package-lock.json >nul 2>&1
npm cache clean --force
echo.
echo Fresh install...
npm install
echo.
echo Starting ultra-minimal version...
npx expo start --clear --reset-cache
echo.
echo Once this works, we'll proceed to Step 2: Civic Design
echo.
pause