@echo off
title Kartavya Backend Server
color 0A
echo.
echo ========================================
echo    Kartavya Backend Server
echo ========================================
echo.
echo Starting backend server...
cd /d "C:\Users\shett\Desktop\karthavya\backend"
echo Current directory: %CD%
echo.
echo Node.js version:
node --version
echo.
echo Starting simple server on port 3000...
echo.
node simple-server.js
echo.
echo Server stopped. Press any key to exit...
pause > nul