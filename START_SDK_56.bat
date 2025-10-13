@echo off
title Kartavya - Expo SDK 56
color 0B
echo.
echo ========================================
echo    Kartavya - Expo SDK 56
echo ========================================
echo.
echo Upgrading to Expo SDK 56 for better stability...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Removing old node_modules...
rmdir /s /q node_modules >nul 2>&1
echo.
echo Installing Expo SDK 56...
npm install
echo.
echo Starting with Expo SDK 56...
npx expo start --clear
echo.
pause