import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { getReports } from '../utils/reports';
import { getUpvoteCount } from '../utils/engagement';

function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    calculateLeaderboard();
  }, []);

  const calculateLeaderboard = () => {
    const reports = getReports();
    const userStats = {};

    // Calculate stats for each user
    reports.forEach(report => {
      const userId = report.userId;
      const userName = report.userName || 'Anonymous';
      
      if (!userStats[userId]) {
        userStats[userId] = {
          id: userId,
          name: userName,
          reportsSubmitted: 0,
          totalUpvotes: 0,
          issuesResolved: 0,
          points: 0
        };
      }

      userStats[userId].reportsSubmitted += 1;
      userStats[userId].totalUpvotes += getUpvoteCount(report.id);
      
      // Count resolved issues
      if (report.status === 'resolved') {
        userStats[userId].issuesResolved += 1;
      }
    });

    // Calculate points and convert to array
    const leaderboard = Object.values(userStats).map(user => {
      // Points calculation: reports * 20 + upvotes * 5 + resolved * 50
      user.points = (user.reportsSubmitted * 20) + (user.totalUpvotes * 5) + (user.issuesResolved * 50);
      return user;
    });

    // Sort by points (highest first) and add rank
    leaderboard.sort((a, b) => b.points - a.points);
    leaderboard.forEach((user, index) => {
      user.rank = index + 1;
      user.reports = user.reportsSubmitted;
    });
    
    setTopUsers(leaderboard);
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy size={24} color="#FFD700" />;
    if (rank === 2) return <Medal size={24} color="#C0C0C0" />;
    if (rank === 3) return <Award size={24} color="#CD7F32" />;
    return <span style={{ fontSize: '18px', fontWeight: '700' }}>#{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#000080';
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: '700', 
        color: '#000080',
        marginBottom: '10px'
      }}>
        Community Leaderboard
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Top contributors making a difference in their communities
      </p>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {topUsers.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <Trophy size={64} color="#ccc" style={{ marginBottom: '20px' }} />
            <h3 style={{ marginBottom: '10px', color: '#999' }}>No Reports Yet</h3>
            <p>The leaderboard will show users when they start submitting reports.</p>
            <p style={{ marginTop: '20px', fontSize: '14px' }}>Be the first to report an issue and claim the top spot! 🏆</p>
          </div>
        ) : (
          topUsers.map((user, index) => (
          <div
            key={user.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderBottom: index < topUsers.length - 1 ? '1px solid #F0F0F0' : 'none',
              backgroundColor: user.rank <= 3 ? '#FFF9F0' : 'white',
              transition: 'background-color 0.2s'
            }}
          >
            <div style={{
              width: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: getRankColor(user.rank)
            }}>
              {getRankIcon(user.rank)}
            </div>

            <div style={{ flex: 1, marginLeft: '15px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#000080',
                marginBottom: '5px'
              }}>
                {user.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {user.reports} reports submitted
              </p>
            </div>

            <div style={{
              textAlign: 'right'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#FF9933'
              }}>
                {user.points}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                textTransform: 'uppercase'
              }}>
                Points
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#E8F5E9',
        borderRadius: '12px',
        border: '2px solid #138808'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#138808',
          marginBottom: '10px'
        }}>
          How to Earn Points
        </h3>
        <ul style={{ color: '#2E7D32', lineHeight: '1.8' }}>
          <li>Report an issue: <strong>+20 points</strong></li>
          <li>Issue gets resolved: <strong>+50 points</strong></li>
          <li>Upvote from community: <strong>+5 points</strong></li>
          <li>Helpful comment: <strong>+10 points</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
