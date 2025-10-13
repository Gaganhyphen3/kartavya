@echo off
title Kartavya - Expo SDK 51 (Latest Stable)
color 0A
echo.
echo ========================================
echo    Kartavya - Expo SDK 51 (Latest)
echo ========================================
echo.
echo Upgrading to latest stable Expo SDK 51...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Removing old dependencies...
rmdir /s /q node_modules >nul 2>&1
del package-lock.json >nul 2>&1
echo.
echo Installing Expo SDK 51 (latest stable)...
npm install
echo.
echo Starting with latest Expo SDK 51...
npx expo start --clear
echo.
pause