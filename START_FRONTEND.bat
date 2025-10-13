@echo off
title Kartavya Frontend App
color 0B
echo.
echo ========================================
echo    Kartavya Frontend App
echo ========================================
echo.
echo Starting frontend app...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Node.js version:
node --version
echo.
echo Starting Expo development server...
echo.
npm start
echo.
echo App stopped. Press any key to exit...
pause > nul