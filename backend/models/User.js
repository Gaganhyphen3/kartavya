const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10
  },
  role: {
    type: String,
    enum: ['citizen', 'authority'],
    default: 'citizen'
  },
  authorityRole: {
    type: String,
    enum: ['Municipal Corporation', 'Police', 'Fire Department', 'Water Board', 'Electricity Board', 'Other'],
    required: function() { return this.role === 'authority'; }
  },
  profileImage: {
    type: String,
    default: null
  },
  credits: {
    type: Number,
    default: 0
  },
  stats: {
    totalReports: { type: Number, default: 0 },
    resolvedIssues: { type: Number, default: 0 },
    upvotesReceived: { type: Number, default: 0 },
    downvotesReceived: { type: Number, default: 0 }
  },
  badges: [{
    name: String,
    earnedAt: { type: Date, default: Date.now },
    icon: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
userSchema.index({ pincode: 1, role: 1 });
userSchema.index({ credits: -1 });

// Virtual for user's rank (calculated dynamically)
userSchema.virtual('rank').get(function() {
  return this.credits;
});

// Hash password before saving (if using password auth)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Update stats method
userSchema.methods.updateStats = function(type, increment = 1) {
  this.stats[type] = (this.stats[type] || 0) + increment;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);