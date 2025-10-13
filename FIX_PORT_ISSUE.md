# 🔧 Fix Port Issue - Kartavya Backend

## 🚨 Problem: Port 3000 Already in Use

The error you saw means another process is using port 3000. Here are 3 solutions:

## ✅ Solution 1: Use New Port (RECOMMENDED)

I've updated the server to use port **3001** instead.

**Double-click** `KILL_AND_START.bat` to:
1. Kill any existing Node.js processes
2. Start backend on port 3001

You should see:
```
🚀 Kartavya API server running on port 3001
📍 Health check: http://localhost:3001/health
```

## ✅ Solution 2: Kill Existing Process

**Option A: Use Task Manager**
1. Press `Ctrl + Shift + Esc`
2. Find "Node.js JavaScript Runtime"
3. Right-click → "End task"
4. Run `START_BACKEND.bat` again

**Option B: Use Command Line**
```cmd
taskkill /f /im node.exe
```

## ✅ Solution 3: Find What's Using Port 3000

```cmd
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

## 🧪 Test the Backend

After starting, test these URLs:
- http://localhost:3001/health
- http://localhost:3001/api/test

Both should show JSON responses.

## 📱 Frontend Connection

The frontend is now configured to connect to port **3001**.

Start frontend with:
**Double-click** `START_FRONTEND.bat`

## ✅ Success Indicators

### Backend Working:
- ✅ "Kartavya API server running on port 3001"
- ✅ No "EADDRINUSE" error
- ✅ Browser shows JSON at http://localhost:3001/health

### Frontend Working:
- ✅ QR code appears
- ✅ "Metro waiting on exp://..." message
- ✅ No connection errors

## 🎯 Complete Startup Process

1. **Double-click** `KILL_AND_START.bat` (starts backend on port 3001)
2. **Double-click** `START_FRONTEND.bat` (starts mobile app)
3. **Scan QR code** with Expo Go app
4. **Kartavya loads** on your phone!

## 🆘 Still Having Issues?

### If port 3001 is also busy:
Edit `backend/simple-server.js` and change:
```javascript
const PORT = 3002; // or 3003, 3004, etc.
```

### If frontend can't connect:
Update `frontend/src/services/api.js`:
```javascript
const BASE_URL = __DEV__ ? 'http://localhost:3002/api' : '...';
```

## 🌟 You're Almost There!

The port conflict is a common issue and easily fixed. Once you use the new port (3001), your **Kartavya civic-tech app** will be fully functional!

**Try the `KILL_AND_START.bat` file now!** 🚀