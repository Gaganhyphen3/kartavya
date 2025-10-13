# 🚀 Kartavya Quick Start Guide

## Current Status: ✅ Installation Complete!

You have successfully installed:
- ✅ Node.js v24.10.0
- ✅ npm 11.6.1
- ✅ All backend dependencies
- ✅ All frontend dependencies
- ✅ Expo CLI

## 🗄️ Step 1: Set Up Database (Required)

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)

1. **Go to**: https://cloud.mongodb.com/
2. **Create account** (free)
3. **Create cluster** (free tier available)
4. **Create database user**:
   - Username: `kartavya`
   - Password: `your_secure_password`
5. **Whitelist IP**: Add `0.0.0.0/0` (allow all IPs)
6. **Get connection string**: Click "Connect" → "Connect your application"
7. **Copy the connection string** (looks like):
   ```
   mongodb+srv://kartavya:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB (Advanced users)

1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB service

## 📝 Step 2: Configure Environment

Edit the backend configuration:

```powershell
notepad backend\.env
```

**Replace the contents with:**

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb+srv://kartavya:your_password@cluster0.xxxxx.mongodb.net/kartavya?retryWrites=true&w=majority
JWT_SECRET=kartavya_super_secret_key_make_this_very_long_and_random_for_security
FRONTEND_URL=http://localhost:3001

# Optional: For image uploads (can skip for now)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important**: Replace `your_password` with your actual MongoDB password!

## 🚀 Step 3: Start the Application

### Terminal 1 - Backend API:
```powershell
cd C:\Users\shett\Desktop\karthavya\backend
npm run dev
```

**You should see:**
```
✅ Connected to MongoDB
🚀 Kartavya API server running on port 3000
```

### Terminal 2 - Mobile App:
```powershell
cd C:\Users\shett\Desktop\karthavya\frontend
npm start
```

**You should see:**
```
Metro waiting on exp://192.168.x.x:8081
QR Code appears here
```

## 📱 Step 4: Test on Mobile

1. **Install Expo Go** on your phone
2. **Scan QR code** from Terminal 2
3. **Kartavya app loads!**

## 🧪 Step 5: Test the API

Open browser and visit:
- http://localhost:3000/health (should show "OK")

## ✅ Success Indicators

### Backend Working:
- ✅ "Connected to MongoDB" message
- ✅ "Kartavya API server running on port 3000"
- ✅ http://localhost:3000/health shows JSON response

### Frontend Working:
- ✅ QR code appears in terminal
- ✅ Expo Go app loads Kartavya
- ✅ You see the splash screen with "Kartavya" logo

## 🆘 Troubleshooting

### Backend Issues:
- **"MongoDB connection error"**: Set up MongoDB Atlas (Step 1)
- **"Port already in use"**: Kill process: `netstat -ano | findstr :3000`
- **"Cannot find module"**: Run `npm install` in backend folder

### Frontend Issues:
- **"Metro bundler error"**: Run `npm start --clear` in frontend folder
- **"Expo Go won't connect"**: Make sure both devices on same WiFi

### Database Issues:
- **"Authentication failed"**: Check username/password in connection string
- **"Network timeout"**: Check IP whitelist in MongoDB Atlas

## 🎯 What You'll Have

Once everything is running:

### Complete Civic-Tech App:
- 📱 **Mobile app** with beautiful civic UI
- 🔐 **User registration** (Citizens & Authorities)
- 📸 **Issue reporting** with camera
- 🗳️ **Community voting** system
- 📊 **Leaderboards** and statistics
- 🗺️ **Location-based** issue tracking
- 🔄 **Real-time updates**

### Test Features:
1. **Register** as a citizen
2. **Report an issue** with photo
3. **Vote** on community issues
4. **Check leaderboard** rankings
5. **Switch to authority** role and manage issues

## 📞 Need Help?

If you get stuck:
1. Check error messages in both terminals
2. Verify MongoDB connection string
3. Make sure both servers are running
4. Check firewall/antivirus settings

**Your Kartavya civic-tech app is ready to make communities better!** 🌟