const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Joi = require('joi');
const Issue = require('../models/Issue');
const User = require('../models/User');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Validation schemas
const createIssueSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(10).max(1000).required(),
  category: Joi.string().valid(
    'Potholes', 'Garbage', 'Streetlights', 'Water Leaks', 'Drainage',
    'Traffic Signals', 'Public Transport', 'Parks & Recreation',
    'Noise Pollution', 'Air Pollution', 'Other'
  ).required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
    address: Joi.string().min(5).max(200).required(),
    pincode: Joi.string().min(4).max(10).required()
  }).required()
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer, folder = 'kartavya/issues') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder,
        resource_type: 'image',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
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

// Create new issue
router.post('/', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const { error, value } = createIssueSchema.validate(JSON.parse(req.body.data || '{}'));
    if (error) {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.details[0].message 
      });
    }

    const { title, description, category, priority, location } = value;

    // Upload images to Cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer);
          images.push({
            url: result.secure_url,
            publicId: result.public_id
          });
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
        }
      }
    }

    // Create issue
    const issue = new Issue({
      title,
      description,
      category,
      priority,
      location: {
        type: 'Point',
        coordinates: location.coordinates,
        address: location.address,
        pincode: location.pincode
      },
      images,
      reportedBy: req.user._id
    });

    await issue.save();

    // Update user stats
    await req.user.updateStats('totalReports');
    
    // Award credits for reporting
    req.user.credits += 10;
    await req.user.save();

    // Populate user data for response
    await issue.populate('reportedBy', 'name role authorityRole');

    res.status(201).json({
      message: 'Issue reported successfully',
      issue: {
        id: issue._id,
        title: issue.title,
        description: issue.description,
        category: issue.category,
        priority: issue.priority,
        status: issue.status,
        location: issue.location,
        images: issue.images,
        reportedBy: issue.reportedBy,
        upvoteCount: issue.upvoteCount,
        downvoteCount: issue.downvoteCount,
        createdAt: issue.createdAt
      }
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ error: 'Failed to create issue' });
  }
});

// Get issues feed
router.get('/feed', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { category, status, pincode, priority } = req.query;
    
    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (pincode) filter['location.pincode'] = pincode;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter)
      .populate('reportedBy', 'name role authorityRole profileImage')
      .populate('resolvedBy', 'name role authorityRole')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments(filter);

    const issuesWithVotes = issues.map(issue => ({
      id: issue._id,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      priority: issue.priority,
      status: issue.status,
      location: issue.location,
      images: issue.images,
      reportedBy: issue.reportedBy,
      resolvedBy: issue.resolvedBy,
      resolvedAt: issue.resolvedAt,
      upvoteCount: issue.upvoteCount,
      downvoteCount: issue.downvoteCount,
      netVotes: issue.netVotes,
      userVote: issue.hasUserVoted(req.user._id),
      commentsCount: issue.comments.length,
      createdAt: issue.createdAt
    }));

    res.json({
      issues: issuesWithVotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});

// Get user's issues
router.get('/my-reports', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { status } = req.query;
    
    const filter = { reportedBy: req.user._id };
    if (status) filter.status = status;

    const issues = await Issue.find(filter)
      .populate('resolvedBy', 'name role authorityRole')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments(filter);

    const issuesWithVotes = issues.map(issue => ({
      id: issue._id,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      priority: issue.priority,
      status: issue.status,
      location: issue.location,
      images: issue.images,
      resolvedBy: issue.resolvedBy,
      resolvedAt: issue.resolvedAt,
      upvoteCount: issue.upvoteCount,
      downvoteCount: issue.downvoteCount,
      netVotes: issue.netVotes,
      userVote: issue.hasUserVoted(req.user._id),
      commentsCount: issue.comments.length,
      createdAt: issue.createdAt
    }));

    res.json({
      issues: issuesWithVotes,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get my reports error:', error);
    res.status(500).json({ error: 'Failed to fetch your reports' });
  }
});

// Vote on issue
router.post('/:id/vote', authenticateToken, async (req, res) => {
  try {
    const { voteType } = req.body;
    
    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    const previousVote = issue.hasUserVoted(req.user._id);
    await issue.toggleVote(req.user._id, voteType);

    // Update reporter's stats
    const reporter = await User.findById(issue.reportedBy);
    if (reporter) {
      if (previousVote === 'upvote' && voteType !== 'upvote') {
        reporter.stats.upvotesReceived = Math.max(0, reporter.stats.upvotesReceived - 1);
      } else if (previousVote !== 'upvote' && voteType === 'upvote') {
        reporter.stats.upvotesReceived += 1;
      }
      
      if (previousVote === 'downvote' && voteType !== 'downvote') {
        reporter.stats.downvotesReceived = Math.max(0, reporter.stats.downvotesReceived - 1);
      } else if (previousVote !== 'downvote' && voteType === 'downvote') {
        reporter.stats.downvotesReceived += 1;
      }
      
      await reporter.save();
    }

    res.json({
      message: 'Vote updated successfully',
      upvoteCount: issue.upvoteCount,
      downvoteCount: issue.downvoteCount,
      netVotes: issue.netVotes,
      userVote: issue.hasUserVoted(req.user._id)
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: 'Failed to update vote' });
  }
});

// Update issue status (authorities only)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'authority') {
      return res.status(403).json({ error: 'Only authorities can update issue status' });
    }

    const { status } = req.body;
    
    if (!['Pending', 'In Progress', 'Resolved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }

    issue.status = status;
    
    if (status === 'In Progress') {
      issue.assignedTo = req.user._id;
    } else if (status === 'Resolved') {
      issue.resolvedBy = req.user._id;
      issue.resolvedAt = new Date();
      
      // Award credits to reporter
      const reporter = await User.findById(issue.reportedBy);
      if (reporter) {
        reporter.credits += 25;
        await reporter.updateStats('resolvedIssues');
        await reporter.save();
      }
    }

    await issue.save();
    await issue.populate(['reportedBy', 'assignedTo', 'resolvedBy'], 'name role authorityRole');

    res.json({
      message: 'Issue status updated successfully',
      issue: {
        id: issue._id,
        status: issue.status,
        assignedTo: issue.assignedTo,
        resolvedBy: issue.resolvedBy,
        resolvedAt: issue.resolvedAt
      }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update issue status' });
  }
});

module.exports = router;