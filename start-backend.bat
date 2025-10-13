@echo off
echo Starting Kartavya Backend...
cd backend
echo Current directory: %CD%
echo Node version:
node --version
echo.
echo Starting simple server...
node simple-server.js
pause