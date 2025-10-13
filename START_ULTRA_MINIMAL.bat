@echo off
title Kartavya - Ultra Minimal (No Invariant Violation)
color 0C
echo.
echo ========================================
echo    Kartavya - Ultra Minimal Version
echo ========================================
echo.
echo This version eliminates ALL potential issues:
echo ✅ No StyleSheet objects
echo ✅ No complex components
echo ✅ No external dependencies
echo ✅ Pure React Native only
echo ✅ Should fix Invariant Violation
echo.
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Clearing all caches and starting ultra-minimal version...
npx expo start --clear --reset-cache
echo.
pause