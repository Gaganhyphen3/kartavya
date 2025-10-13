# 🚀 Easy Start Guide for Kartavya

## ⚡ Quick Start (2 Steps)

### Step 1: Start Backend Server
**Double-click** `START_BACKEND.bat` file

You should see:
```
========================================
   Kartavya Backend Server
========================================

🚀 Kartavya API server running on port 3000
📍 Health check: http://localhost:3000/health
🧪 Test endpoint: http://localhost:3000/api/test
```

### Step 2: Start Frontend App
**Double-click** `START_FRONTEND.bat` file

You should see:
```
========================================
   Kartavya Frontend App
========================================

Metro waiting on exp://192.168.x.x:8081
QR Code appears here
```

## 📱 Test on Mobile

1. **Install Expo Go** on your phone:
   - Android: Google Play Store
   - iOS: App Store

2. **Scan QR code** from Step 2

3. **Kartavya app loads** on your phone!

## 🧪 Test Backend (Optional)

Open browser and visit:
- http://localhost:3000/health
- http://localhost:3000/api/test

Both should show JSON responses.

## ✅ Success Indicators

### Backend Working:
- ✅ "Kartavya API server running on port 3000"
- ✅ No error messages in backend window
- ✅ Browser shows JSON at health URL

### Frontend Working:
- ✅ QR code appears in frontend window
- ✅ "Metro waiting on exp://..." message
- ✅ No red error messages

### Mobile App Working:
- ✅ Expo Go connects successfully
- ✅ Kartavya splash screen with logo
- ✅ App navigation works smoothly

## 🆘 If Something Goes Wrong

### Backend Issues:
- **"Port already in use"**: Close other Node.js processes
- **"Cannot find module"**: Run `npm install` in backend folder
- **"ENOENT error"**: Make sure you're in the right directory

### Frontend Issues:
- **"Metro bundler error"**: Close and restart frontend
- **"Network error"**: Check if backend is running
- **"Dependencies error"**: Run `npm install` in frontend folder

### Mobile Issues:
- **"Cannot connect"**: Make sure phone and computer on same WiFi
- **"QR code won't scan"**: Try typing the URL manually in Expo Go
- **"App crashes"**: Check both backend and frontend are running

## 🎯 What You'll Have

### Complete Civic-Tech App Features:
- 📱 **Beautiful Mobile UI** with civic color palette
- 🔐 **User Authentication** (Citizens & Authorities)
- 📸 **Issue Reporting** with camera integration
- 🗳️ **Community Voting** (upvote/downvote issues)
- 📊 **Leaderboards** and gamification
- 🗺️ **Location Services** (GPS-based reporting)
- 🔄 **Real-time Updates** and notifications

### Test the App:
1. **Register** as a citizen or authority
2. **Report an issue** with photo and location
3. **Vote** on community issues
4. **Check leaderboard** rankings
5. **Explore** all civic engagement features

## 📞 Need Help?

### Quick Fixes:
1. **Restart both servers** (close and reopen .bat files)
2. **Check Windows Firewall** (allow Node.js if prompted)
3. **Verify WiFi connection** (same network for phone and computer)
4. **Update Expo Go** app on your phone

### Manual Commands:
If .bat files don't work, use PowerShell:

**Backend:**
```powershell
cd C:\Users\shett\Desktop\karthavya\backend
node simple-server.js
```

**Frontend:**
```powershell
cd C:\Users\shett\Desktop\karthavya\frontend
npm start
```

## 🌟 You're Ready!

Your **Kartavya civic-tech app** is now ready to help citizens and authorities collaborate on community issues!

The app includes all the features from your original design:
- Civic Blue color palette ✅
- Mobile-first responsive design ✅
- Issue reporting and management ✅
- Community engagement features ✅
- Professional UI/UX ✅

**Double-click the .bat files and start building better communities!** 🏙️