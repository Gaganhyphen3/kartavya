const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const User = require('../models/User');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Configure multer for profile image upload
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, folder = 'kartavya/profiles') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder,
        resource_type: 'image',
        transformation: [
          { width: 300, height: 300, crop: 'fill', gravity: 'face' },
          { quality: 'auto:good' }
        ]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

// Get user profile
router.get('/profile/:id?', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id || req.user._id;
    
    const user = await User.findById(userId).select('-__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        pincode: user.pincode,
        role: user.role,
        authorityRole: user.authorityRole,
        profileImage: user.profileImage,
        credits: user.credits,
        stats: user.stats,
        badges: user.badges,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.patch('/profile', authenticateToken, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = req.user;

    // Update basic info
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Handle profile image upload
    if (req.file) {
      try {
        // Delete old image if exists
        if (user.profileImage) {
          const publicId = user.profileImage.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`kartavya/profiles/${publicId}`);
        }

        // Upload new image
        const result = await uploadToCloudinary(req.file.buffer);
        user.profileImage = result.secure_url;
      } catch (uploadError) {
        console.error('Profile image upload error:', uploadError);
        return res.status(400).json({ error: 'Failed to upload profile image' });
      }
    }

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: user.profileImage,
        credits: user.credits,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    
    // Calculate additional stats
    const totalIssues = await require('../models/Issue').countDocuments({ reportedBy: user._id });
    const resolvedIssues = await require('../models/Issue').countDocuments({ 
      reportedBy: user._id, 
      status: 'Resolved' 
    });
    const pendingIssues = await require('../models/Issue').countDocuments({ 
      reportedBy: user._id, 
      status: 'Pending' 
    });
    const inProgressIssues = await require('../models/Issue').countDocuments({ 
      reportedBy: user._id, 
      status: 'In Progress' 
    });

    res.json({
      stats: {
        ...user.stats,
        totalIssues,
        resolvedIssues,
        pendingIssues,
        inProgressIssues,
        credits: user.credits,
        badges: user.badges.length,
        resolutionRate: totalIssues > 0 ? ((resolvedIssues / totalIssues) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Award badge to user (admin/system function)
router.post('/award-badge', authenticateToken, async (req, res) => {
  try {
    // This would typically be restricted to admin users or system processes
    const { userId, badgeName, badgeIcon } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has this badge
    const existingBadge = user.badges.find(badge => badge.name === badgeName);
    if (existingBadge) {
      return res.status(400).json({ error: 'User already has this badge' });
    }

    user.badges.push({
      name: badgeName,
      icon: badgeIcon || '🏆'
    });

    await user.save();

    res.json({
      message: 'Badge awarded successfully',
      badge: user.badges[user.badges.length - 1]
    });
  } catch (error) {
    console.error('Award badge error:', error);
    res.status(500).json({ error: 'Failed to award badge' });
  }
});

// Get users in same pincode (for community features)
router.get('/community', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({ 
      pincode: req.user.pincode,
      _id: { $ne: req.user._id },
      isActive: true
    })
    .select('name role authorityRole profileImage credits stats badges')
    .sort({ credits: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await User.countDocuments({ 
      pincode: req.user.pincode,
      _id: { $ne: req.user._id },
      isActive: true
    });

    res.json({
      users: users.map(user => ({
        id: user._id,
        name: user.name,
        role: user.role,
        authorityRole: user.authorityRole,
        profileImage: user.profileImage,
        credits: user.credits,
        stats: user.stats,
        badgeCount: user.badges.length
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get community error:', error);
    res.status(500).json({ error: 'Failed to fetch community users' });
  }
});

module.exports = router;