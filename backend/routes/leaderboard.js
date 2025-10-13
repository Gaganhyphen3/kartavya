const express = require('express');
const User = require('../models/User');
const Issue = require('../models/Issue');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Get global leaderboard
router.get('/global', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({ isActive: true })
      .select('name role authorityRole profileImage credits stats badges')
      .sort({ credits: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ isActive: true });

    // Find current user's rank
    const currentUserRank = await User.countDocuments({
      isActive: true,
      credits: { $gt: req.user.credits }
    }) + 1;

    const leaderboard = users.map((user, index) => ({
      rank: skip + index + 1,
      id: user._id,
      name: user.name,
      role: user.role,
      authorityRole: user.authorityRole,
      profileImage: user.profileImage,
      credits: user.credits,
      stats: user.stats,
      badges: user.badges.length,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    }));

    res.json({
      leaderboard,
      currentUser: {
        rank: currentUserRank,
        credits: req.user.credits,
        stats: req.user.stats
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get global leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch global leaderboard' });
  }
});

// Get local leaderboard (same pincode)
router.get('/local', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (page - 1) * limit;

    const users = await User.find({ 
      pincode: req.user.pincode,
      isActive: true 
    })
      .select('name role authorityRole profileImage credits stats badges')
      .sort({ credits: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ 
      pincode: req.user.pincode,
      isActive: true 
    });

    // Find current user's local rank
    const currentUserRank = await User.countDocuments({
      pincode: req.user.pincode,
      isActive: true,
      credits: { $gt: req.user.credits }
    }) + 1;

    const leaderboard = users.map((user, index) => ({
      rank: skip + index + 1,
      id: user._id,
      name: user.name,
      role: user.role,
      authorityRole: user.authorityRole,
      profileImage: user.profileImage,
      credits: user.credits,
      stats: user.stats,
      badges: user.badges.length,
      isCurrentUser: user._id.toString() === req.user._id.toString()
    }));

    res.json({
      leaderboard,
      currentUser: {
        rank: currentUserRank,
        credits: req.user.credits,
        stats: req.user.stats
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get local leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch local leaderboard' });
  }
});

// Get category-wise statistics
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const { pincode } = req.query;
    const filter = pincode ? { 'location.pincode': pincode } : {};

    const categoryStats = await Issue.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] }
          },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] }
          },
          rejected: {
            $sum: { $cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          category: '$_id',
          total: 1,
          pending: 1,
          inProgress: 1,
          resolved: 1,
          rejected: 1,
          resolutionRate: {
            $cond: [
              { $gt: ['$total', 0] },
              { $multiply: [{ $divide: ['$resolved', '$total'] }, 100] },
              0
            ]
          }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({
      categories: categoryStats.map(stat => ({
        category: stat.category,
        total: stat.total,
        pending: stat.pending,
        inProgress: stat.inProgress,
        resolved: stat.resolved,
        rejected: stat.rejected,
        resolutionRate: Math.round(stat.resolutionRate * 100) / 100
      }))
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({ error: 'Failed to fetch category statistics' });
  }
});

// Get top contributors by category
router.get('/contributors/:category', authenticateToken, async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 10 } = req.query;

    const contributors = await Issue.aggregate([
      { $match: { category } },
      {
        $group: {
          _id: '$reportedBy',
          totalReports: { $sum: 1 },
          resolvedReports: {
            $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: '$user.name',
          profileImage: '$user.profileImage',
          role: '$user.role',
          authorityRole: '$user.authorityRole',
          totalReports: 1,
          resolvedReports: 1,
          resolutionRate: {
            $cond: [
              { $gt: ['$totalReports', 0] },
              { $multiply: [{ $divide: ['$resolvedReports', '$totalReports'] }, 100] },
              0
            ]
          }
        }
      },
      { $sort: { totalReports: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json({
      category,
      contributors: contributors.map((contributor, index) => ({
        rank: index + 1,
        id: contributor._id,
        name: contributor.name,
        profileImage: contributor.profileImage,
        role: contributor.role,
        authorityRole: contributor.authorityRole,
        totalReports: contributor.totalReports,
        resolvedReports: contributor.resolvedReports,
        resolutionRate: Math.round(contributor.resolutionRate * 100) / 100
      }))
    });
  } catch (error) {
    console.error('Get contributors error:', error);
    res.status(500).json({ error: 'Failed to fetch contributors' });
  }
});

// Get monthly statistics
router.get('/monthly', authenticateToken, async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - parseInt(months));

    const monthlyStats = await Issue.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          total: { $sum: 1 },
          resolved: {
            $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          month: '$_id.month',
          year: '$_id.year',
          total: 1,
          resolved: 1,
          resolutionRate: {
            $cond: [
              { $gt: ['$total', 0] },
              { $multiply: [{ $divide: ['$resolved', '$total'] }, 100] },
              0
            ]
          }
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    res.json({
      monthlyStats: monthlyStats.map(stat => ({
        month: stat.month,
        year: stat.year,
        total: stat.total,
        resolved: stat.resolved,
        resolutionRate: Math.round(stat.resolutionRate * 100) / 100
      }))
    });
  } catch (error) {
    console.error('Get monthly stats error:', error);
    res.status(500).json({ error: 'Failed to fetch monthly statistics' });
  }
});

module.exports = router;