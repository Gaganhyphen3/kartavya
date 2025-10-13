@echo off
title Kartavya - Reset to Minimal
color 0A
echo.
echo ========================================
echo    Kartavya - Reset to Minimal
echo ========================================
echo.
echo This will reset the frontend to the most basic version
echo.
pause
echo.
echo Navigating to frontend directory...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo.
echo Backing up current files...
copy package.json package-backup.json >nul 2>&1
copy app.json app-backup.json >nul 2>&1
copy App.js App-backup.js >nul 2>&1
echo.
echo Installing minimal configuration...
copy package-minimal.json package.json
copy app-minimal.json app.json
copy App-minimal.js App.js
echo.
echo Removing node_modules...
rmdir /s /q node_modules >nul 2>&1
echo.
echo Installing minimal dependencies...
npm install
echo.
echo Starting Expo with npk...
npk expo start --clear
echo.
pause