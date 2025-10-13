// Authentication utility functions

// Initialize users database in localStorage
const initializeUsers = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      {
        id: 1,
        name: 'Authority User',
        email: 'authority@kartavya.com',
        password: 'admin123',
        role: 'admin',
        authorityRole: 'Municipal Corporation',
        department: 'Public Works',
        contactNumber: '+91 9876543210',
        location: 'Mumbai, Maharashtra',
        area: 'Andheri West',
        pincode: '400053',
        joinDate: new Date().toISOString(),
        permissions: ['view', 'assign', 'update', 'escalate'],
        isActive: true,
        lastLogin: null,
        stats: {
          totalReports: 0,
          resolvedIssues: 0,
          assignedTasks: 0,
          averageResolutionTime: 0
        }
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};

// Get all users
export const getUsers = () => {
  initializeUsers();
  return JSON.parse(localStorage.getItem('users') || '[]');
};

// Register new user
export const registerUser = (userData) => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: 'user',
    authorityRole: null, // Only for authority users
    location: userData.location,
    area: userData.area || '',
    pincode: userData.pincode || '',
    joinDate: new Date().toISOString(),
    stats: {
      totalReports: 0,
      resolvedIssues: 0,
      points: 0,
      rank: users.filter(u => u.role === 'user').length + 1
    }
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
};

// Register authority user with Gmail
export const registerAuthority = (authorityData) => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.find(u => u.email === authorityData.email)) {
    throw new Error('Email already registered');
  }

  // Validate Gmail format
  if (!authorityData.email.includes('@')) {
    throw new Error('Invalid email format');
  }

  const newAuthority = {
    id: users.length + 1,
    name: authorityData.name,
    email: authorityData.email, // Gmail stored here
    password: authorityData.password,
    role: 'admin',
    authorityRole: authorityData.authorityRole,
    department: authorityData.department || '',
    contactNumber: authorityData.contactNumber || '',
    location: authorityData.location || '',
    area: authorityData.area || '',
    pincode: authorityData.pincode || '',
    joinDate: new Date().toISOString(),
    permissions: authorityData.permissions || ['view', 'assign', 'update', 'escalate'],
    isActive: true,
    lastLogin: null,
    stats: {
      totalReports: 0,
      resolvedIssues: 0,
      assignedTasks: 0,
      averageResolutionTime: 0
    }
  };

  users.push(newAuthority);
  localStorage.setItem('users', JSON.stringify(users));
  return newAuthority;
};

// Login user
export const loginUser = (email, password, role, authorityRole = null) => {
  const users = getUsers();
  
  // Find user by email, password, and role
  const user = users.find(u => 
    u.email === email && 
    u.password === password && 
    u.role === role
  );

  if (!user) {
    // Provide more specific error message
    const emailExists = users.find(u => u.email === email);
    if (!emailExists) {
      throw new Error('Email not found');
    }
    const passwordMatch = users.find(u => u.email === email && u.password === password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }
    throw new Error('Invalid role selected');
  }

  // For authority users, check if active
  if (role === 'admin' && user.isActive === false) {
    throw new Error('Authority account is deactivated');
  }

  // For authority users, validate and store role
  if (role === 'admin') {
    if (!authorityRole && !user.authorityRole) {
      throw new Error('Authority role is required');
    }
    
    // Update user's authority role if provided
    if (authorityRole) {
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex].authorityRole = authorityRole;
        users[userIndex].lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
      }
    } else {
      // Update last login even if role not provided
      updateLastLogin(user.id);
    }
  }

  // Store current user session
  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    authorityRole: authorityRole || user.authorityRole || null,
    department: user.department || '',
    contactNumber: user.contactNumber || '',
    location: user.location,
    area: user.area || '',
    pincode: user.pincode || '',
    joinDate: user.joinDate,
    permissions: user.permissions || [],
    stats: user.stats
  };

  localStorage.setItem('currentUser', JSON.stringify(userSession));
  localStorage.setItem('isAuthenticated', 'true');
  
  return userSession;
};

// Get current logged-in user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isAuthenticated');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Check if current user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};

// Update user stats
export const updateUserStats = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex !== -1) {
    users[userIndex].stats = {
      ...users[userIndex].stats,
      ...updates
    };
    
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user session
    currentUser.stats = users[userIndex].stats;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
};


// Get authority by email (Gmail)
export const getAuthorityByEmail = (email) => {
  const users = getUsers();
  return users.find(u => u.email === email && u.role === 'admin');
};

// Update authority profile
export const updateAuthorityProfile = (userId, updates) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId && u.role === 'admin');
  
  if (userIndex === -1) {
    throw new Error('Authority user not found');
  }

  // Validate email if being updated
  if (updates.email) {
    if (!updates.email.includes('@')) {
      throw new Error('Invalid email format');
    }
    // Check if new email already exists
    const existingUser = users.find(u => u.email === updates.email && u.id !== userId);
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    id: users[userIndex].id, // Preserve ID
    role: users[userIndex].role, // Preserve role
    joinDate: users[userIndex].joinDate // Preserve join date
  };

  localStorage.setItem('users', JSON.stringify(users));

  // Update current user session if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const updatedSession = {
      ...currentUser,
      ...updates
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedSession));
  }

  return users[userIndex];
};

// Get stored Gmail for authority
export const getStoredGmail = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId && u.role === 'admin');
  return user ? user.email : null;
};

// Update last login timestamp
export const updateLastLogin = (userId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].lastLogin = new Date().toISOString();
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// Validate authority credentials
export const validateAuthorityCredentials = (email, password) => {
  const users = getUsers();
  const authority = users.find(u => 
    u.email === email && 
    u.password === password && 
    u.role === 'admin' &&
    u.isActive !== false
  );

  if (!authority) {
    return { valid: false, error: 'Invalid email or password' };
  }

  return { valid: true, user: authority };
};

// Get all authorities
export const getAllAuthorities = () => {
  const users = getUsers();
  return users.filter(u => u.role === 'admin');
};

// Deactivate authority
export const deactivateAuthority = (userId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId && u.role === 'admin');
  
  if (userIndex !== -1) {
    users[userIndex].isActive = false;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  return false;
};

// Reactivate authority
export const reactivateAuthority = (userId) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId && u.role === 'admin');
  
  if (userIndex !== -1) {
    users[userIndex].isActive = true;
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  return false;
};
