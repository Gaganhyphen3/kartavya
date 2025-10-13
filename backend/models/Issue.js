const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Potholes',
      'Garbage',
      'Streetlights',
      'Water Leaks',
      'Drainage',
      'Traffic Signals',
      'Public Transport',
      'Parks & Recreation',
      'Noise Pollution',
      'Air Pollution',
      'Other'
    ]
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    }
  },
  images: [{
    url: String,
    publicId: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  votes: {
    upvotes: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      votedAt: { type: Date, default: Date.now }
    }],
    downvotes: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      votedAt: { type: Date, default: Date.now }
    }]
  },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
  }],
  aiAnalysis: {
    confidence: Number,
    suggestedCategory: String,
    suggestedPriority: String,
    description: String,
    processedAt: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Geospatial index for location-based queries
issueSchema.index({ location: '2dsphere' });

// Compound indexes for efficient queries
issueSchema.index({ status: 1, createdAt: -1 });
issueSchema.index({ category: 1, status: 1 });
issueSchema.index({ 'location.pincode': 1, status: 1 });
issueSchema.index({ reportedBy: 1, createdAt: -1 });

// Virtual for upvote count
issueSchema.virtual('upvoteCount').get(function() {
  return this.votes.upvotes.length;
});

// Virtual for downvote count
issueSchema.virtual('downvoteCount').get(function() {
  return this.votes.downvotes.length;
});

// Virtual for net votes
issueSchema.virtual('netVotes').get(function() {
  return this.votes.upvotes.length - this.votes.downvotes.length;
});

// Method to check if user has voted
issueSchema.methods.hasUserVoted = function(userId) {
  const upvoted = this.votes.upvotes.some(vote => vote.user.toString() === userId.toString());
  const downvoted = this.votes.downvotes.some(vote => vote.user.toString() === userId.toString());
  
  if (upvoted) return 'upvote';
  if (downvoted) return 'downvote';
  return null;
};

// Method to toggle vote
issueSchema.methods.toggleVote = function(userId, voteType) {
  const currentVote = this.hasUserVoted(userId);
  
  // Remove existing votes
  this.votes.upvotes = this.votes.upvotes.filter(vote => vote.user.toString() !== userId.toString());
  this.votes.downvotes = this.votes.downvotes.filter(vote => vote.user.toString() !== userId.toString());
  
  // Add new vote if different from current
  if (currentVote !== voteType) {
    if (voteType === 'upvote') {
      this.votes.upvotes.push({ user: userId });
    } else if (voteType === 'downvote') {
      this.votes.downvotes.push({ user: userId });
    }
  }
  
  return this.save();
};

module.exports = mongoose.model('Issue', issueSchema);