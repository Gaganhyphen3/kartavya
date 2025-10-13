@echo off
title Kartavya - NPX Expo SDK 49
color 0D
echo.
echo ========================================
echo    Kartavya - NPX Expo SDK 49
echo ========================================
echo.
echo Using npk for Expo SDK 49...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Checking Expo CLI with npk...
npk expo --version
echo.
echo Starting with npk expo (SDK 49)...
npk expo start --clear --dev-client
echo.
pause