@echo off
title Kartavya - Working NPK SDK 49
color 0A
echo.
echo ========================================
echo    Kartavya - Working NPK SDK 49
echo ========================================
echo.
echo NPK is now installed and working!
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Testing npk...
npk --version
echo.
echo Starting Kartavya with npk expo...
echo This should work now!
echo.
npk expo start --clear
echo.
pause