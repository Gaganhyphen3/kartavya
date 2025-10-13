@echo off
title Kartavya - Build Production App
color 0A
echo.
echo ========================================
echo    Kartavya - Build Production App
echo ========================================
echo.
echo Building Kartavya civic-tech app for production...
echo.
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Checking Expo CLI...
npx expo --version
echo.
echo Building for Android (APK)...
echo This will create a production-ready APK file
echo.
npx expo build:android
echo.
echo Build complete! Check the Expo dashboard for download link.
echo.
pause