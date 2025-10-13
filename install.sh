#!/bin/bash

echo "========================================"
echo "   Kartavya - Civic Tech App Setup"
echo "========================================"
echo

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies!"
    exit 1
fi

echo
echo "Creating environment file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Environment file created. Please edit backend/.env with your configuration."
else
    echo "Environment file already exists."
fi

cd ..

echo
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies!"
    exit 1
fi

cd ..

echo
echo "========================================"
echo "   Installation Complete!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB URI and other settings"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' in backend folder"
echo "4. Run 'npm start' in frontend folder"
echo
echo "For detailed setup instructions, see setup.md"
echo