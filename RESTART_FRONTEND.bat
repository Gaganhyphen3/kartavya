@echo off
title Kartavya Frontend - Restart
color 0E
echo.
echo ========================================
echo    Kartavya Frontend - Clean Restart
echo ========================================
echo.
echo Killing any existing Metro processes...
taskkill /f /im node.exe >nul 2>&1
echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul
echo.
echo Starting frontend with simple app...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Clearing cache and starting...
npk expo start --clear
echo.
pause