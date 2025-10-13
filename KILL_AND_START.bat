@echo off
title Kartavya - Kill and Restart
color 0C
echo.
echo ========================================
echo    Kartavya - Clean Restart
echo ========================================
echo.
echo Killing existing Node.js processes...
taskkill /f /im node.exe >nul 2>&1
echo Done.
echo.
echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul
echo.
echo Starting backend server on port 3001...
cd /d "C:\Users\shett\Desktop\karthavya\backend"
node simple-server.js
echo.
pause