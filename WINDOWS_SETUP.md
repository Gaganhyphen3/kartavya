# Kartavya Windows Setup Guide

## Prerequisites Installation

### 1. Install Node.js and npm

**Option A: Download from Official Website (Recommended)**
1. Go to https://nodejs.org/
2. Download the LTS version (Long Term Support)
3. Run the installer and follow the setup wizard
4. Make sure to check "Add to PATH" during installation

**Option B: Using Chocolatey (if you have it)**
```powershell
choco install nodejs
```

**Option C: Using Winget (Windows 10/11)**
```powershell
winget install OpenJS.NodeJS
```

### 2. Verify Installation
After installing Node.js, restart your PowerShell/Command Prompt and run:
```powershell
node --version
npm --version
```
You should see version numbers for both.

### 3. Install Git (if not already installed)
1. Go to https://git-scm.com/download/win
2. Download and install Git for Windows
3. Or use: `winget install Git.Git`

### 4. Install MongoDB (Optional - for local development)

**Option A: MongoDB Community Server**
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install with default settings

**Option B: Use MongoDB Atlas (Cloud - Recommended for beginners)**
1. Go to https://cloud.mongodb.com/
2. Create a free account
3. Create a new cluster
4. Get your connection string

## Project Setup

### 1. Navigate to Project Directory
```powershell
cd C:\Users\shett\Desktop\karthavya
```

### 2. Install Backend Dependencies
```powershell
cd backend
npm install
```

### 3. Setup Environment Variables
```powershell
copy .env.example .env
```

Then edit the `.env` file with your preferred text editor:
```powershell
notepad .env
```

Add your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/kartavya
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
FRONTEND_URL=http://localhost:3001

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Install Frontend Dependencies
```powershell
cd ..\frontend
npm install
```

### 5. Install Expo CLI Globally
```powershell
npm install -g @expo/cli
```

## Running the Application

### 1. Start MongoDB (if using local installation)
```powershell
# Start MongoDB service
net start MongoDB
```

### 2. Start Backend Server
```powershell
cd backend
npm run dev
```
The backend will run on http://localhost:3000

### 3. Start Frontend (in a new PowerShell window)
```powershell
cd frontend
npm start
```

### 4. Run on Mobile Device
1. Install "Expo Go" app on your phone from:
   - Google Play Store (Android)
   - App Store (iOS)
2. Scan the QR code shown in your terminal
3. The app will load on your phone

## Alternative: Using MongoDB Atlas (Cloud Database)

If you prefer not to install MongoDB locally:

1. Go to https://cloud.mongodb.com/
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address
6. Get your connection string
7. Update your `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kartavya?retryWrites=true&w=majority
```

## Troubleshooting

### Common Issues

**1. "npm is not recognized"**
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Try running `refreshenv` if using Chocolatey

**2. "Permission denied" errors**
- Run PowerShell as Administrator
- Or use: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

**3. "Port already in use"**
- Kill the process: `netstat -ano | findstr :3000`
- Then: `taskkill /PID <PID_NUMBER> /F`

**4. MongoDB connection issues**
- Make sure MongoDB service is running
- Check your connection string in `.env`
- For Atlas, verify IP whitelist and credentials

### Useful Commands

```powershell
# Check what's running on port 3000
netstat -ano | findstr :3000

# Kill a process by PID
taskkill /PID <PID> /F

# Clear npm cache
npm cache clean --force

# Restart MongoDB service
net stop MongoDB
net start MongoDB
```

## Next Steps

Once everything is running:

1. **Test the API**: Visit http://localhost:3000/health
2. **Access the mobile app**: Scan QR code with Expo Go
3. **Create test accounts**: Register as both citizen and authority
4. **Report test issues**: Try the full workflow
5. **Check the database**: Use MongoDB Compass to view data

## Development Tools (Optional)

**MongoDB Compass** (Database GUI):
- Download from https://www.mongodb.com/products/compass
- Connect to your local MongoDB or Atlas cluster

**Postman** (API Testing):
- Download from https://www.postman.com/downloads/
- Import the API collection for testing

**VS Code Extensions**:
- ES7+ React/Redux/React-Native snippets
- React Native Tools
- MongoDB for VS Code

## Getting Help

If you encounter issues:
1. Check the error messages carefully
2. Restart your terminal/PowerShell
3. Make sure all prerequisites are installed
4. Check the main setup.md for additional troubleshooting
5. Look at the console logs for detailed error information

Happy coding! 🚀