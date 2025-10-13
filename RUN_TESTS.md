# 🧪 Kartavya Application Testing Guide

## Test Status: ✅ READY

All prerequisites verified and systems are go!

---

## 🎯 What We're Testing

### 1. Backend API Server
- **Port**: 5000
- **Technology**: Node.js + Express + MongoDB
- **Features**: Authentication, Issue Management, Leaderboard

### 2. Web Application
- **Port**: 3000
- **Technology**: React 18 + React Router
- **Design**: Civic-themed, mobile-first, responsive

---

## 🚀 How to Run Tests

### Option 1: Automated Test (Recommended)
```batch
TEST_KARTAVYA.bat
```
Opens two terminal windows and your browser automatically.

### Option 2: Manual Test
```batch
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Web App
cd web-kartavya
npm start
```

---

## ✅ Pre-Test Verification

Run this first to confirm everything is ready:
```batch
VERIFY_SETUP.bat
```

**Expected Output**:
- ✓ Node.js installed
- ✓ npm installed
- ✓ Backend dependencies installed
- ✓ Web app dependencies installed
- ✓ All project files present

---

## 🧪 Test Scenarios

### Test 1: Server Startup
**Steps**:
1. Run `TEST_KARTAVYA.bat`
2. Watch for backend terminal
3. Look for "✅ Connected to MongoDB" or "⚠️ Continuing without database"

**Success Criteria**:
- Backend starts on port 5000
- No fatal errors
- Server listening message appears

### Test 2: Web App Load
**Steps**:
1. Browser opens automatically to http://localhost:3000
2. Wait for React app to compile
3. Home page should appear

**Success Criteria**:
- Page loads without errors
- Civic colors visible (saffron, green)
- Poppins font loaded
- Navigation bar present

### Test 3: Design System
**Check**:
- [ ] Saffron (#FF9933) primary buttons
- [ ] Green (#138808) success elements
- [ ] Navy blue (#000080) text
- [ ] Rounded cards (16px radius)
- [ ] Poppins font family
- [ ] Responsive layout

### Test 4: Navigation
**Steps**:
1. Click "Report Issue" in nav
2. Click "Leaderboard" in nav
3. Click "Profile" in nav
4. Click "Home" to return

**Success Criteria**:
- All pages load
- No console errors
- Smooth transitions
- URLs update correctly

### Test 5: User Registration
**Steps**:
1. Go to Register page
2. Fill in form fields
3. Submit registration

**Success Criteria**:
- Form validates input
- API call to backend
- Success/error message
- Redirect on success

### Test 6: Issue Reporting
**Steps**:
1. Go to Report Issue page
2. Fill in issue details
3. Submit report

**Success Criteria**:
- Form works properly
- Image upload ready (if implemented)
- Location selection works
- API creates issue

### Test 7: Mobile Responsiveness
**Steps**:
1. Open browser DevTools (F12)
2. Toggle device toolbar
3. Test on iPhone/Android sizes
4. Try landscape/portrait

**Success Criteria**:
- Layout adapts to screen size
- Buttons are touch-friendly (44px min)
- Text is readable
- No horizontal scroll

### Test 8: API Integration
**Steps**:
1. Open browser console (F12)
2. Watch Network tab
3. Perform actions (login, report, etc.)
4. Check API calls

**Success Criteria**:
- API calls to localhost:5000
- Proper HTTP methods (GET, POST, etc.)
- JSON responses
- No CORS errors

---

## 📊 Expected Results

### Backend Console Output
```
✅ Connected to MongoDB
Server running on port 5000
CORS enabled for http://localhost:3001
Rate limiting active
```

### Web App Console Output
```
Compiled successfully!
webpack compiled with 0 warnings
```

### Browser Display
- Clean civic-themed interface
- Saffron and green accent colors
- Smooth navigation
- No error messages
- Responsive design

---

## 🐛 Common Issues & Fixes

### Issue: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5000`

**Fix**:
```batch
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: MongoDB Connection Failed
**Error**: `MongoDB connection error`

**Fix**: This is expected! Backend continues without MongoDB for testing.

### Issue: Dependencies Missing
**Error**: `Cannot find module 'express'`

**Fix**:
```batch
cd backend
npm install
```

### Issue: React Build Errors
**Error**: Compilation failed

**Fix**:
```batch
cd web-kartavya
npm install
npm start
```

---

## 📈 Success Metrics

### ✅ Test Passed If:
1. Backend starts without fatal errors
2. Web app loads in browser
3. Home page displays correctly
4. Navigation works
5. Civic design is visible
6. No console errors
7. Forms are interactive
8. API calls succeed

### ⚠️ Acceptable Warnings:
- MongoDB connection timeout (if not installed)
- npm deprecation warnings
- Development mode warnings

### ❌ Test Failed If:
- Server won't start
- Browser shows blank page
- Console has red errors
- Navigation broken
- API calls fail with CORS errors

---

## 📝 Test Report Template

After testing, document your results:

```
TEST DATE: [Date]
TESTER: [Your Name]

BACKEND STATUS: [ ] Pass [ ] Fail
- Port 5000: [ ] Running
- MongoDB: [ ] Connected [ ] Skipped
- API Routes: [ ] Working

WEB APP STATUS: [ ] Pass [ ] Fail
- Port 3000: [ ] Running
- Home Page: [ ] Loads
- Navigation: [ ] Works
- Design: [ ] Correct

ISSUES FOUND:
1. [Describe any issues]
2. [Describe any issues]

NOTES:
[Any additional observations]
```

---

## 🎉 Ready to Test!

**Quick Start**:
```batch
TEST_KARTAVYA.bat
```

**Manual Verification**:
```batch
VERIFY_SETUP.bat
```

**View Results**:
- Backend: http://localhost:5000
- Web App: http://localhost:3000

---

**Good luck with testing! 🚀**
