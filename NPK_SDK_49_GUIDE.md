# 🚀 Kartavya with NPK SDK 49

## ✅ Updated Configuration

All scripts and configurations have been updated to use **npk** instead of npx for Expo SDK 49.

## 🎯 Quick Start with NPK

### Step 1: Start Backend
**Double-click** `KILL_AND_START.bat`
- Backend runs on port 3001

### Step 2: Start Frontend with NPK
**Double-click** `START_NPK_49.bat`
- Uses npk expo start --clear
- Optimized for SDK 49

### Step 3: Test on Mobile
- Scan QR code with Expo Go
- Should show "Kartavya Works!" on blue background

## 📱 NPK Commands Updated

All package.json scripts now use npk:
```json
{
  "scripts": {
    "start": "npk expo start",
    "android": "npk expo start --android",
    "ios": "npk expo start --ios",
    "web": "npk expo start --web"
  }
}
```

## 🔧 NPK Startup Scripts

### Primary Script:
- **`START_NPK_49.bat`** - Main startup with npk

### Alternative Scripts:
- **`RESET_TO_MINIMAL.bat`** - Reset and start with npk
- **`DIAGNOSE_EXPO.bat`** - Diagnostics with npk
- **`RESTART_FRONTEND.bat`** - Restart with npk

## 🧪 Test NPK Installation

Run this to verify npk works:
```cmd
npk --version
npk expo --version
```

## ✅ Expected Output

With NPK SDK 49, you should see:
```
Using npk for Expo SDK 49...
Checking npk version...
Checking Expo with npk...
Starting Kartavya with npk expo SDK 49...
Metro waiting on exp://...
QR Code appears
```

## 🎨 Minimal App for Testing

The current App.js shows:
```
Kartavya Works!
```
on civic blue background to verify NPK SDK 49 is working.

## 🔄 Restore Full App

Once NPK version works:
```cmd
cd frontend
copy App-complex.js App.js
npk expo start --clear
```

## 🆘 NPK Troubleshooting

### If npk command not found:
```cmd
npm install -g npk
```

### If SDK 49 issues:
```cmd
npk expo install --fix
```

### Clear all caches:
```cmd
npk expo start --clear --reset-cache
```

## 🌟 Success with NPK SDK 49

You'll know it's working when:
- ✅ npk commands execute without errors
- ✅ Expo SDK 49 loads properly
- ✅ QR code appears in terminal
- ✅ "Kartavya Works!" shows on phone
- ✅ No "Sorry about that" errors

**Try `START_NPK_49.bat` now with SDK 49!** 🚀