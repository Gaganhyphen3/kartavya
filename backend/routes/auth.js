const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  pincode: Joi.string().min(4).max(10).required(),
  role: Joi.string().valid('citizen', 'authority').default('citizen'),
  authorityRole: Joi.string().valid('Municipal Corporation', 'Police', 'Fire Department', 'Water Board', 'Electricity Board', 'Other').when('role', {
    is: 'authority',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
});

const loginSchema = Joi.object({
  identifier: Joi.string().required(), // email or phone
  pincode: Joi.string().required()
});

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { name, email, phone, pincode, role, authorityRole } = value;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists with this email or phone number' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phone,
      pincode,
      role,
      authorityRole
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pincode: user.pincode,
        role: user.role,
        authorityRole: user.authorityRole,
        credits: user.credits,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { identifier, pincode } = value;

    // Find user by email or phone
    const user = await User.findOne({
      $and: [
        { pincode },
        {
          $or: [
            { email: identifier },
            { phone: identifier }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        error: 'Account is deactivated' 
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pincode: user.pincode,
        role: user.role,
        authorityRole: user.authorityRole,
        credits: user.credits,
        stats: user.stats,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Get current user profile
router.get('/me', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      pincode: req.user.pincode,
      role: req.user.role,
      authorityRole: req.user.authorityRole,
      credits: req.user.credits,
      stats: req.user.stats,
      profileImage: req.user.profileImage,
      badges: req.user.badges,
      isVerified: req.user.isVerified
    }
  });
});

module.exports = { router, authenticateToken };