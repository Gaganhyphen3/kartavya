@echo off
title Kartavya - NPK SDK 49
color 0C
echo.
echo ========================================
echo    Kartavya - NPK Expo SDK 49
echo ========================================
echo.
echo Using npk for Expo SDK 49...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Checking npk version...
npk --version
echo.
echo Checking Expo with npk...
npk expo --version
echo.
echo Starting Kartavya with npk expo SDK 49...
npk expo start --clear
echo.
pause