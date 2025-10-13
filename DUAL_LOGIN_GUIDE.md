# 🔐 Dual Login System - User & Admin

## ✅ Complete Authentication System

### Features Implemented

1. **Dual Role Login** - User & Administrator
2. **Credential Storage** - LocalStorage database
3. **User Registration** - With validation
4. **Profile Display** - Shows logged-in user data
5. **Admin Dashboard** - View all users and stats

---

## 🎯 How It Works

### User Database
All credentials are stored in browser's localStorage:
- **Location**: `localStorage.getItem('users')`
- **Format**: JSON array of user objects
- **Persistence**: Survives page refresh

### Default Admin Account
Pre-configured admin account:
- **Email**: `admin@kartavya.com`
- **Password**: `admin123`
- **Role**: Administrator

---

## 🚀 Login Options

### 1. Login as User
**For regular citizens reporting issues**

**Features**:
- Report civic issues
- View community feed
- Track personal reports
- Earn points and rank
- View leaderboard

**Test Account**:
- Register a new account
- Or use any registered user email

### 2. Login as Administrator
**For system administrators**

**Features**:
- View all registered users
- See system statistics
- Monitor total reports
- Track resolution rates
- Access user database table

**Default Admin**:
- Email: `admin@kartavya.com`
- Password: `admin123`

---

## 📋 Step-by-Step Usage

### Register New User

1. Go to `/register`
2. Fill in details:
   - Full Name
   - Email Address
   - Location (City, State)
   - Password
   - Confirm Password
3. Click "Create Account"
4. Redirected to login page

**Validation**:
- Email must be unique
- Passwords must match
- All fields required

### Login as User

1. Go to `/login`
2. Click "User" button (orange)
3. Enter credentials:
   - Email
   - Password
4. Click "Sign In"
5. Access user dashboard

**What You See**:
- Home feed with issues
- Report button
- Leaderboard
- My Reports
- Profile with your stats

### Login as Admin

1. Go to `/login`
2. Click "Admin" button (navy blue)
3. Enter admin credentials:
   - Email: `admin@kartavya.com`
   - Password: `admin123`
4. Click "Sign In"
5. Access admin dashboard

**What You See**:
- System statistics
- Total users count
- Total reports
- Resolution rate
- Complete user database table

---

## 👤 Profile Display

### User Profile Shows:
- **Name** with avatar
- **Email address**
- **Location**
- **Role badge** (if admin)
- **Join date**
- **Statistics**:
  - Total Reports
  - Resolved Issues
  - Points Earned
  - Community Rank
- **Recent Activity**

### Admin Badge
Admins see a special badge:
- Navy blue "ADMIN" tag
- Shield icon
- Displayed on profile

---

## 📊 Admin Dashboard

### Statistics Cards
1. **Total Users** - Count of registered users
2. **Total Reports** - All issues reported
3. **Resolved Issues** - Successfully closed
4. **Resolution Rate** - Percentage resolved

### User Database Table
Displays all registered users with:
- **ID** - User identifier
- **Name** - Full name
- **Email** - Email address
- **Location** - City, State
- **Role** - User or Admin badge
- **Reports** - Number of issues reported
- **Points** - Total points earned
- **Joined** - Registration date

**Features**:
- Sortable columns
- Color-coded roles
- Alternating row colors
- Responsive design

---

## 🗄️ Data Storage Structure

### User Object
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  role: "user", // or "admin"
  location: "Mumbai, Maharashtra",
  joinDate: "2024-01-20T10:30:00.000Z",
  stats: {
    totalReports: 5,
    resolvedIssues: 3,
    points: 150,
    rank: 12
  }
}
```

### Current User Session
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "user",
  location: "Mumbai, Maharashtra",
  joinDate: "2024-01-20T10:30:00.000Z",
  stats: { ... }
}
```

---

## 🔒 Security Features

### Password Validation
- Minimum length check (can be added)
- Confirmation matching
- Stored in localStorage (demo only)

### Role-Based Access
- Users can't access admin dashboard
- Admins see admin dashboard by default
- Protected routes check authentication

### Session Management
- Login creates session
- Logout clears session
- Auto-redirect if not authenticated

---

## 🧪 Testing Guide

### Test User Registration
```
1. Go to http://localhost:3000/register
2. Fill form:
   Name: Test User
   Email: test@example.com
   Location: Delhi, India
   Password: test123
   Confirm: test123
3. Submit
4. Should redirect to login
5. Check localStorage: users array should have new entry
```

### Test User Login
```
1. Go to http://localhost:3000/login
2. Click "User" button
3. Enter: test@example.com / test123
4. Submit
5. Should see home feed
6. Check profile - should show "Test User"
```

### Test Admin Login
```
1. Go to http://localhost:3000/login
2. Click "Admin" button
3. Enter: admin@kartavya.com / admin123
4. Submit
5. Should see admin dashboard
6. Should see user database table
```

### Test Profile Display
```
1. Login as any user
2. Go to Profile page
3. Should see:
   - Your name and email
   - Your location
   - Your stats (reports, points, rank)
   - Join date
   - Recent activity
```

### Test Admin Dashboard
```
1. Login as admin
2. Should automatically see dashboard
3. Verify statistics:
   - Total users count
   - Total reports
   - Resolution rate
4. Check user table:
   - All registered users listed
   - Correct role badges
   - Accurate data
```

### Test Role Switching
```
1. Login as user
2. Try accessing /admin
3. Should redirect to home
4. Logout
5. Login as admin
6. Should access /admin successfully
```

---

## 🎨 UI Elements

### Login Page
- **Role Selector**: Toggle between User/Admin
- **User Button**: Orange (#FF9933)
- **Admin Button**: Navy (#000080)
- **Active State**: Filled background
- **Inactive State**: White background

### Profile Badge
- **Admin Badge**: Navy blue with shield icon
- **Position**: Next to name
- **Style**: Rounded pill shape

### Admin Dashboard
- **Stats Cards**: Color-coded borders
- **User Table**: Striped rows
- **Role Badges**: Color-coded (orange/navy)

---

## 📱 Routes Summary

### Public Routes
- `/welcome` - Onboarding slides
- `/login` - Login with role selection
- `/register` - User registration

### User Routes
- `/` - Home feed (users)
- `/report` - Report issue
- `/leaderboard` - Rankings
- `/my-reports` - Personal reports
- `/profile` - User profile

### Admin Routes
- `/` - Admin dashboard (admins)
- `/admin` - Admin dashboard (direct)

---

## 🔄 Data Flow

### Registration Flow
```
1. User fills registration form
2. Validate email uniqueness
3. Validate password match
4. Create user object with role="user"
5. Add to users array in localStorage
6. Redirect to login
```

### Login Flow
```
1. User selects role (user/admin)
2. Enters email and password
3. Search users array for match
4. Verify role matches selection
5. Create session in localStorage
6. Redirect to appropriate dashboard
```

### Profile Display Flow
```
1. Get current user from localStorage
2. Display user information
3. Show role badge if admin
4. Display statistics
5. Show recent activity
```

---

## 💡 Tips

### For Users
- Register with valid email format
- Remember your password
- Check profile to see your stats
- Earn points by reporting issues

### For Admins
- Use default admin account
- Monitor user registrations
- Track system statistics
- View all user data in table

### For Developers
- Check browser console for errors
- Inspect localStorage for data
- Use React DevTools
- Test both user and admin flows

---

## 🐛 Troubleshooting

### Can't Login
- Check role selection matches account type
- Verify email and password
- Clear localStorage and try again
- Check browser console for errors

### Profile Not Showing Data
- Ensure you're logged in
- Check localStorage for currentUser
- Refresh the page
- Re-login if needed

### Admin Dashboard Empty
- Register some users first
- Login as admin
- Check users array in localStorage
- Verify admin credentials

### Registration Fails
- Check if email already exists
- Ensure passwords match
- Fill all required fields
- Check console for error messages

---

## 🚀 Next Steps

### Backend Integration
1. Replace localStorage with API calls
2. Implement JWT authentication
3. Secure password hashing (bcrypt)
4. Database storage (MongoDB)
5. Session management

### Enhanced Features
1. Password reset functionality
2. Email verification
3. Profile picture upload
4. Edit profile information
5. Admin user management (ban, delete)

### Security Improvements
1. HTTPS only
2. Rate limiting
3. CSRF protection
4. XSS prevention
5. SQL injection prevention

---

**Status**: ✅ FULLY FUNCTIONAL

Both user and admin login systems are working with credential storage and profile display!
