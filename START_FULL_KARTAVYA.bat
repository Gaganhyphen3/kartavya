@echo off
title Kartavya - Complete Civic-Tech App
color 0A
echo.
echo ========================================
echo    Kartavya - Complete Civic-Tech App
echo ========================================
echo.
echo Starting the complete Kartavya civic-tech application...
echo.
echo Features included:
echo ✅ Splash Screen with civic branding
echo ✅ Onboarding flow (4 slides)
echo ✅ User authentication (Citizens & Authorities)
echo ✅ Issue reporting with camera
echo ✅ Community voting system
echo ✅ Leaderboards and statistics
echo ✅ Profile management
echo.
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Starting Expo with full app...
npx expo start --clear
echo.
pause