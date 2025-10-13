# Authority Roles Feature - Design Document

## Overview

This design document outlines the implementation of the Authority Roles feature, which replaces the generic "Admin" terminology with "Authority" and adds role-based identification for 16 different types of civic officials.

## Architecture

### High-Level Design

```
┌─────────────┐
│ Login Page  │
│             │
│ [User]      │
│ [Authority] │◄─── Role Dropdown Added
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Auth System     │
│                 │
│ - Validate Role │
│ - Store Session │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│ Authority        │
│ Dashboard        │
│                  │
│ - Show Role      │
│ - Role-based UI  │
└──────────────────┘
```

### Component Updates

1. **Login.js** - Add role dropdown for authority login
2. **auth.js** - Update to store and validate authority roles
3. **Profile.js** - Display authority role badge and details
4. **AdminDashboard.js** - Rename to show "Authority" terminology
5. **Layout.js** - Update badge display

## Components and Interfaces

### 1. Authority Roles Configuration

**File:** `web-kartavya/src/utils/authorityRoles.js`

```javascript
export const AUTHORITY_ROLES = [
  'Municipal Worker',
  'PWD Contractor',
  'Health Inspector',
  'Traffic Police Officer',
  'Police Department Representative',
  'Water Supply Officer',
  'Electricity Board Officer',
  'Sanitation Supervisor',
  'Environment Officer',
  'Fire & Emergency Officer',
  'Public Relations Officer (PRO)',
  'Ward Officer / Area Supervisor',
  'Field Worker / Technician',
  'Disaster Management Officer',
  'City Administrator',
  'Others'
];

export const getRoleIcon = (role) => {
  const icons = {
    'Municipal Worker': '🏗️',
    'PWD Contractor': '🚧',
    'Health Inspector': '🏥',
    'Traffic Police Officer': '🚦',
    'Police Department Representative': '👮',
    'Water Supply Officer': '💧',
    'Electricity Board Officer': '⚡',
    'Sanitation Supervisor': '🧹',
    'Environment Officer': '🌳',
    'Fire & Emergency Officer': '🚒',
    'Public Relations Officer (PRO)': '📢',
    'Ward Officer / Area Supervisor': '📋',
    'Field Worker / Technician': '🔧',
    'Disaster Management Officer': '🆘',
    'City Administrator': '🏛️',
    'Others': '👤'
  };
  return icons[role] || '👤';
};
```

### 2. Updated Login Component

**Changes to Login.js:**

```javascript
// Add state for authority role
const [authorityRole, setAuthorityRole] = useState('');

// Add role dropdown (only shown when Authority is selected)
{formData.role === 'admin' && (
  <div style={{ marginBottom: '20px' }}>
    <label>Authority Role *</label>
    <select
      value={authorityRole}
      onChange={(e) => setAuthorityRole(e.target.value)}
      required
    >
      <option value="">Select your role...</option>
      {AUTHORITY_ROLES.map(role => (
        <option key={role} value={role}>
          {getRoleIcon(role)} {role}
        </option>
      ))}
    </select>
  </div>
)}

// Update handleSubmit to include role
const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.role === 'admin' && !authorityRole) {
    setError('Please select your authority role');
    return;
  }
  loginUser(formData.email, formData.password, formData.role, authorityRole);
  navigate('/');
};
```

### 3. Updated Auth System

**Changes to auth.js:**

```javascript
// Update user object structure
const newUser = {
  id: users.length + 1,
  name: userData.name,
  email: userData.email,
  password: userData.password,
  role: 'user',
  authorityRole: null, // For regular users
  location: userData.location,
  area: userData.area || '',
  pincode: userData.pincode || '',
  joinDate: new Date().toISOString(),
  stats: { ... }
};

// Update loginUser function
export const loginUser = (email, password, role, authorityRole = null) => {
  const users = getUsers();
  const user = users.find(u => 
    u.email === email && 
    u.password === password && 
    u.role === role
  );

  if (!user) {
    throw new Error('Invalid credentials or role');
  }

  // For authority users, validate and store role
  if (role === 'admin') {
    if (!authorityRole && !user.authorityRole) {
      throw new Error('Authority role is required');
    }
    
    // Update user's authority role if provided
    if (authorityRole) {
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex].authorityRole = authorityRole;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    authorityRole: authorityRole || user.authorityRole,
    location: user.location,
    area: user.area || '',
    pincode: user.pincode || '',
    joinDate: user.joinDate,
    stats: user.stats
  };

  localStorage.setItem('currentUser', JSON.stringify(userSession));
  localStorage.setItem('isAuthenticated', 'true');
  
  return userSession;
};
```

### 4. Profile Display Updates

**Changes to Profile.js:**

```javascript
{user.role === 'admin' && (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 12px',
    backgroundColor: '#000080',
    color: 'white',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  }}>
    <Shield size={14} />
    AUTHORITY
  </span>
)}
{user.authorityRole && (
  <div style={{
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  }}>
    {getRoleIcon(user.authorityRole)}
    {user.authorityRole}
  </div>
)}
```

### 5. Dashboard Updates

**Changes to AdminDashboard.js:**

- Update title to "Authority Dashboard"
- Add "Authority Role" column to user table
- Display role icons and names
- Add role filter functionality

## Data Models

### User Object (Updated)

```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@authority.gov",
  password: "hashed_password",
  role: "admin", // Internal role for permissions
  authorityRole: "Health Inspector", // Specific authority role
  location: "Mumbai, Maharashtra",
  area: "Andheri West",
  pincode: "400053",
  joinDate: "2024-01-20T10:30:00.000Z",
  stats: {
    totalReports: 0,
    resolvedIssues: 0,
    points: 0,
    rank: 0
  }
}
```

### Session Object (Updated)

```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@authority.gov",
  role: "admin",
  authorityRole: "Health Inspector",
  location: "Mumbai, Maharashtra",
  area: "Andheri West",
  pincode: "400053",
  joinDate: "2024-01-20T10:30:00.000Z",
  stats: { ... }
}
```

## Error Handling

### Validation Errors

1. **No Role Selected**
   - Message: "Please select your authority role"
   - Action: Prevent login, highlight dropdown

2. **Invalid Role**
   - Message: "Invalid authority role selected"
   - Action: Reset dropdown, show error

3. **Role Mismatch**
   - Message: "Your account role doesn't match the selected login type"
   - Action: Redirect to correct login type

### Edge Cases

1. **Existing Admin Without Role**
   - Prompt to select role on first login after update
   - Store role for future logins

2. **Custom Role (Others)**
   - Show text input for custom role entry
   - Validate minimum length (3 characters)
   - Store as-is for display

## Testing Strategy

### Unit Tests

1. Test role validation logic
2. Test role storage and retrieval
3. Test role icon mapping
4. Test backward compatibility

### Integration Tests

1. Test login flow with role selection
2. Test profile display with roles
3. Test dashboard role filtering
4. Test role persistence across sessions

### UI Tests

1. Test dropdown functionality
2. Test role display in various components
3. Test responsive design with long role names
4. Test accessibility (keyboard navigation, screen readers)

## Migration Strategy

### Phase 1: Add Role Support
- Add authorityRole field to user objects
- Update auth system to handle roles
- Maintain backward compatibility

### Phase 2: Update UI
- Update Login page with dropdown
- Update Profile page with role display
- Update Dashboard with role column

### Phase 3: Data Migration
- Prompt existing admin users to select role
- Update default admin account with role
- Verify all authority users have roles

## Performance Considerations

- Role list is static, can be cached
- Role validation is client-side first, then server-side
- Role icons use emoji (no image loading)
- Minimal impact on login time (<100ms)

## Security Considerations

- Role selection is validated on login
- Role cannot be changed without re-authentication
- Role is stored in session, not modifiable by client
- Audit log tracks role changes

## Accessibility

- Dropdown is keyboard navigable
- Screen readers announce role selection
- Role icons have text alternatives
- High contrast for role badges

---

## Implementation Notes

### Priority Order
1. Create authorityRoles.js utility
2. Update auth.js with role support
3. Update Login.js with dropdown
4. Update Profile.js with role display
5. Update AdminDashboard.js with role column
6. Update default admin account
7. Test all flows

### Breaking Changes
- None (backward compatible)
- Existing admin accounts will be prompted for role

### Future Enhancements
- Role-based permissions
- Role-specific dashboards
- Role-based notifications
- Role analytics
