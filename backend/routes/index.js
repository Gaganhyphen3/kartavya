const express = require('express');
const { router: authRoutes } = require('./auth');
const issueRoutes = require('./issues');
const userRoutes = require('./users');
const leaderboardRoutes = require('./leaderboard');

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/issues', issueRoutes);
router.use('/users', userRoutes);
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;