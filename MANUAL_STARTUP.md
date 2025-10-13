# 🚀 Manual Startup Guide for Kartavya

## Step-by-Step Backend Connection

### 1. Open PowerShell as Administrator

Right-click on PowerShell and select "Run as Administrator"

### 2. Navigate to Project Directory

```powershell
cd C:\Users\shett\Desktop\karthavya
```

### 3. Start Backend Server

```powershell
cd backend
node simple-server.js
```

**You should see:**
```
🚀 Kartavya API server running on port 3000
📍 Health check: http://localhost:3000/health
🧪 Test endpoint: http://localhost:3000/api/test
```

### 4. Test Backend (Open New PowerShell Window)

```powershell
# Test health endpoint
curl http://localhost:3000/health

# Test API endpoint
curl http://localhost:3000/api/test
```

**Expected Response:**
```json
{"status":"OK","message":"Kartavya API is running","timestamp":"2024-..."}
```

### 5. Start Frontend (New PowerShell Window)

```powershell
cd C:\Users\shett\Desktop\karthavya\frontend
npm start
```

**You should see:**
```
Metro waiting on exp://192.168.x.x:8081
QR Code appears here
```

### 6. Test on Mobile

1. Install **Expo Go** app on your phone
2. Scan the QR code
3. Kartavya app loads!

## 🔧 If Backend Won't Start

### Option 1: Check Dependencies
```powershell
cd backend
npm install
```

### Option 2: Check Node.js
```powershell
node --version
npm --version
```

### Option 3: Kill Existing Processes
```powershell
# Find processes on port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual number)
taskkill /PID 1234 /F
```

### Option 4: Use Different Port
Edit `backend/simple-server.js` and change:
```javascript
const PORT = 3001; // Changed from 3000
```

## 🗄️ Database Connection (Optional)

The simple server works without a database. For full functionality:

1. Go to https://cloud.mongodb.com/
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env`:
```env
MONGODB_URI=your_connection_string_here
```
5. Use `node server.js` instead of `simple-server.js`

## ✅ Success Indicators

### Backend Working:
- ✅ Server starts without errors
- ✅ http://localhost:3000/health returns JSON
- ✅ No error messages in console

### Frontend Working:
- ✅ Metro bundler starts
- ✅ QR code appears
- ✅ No red error messages

### Mobile App Working:
- ✅ Expo Go connects successfully
- ✅ Kartavya splash screen appears
- ✅ App navigation works

## 🆘 Common Issues

### "Port already in use"
- Kill existing Node processes
- Use different port (3001, 3002, etc.)

### "Cannot find module"
- Run `npm install` in both backend and frontend folders

### "Network error"
- Check Windows Firewall
- Make sure both devices on same WiFi

### "Expo Go won't connect"
- Try tunnel mode: `npm start --tunnel`
- Check phone and computer on same network

## 🎯 What You'll Have

Once both servers are running:

### Complete Civic-Tech App:
- 📱 Mobile app with civic UI design
- 🔐 User authentication system
- 📸 Issue reporting with camera
- 🗳️ Community voting features
- 📊 Leaderboards and statistics
- 🗺️ Location-based issue tracking

### Test the App:
1. Register as a citizen
2. Report a test issue
3. Vote on community issues
4. Check leaderboard rankings
5. Test authority features

**Your Kartavya civic-tech app will be fully functional!** 🌟

## 📞 Need Help?

If you encounter issues:
1. Check console error messages
2. Verify both servers are running
3. Test API endpoints with curl
4. Check network connectivity
5. Restart both servers if needed

The app is designed to work offline for testing, so you can explore all features even without a database connection!