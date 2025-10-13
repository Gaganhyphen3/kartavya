# 🔑 Test Credentials

## Quick Login Guide

### 👤 Authority Account (Pre-configured)
```
Email: authority@kartavya.com
Password: admin123
Role: Click "Authority" button
Authority Role: City Administrator
Location: Mumbai, Maharashtra
Area: Andheri West
Pincode: 400053
```

**What you'll see**:
- Authority Dashboard with statistics
- User database table with authority roles
- System overview
- All registered users

**Available Authority Roles**:
- Municipal Worker 🏗️
- PWD Contractor 🚧
- Health Inspector 🏥
- Traffic Police Officer 🚦
- Police Department Representative 👮
- Water Supply Officer 💧
- Electricity Board Officer ⚡
- Sanitation Supervisor 🧹
- Environment Officer 🌳
- Fire & Emergency Officer 🚒
- Public Relations Officer (PRO) 📢
- Ward Officer / Area Supervisor 📋
- Field Worker / Technician 🔧
- Disaster Management Officer 🆘
- City Administrator 🏛️
- Others 👤

---

### 👥 User Accounts

#### Option 1: Register New User
1. Go to `/register`
2. Fill the form
3. Login with your credentials

#### Option 2: Create Test Users
Open browser console and run:
```javascript
// Clear existing data
localStorage.clear();

// Create test users
const testUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@kartavya.com',
    password: 'admin123',
    role: 'admin',
    location: 'Mumbai, Maharashtra',
    area: 'Andheri West',
    pincode: '400053',
    joinDate: new Date().toISOString(),
    stats: { totalReports: 0, resolvedIssues: 0, points: 0, rank: 0 }
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    password: 'user123',
    role: 'user',
    location: 'Delhi, India',
    area: 'Connaught Place',
    pincode: '110001',
    joinDate: new Date().toISOString(),
    stats: { totalReports: 15, resolvedIssues: 10, points: 450, rank: 1 }
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'user123',
    role: 'user',
    location: 'Bangalore, Karnataka',
    area: 'Koramangala',
    pincode: '560034',
    joinDate: new Date().toISOString(),
    stats: { totalReports: 12, resolvedIssues: 8, points: 380, rank: 2 }
  }
];

localStorage.setItem('users', JSON.stringify(testUsers));
console.log('Test users created!');
```

Then login with:
```
User 1:
Email: rajesh@example.com
Password: user123
Role: User
Area: Connaught Place
Pincode: 110001

User 2:
Email: priya@example.com
Password: user123
Role: User
Area: Koramangala
Pincode: 560034
```

---

## 🧪 Testing Scenarios

### Scenario 1: First Time User
1. Open app → See onboarding
2. Click "Get Started"
3. Click "Sign Up"
4. Register new account
5. Login with new credentials
6. See home feed

### Scenario 2: Admin Login
1. Go to login page
2. Click "Admin" button (navy blue)
3. Enter admin credentials
4. See admin dashboard
5. View user database

### Scenario 3: User Login
1. Go to login page
2. Click "User" button (orange)
3. Enter user credentials
4. See home feed
5. Check profile page

### Scenario 4: Wrong Role
1. Try logging in as User with admin email
2. Should show error
3. Switch to Admin role
4. Should login successfully

---

## 📊 What to Check

### After User Login
- ✓ Home feed displays
- ✓ Navigation works
- ✓ Profile shows your data
- ✓ Stats are visible
- ✓ Logout button works

### After Admin Login
- ✓ Admin dashboard displays
- ✓ Statistics cards show data
- ✓ User table is populated
- ✓ All users are listed
- ✓ Role badges are correct

### In Profile Page
- ✓ Name and email correct
- ✓ Location displayed
- ✓ Admin badge (if admin)
- ✓ Stats are accurate
- ✓ Join date shown

---

## 🔍 Inspect Data

### View Stored Users
Open browser console:
```javascript
JSON.parse(localStorage.getItem('users'))
```

### View Current Session
```javascript
JSON.parse(localStorage.getItem('currentUser'))
```

### Check Authentication
```javascript
localStorage.getItem('isAuthenticated')
```

### Clear All Data
```javascript
localStorage.clear()
location.reload()
```

---

## 🎯 Quick Test Checklist

- [ ] Admin can login with admin@kartavya.com
- [ ] User can register new account
- [ ] User can login with registered email
- [ ] Wrong role shows error
- [ ] Profile displays correct user data
- [ ] Admin sees dashboard with user table
- [ ] User sees home feed
- [ ] Logout works correctly
- [ ] Data persists after refresh
- [ ] Role badge shows for admin

---

**Ready to test!** Start with admin login to see the full system.
