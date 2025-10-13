@echo off
echo ========================================
echo    Kartavya - Civic Tech App Setup
echo ========================================
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)

echo.
echo Creating environment file...
if not exist .env (
    copy .env.example .env
    echo Environment file created. Please edit backend/.env with your configuration.
) else (
    echo Environment file already exists.
)

cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo    Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend/.env with your MongoDB URI and other settings
echo 2. Start MongoDB service
echo 3. Run 'npm run dev' in backend folder
echo 4. Run 'npm start' in frontend folder
echo.
echo For detailed setup instructions, see setup.md
echo.
pause