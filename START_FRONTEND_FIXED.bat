@echo off
title Kartavya Frontend App (Fixed)
color 0B
echo.
echo ========================================
echo    Kartavya Frontend App (Fixed)
echo ========================================
echo.
echo Starting frontend app...
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Clearing Metro cache...
npk expo start --clear
echo.
echo App stopped. Press any key to exit...
pause > nul