import React, { useState, useEffect } from 'react';
import { User, MapPin, Award, TrendingUp, Calendar, Shield, Mail, Trophy, Medal } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { getRoleIcon, getRoleColor } from '../utils/authorityRoles';
import { getReports } from '../utils/reports';
import { getUpvoteCount } from '../utils/engagement';

function Profile() {
  const [topContributors, setTopContributors] = useState([]);
  
  const user = getCurrentUser() || {
    name: 'Guest User',
    email: 'guest@example.com',
    location: 'Unknown',
    role: 'user',
    joinDate: new Date().toISOString(),
    stats: {
      totalReports: 0,
      resolvedIssues: 0,
      points: 0,
      rank: 0
    }
  };

  useEffect(() => {
    calculateTopContributors();
  }, []);

  const calculateTopContributors = () => {
    const reports = getReports();
    const userStats = {};

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
      
      if (report.status === 'resolved') {
        userStats[userId].issuesResolved += 1;
      }
    });

    const leaderboard = Object.values(userStats).map(user => {
      user.points = (user.reportsSubmitted * 20) + (user.totalUpvotes * 5) + (user.issuesResolved * 50);
      return user;
    });

    leaderboard.sort((a, b) => b.points - a.points);
    leaderboard.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    setTopContributors(leaderboard.slice(0, 5));
  };

  const getBadge = (points, reports) => {
    if (points >= 500) return { name: 'Civic Champion', color: '#138808' };
    if (points >= 300) return { name: 'Community Hero', color: '#138808' };
    if (points >= 200) return { name: 'Problem Solver', color: '#138808' };
    if (points >= 100) return { name: 'Active Reporter', color: '#138808' };
    if (reports >= 3) return { name: 'Rising Star', color: '#138808' };
    return { name: 'New Contributor', color: '#138808' };
  };

  const allBadges = [
    { name: 'New Contributor', icon: '🌱', requirement: 'Join Kartavya', points: 0, reports: 0 },
    { name: 'Rising Star', icon: '⭐', requirement: '3+ Reports', points: 0, reports: 3 },
    { name: 'Active Reporter', icon: '📢', requirement: '100+ Points', points: 100, reports: 0 },
    { name: 'Problem Solver', icon: '🔧', requirement: '200+ Points', points: 200, reports: 0 },
    { name: 'Community Hero', icon: '🦸', requirement: '300+ Points', points: 300, reports: 0 },
    { name: 'Civic Champion', icon: '🏆', requirement: '500+ Points', points: 500, reports: 0 }
  ];

  const isBadgeUnlocked = (badge) => {
    const userPoints = user.stats.points || 0;
    const userReports = user.stats.totalReports || 0;
    
    if (badge.reports > 0) {
      return userReports >= badge.reports;
    }
    return userPoints >= badge.points;
  };

  const recentActivity = [
    { action: 'Reported', issue: 'Broken streetlight', date: '2024-01-20' },
    { action: 'Resolved', issue: 'Pothole on MG Road', date: '2024-01-18' },
    { action: 'Upvoted', issue: 'Water supply issue', date: '2024-01-15' }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: '700', 
        color: '#000080',
        marginBottom: '30px'
      }}>
        My Profile
      </h1>

      {/* Profile Card */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#FF9933',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: '700'
          }}>
            {user.name.charAt(0)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#000080',
                margin: 0
              }}>
                {user.name}
              </h2>
              {user.role === 'admin' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  {user.authorityRole && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: '#E3F2FD',
                      color: getRoleColor(user.authorityRole),
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}>
                      <span style={{ fontSize: '16px' }}>{getRoleIcon(user.authorityRole)}</span>
                      {user.authorityRole}
                    </span>
                  )}
                </div>
              )}
            </div>
            <p style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: '#666',
              marginBottom: '5px',
              fontSize: '14px'
            }}>
              <Mail size={16} />
              {user.email}
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#666',
                fontSize: '14px',
                margin: 0
              }}>
                <MapPin size={16} />
                {user.location}
              </p>
              {user.area && (
                <p style={{
                  fontSize: '13px',
                  color: '#999',
                  margin: 0,
                  paddingLeft: '21px'
                }}>
                  {user.area} {user.pincode && `• ${user.pincode}`}
                </p>
              )}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#666',
          fontSize: '14px',
          paddingTop: '15px',
          borderTop: '1px solid #F0F0F0'
        }}>
          <Calendar size={16} />
          Member since {new Date(user.joinDate).toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#FF9933',
            marginBottom: '5px'
          }}>
            {user.stats.totalReports}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Total Reports
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#138808',
            marginBottom: '5px'
          }}>
            {user.stats.resolvedIssues}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Resolved Issues
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#000080',
            marginBottom: '5px'
          }}>
            {user.stats.points}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Total Points
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '700',
            color: '#FFD700',
            marginBottom: '5px'
          }}>
            #{user.stats.rank}
          </div>
          <div style={{ color: '#666', fontSize: '14px' }}>
            Community Rank
          </div>
        </div>
      </div>

      {/* Badge Progression Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <Award size={24} color="#FF9933" />
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#000080',
            margin: 0
          }}>
            Badge Progression
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px'
        }}>
          {allBadges.map((badge, index) => {
            const unlocked = isBadgeUnlocked(badge);
            
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: unlocked ? '#E8F5E9' : '#F5F5F5',
                  borderRadius: '12px',
                  border: unlocked ? '2px solid #138808' : '2px solid #E0E0E0',
                  opacity: unlocked ? 1 : 0.5,
                  transition: 'all 0.3s',
                  cursor: unlocked ? 'default' : 'not-allowed',
                  position: 'relative'
                }}
              >
                {/* Badge Icon */}
                <div style={{
                  fontSize: '48px',
                  marginBottom: '10px',
                  filter: unlocked ? 'none' : 'grayscale(100%)',
                  opacity: unlocked ? 1 : 0.4
                }}>
                  {badge.icon}
                </div>

                {/* Badge Name */}
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: unlocked ? '#138808' : '#999',
                  textAlign: 'center',
                  marginBottom: '5px'
                }}>
                  {badge.name}
                </div>

                {/* Requirement */}
                <div style={{
                  fontSize: '11px',
                  color: unlocked ? '#666' : '#BBB',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {badge.requirement}
                </div>

                {/* Locked Overlay */}
                {!unlocked && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '20px',
                    opacity: 0.6
                  }}>
                    🔒
                  </div>
                )}

                {/* Unlocked Checkmark */}
                {unlocked && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '20px'
                  }}>
                    ✅
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Info */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#FFF9E6',
          borderRadius: '8px',
          border: '1px solid #FFD700',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#666'
          }}>
            You have unlocked <strong style={{ color: '#138808' }}>
              {allBadges.filter(b => isBadgeUnlocked(b)).length}
            </strong> out of <strong>{allBadges.length}</strong> badges! 
            Keep contributing to unlock more! 🎯
          </p>
        </div>
      </div>

      {/* Top Contributors Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <Trophy size={24} color="#FF9933" />
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#000080',
            margin: 0
          }}>
            Top Contributors
          </h3>
        </div>

        {topContributors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999'
          }}>
            <p>No contributors yet. Be the first to report an issue!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topContributors.map((contributor) => {
              const badge = getBadge(contributor.points, contributor.reportsSubmitted);
              const isTopThree = contributor.rank <= 3;
              
              return (
                <div
                  key={contributor.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    background: isTopThree 
                      ? 'linear-gradient(135deg, #FF9933 0%, #FFB366 100%)'
                      : '#F9F9F9',
                    borderRadius: '12px',
                    gap: '15px',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  {/* Rank */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isTopThree ? 'rgba(255,255,255,0.3)' : '#FF9933',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '18px',
                    color: isTopThree ? 'white' : 'white',
                    flexShrink: 0
                  }}>
                    {contributor.rank === 1 && <Trophy size={20} />}
                    {contributor.rank === 2 && <Medal size={20} />}
                    {contributor.rank === 3 && <Award size={20} />}
                    {contributor.rank > 3 && `#${contributor.rank}`}
                  </div>

                  {/* User Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      color: isTopThree ? 'white' : '#000080',
                      marginBottom: '4px'
                    }}>
                      {contributor.name}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      backgroundColor: badge.color,
                      color: 'white',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {badge.name}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: isTopThree ? 'white' : '#FF9933'
                    }}>
                      {contributor.points}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: isTopThree ? 'rgba(255,255,255,0.9)' : '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {contributor.reportsSubmitted} Reports
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#000080',
          marginBottom: '20px'
        }}>
          Recent Activity
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#F9F9F9',
                borderRadius: '8px'
              }}
            >
              <div>
                <span style={{ fontWeight: '600', color: '#FF9933' }}>
                  {activity.action}
                </span>
                {' '}
                <span style={{ color: '#666' }}>
                  {activity.issue}
                </span>
              </div>
              <span style={{ fontSize: '14px', color: '#999' }}>
                {new Date(activity.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
