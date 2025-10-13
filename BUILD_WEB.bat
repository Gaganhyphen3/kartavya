@echo off
title Kartavya - Build Web Version
color 0B
echo.
echo ========================================
echo    Kartavya - Build Web Version
echo ========================================
echo.
echo Building Kartavya for web deployment...
echo.
cd /d "C:\Users\shett\Desktop\karthavya\frontend"
echo Current directory: %CD%
echo.
echo Installing web dependencies...
npx expo install react-dom react-native-web
echo.
echo Building web version...
npx expo export:web
echo.
echo Web build complete! Check the 'web-build' folder.
echo You can deploy this to any web hosting service.
echo.
pause