import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { getReports } from '../utils/reports';
import { toggleUpvote, hasUserUpvoted, getUpvoteCount, getCommentCount, getIssueComments, addComment } from '../utils/engagement';
import { getCurrentUser } from '../utils/auth';
import UpvoteButton from '../components/UpvoteButton';
import CommentSection from '../components/CommentSection';
import InfrastructureAlert from '../components/InfrastructureAlert';
import { sortReportsByPriority, getPriorityBadge } from '../utils/priorityRanking';

const Home = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedIssueId, setExpandedIssueId] = useState(null);

  // Handle upvote
  const handleUpvote = (issueId) => {
    toggleUpvote(issueId, currentUser.id);
    setRefreshKey(prev => prev + 1); // Force re-render
  };

  // Handle card click to view details
  const handleCardClick = (issueId) => {
    navigate(`/issue/${issueId}`);
  };

  // Handle comment button click - toggle comments
  const handleCommentClick = (e, issueId) => {
    e.stopPropagation(); // Prevent card click
    setExpandedIssueId(expandedIssueId === issueId ? null : issueId);
  };

  // Handle add comment
  const handleAddComment = (issueId, text) => {
    addComment(issueId, currentUser.id, currentUser.name, text);
    setRefreshKey(prev => prev + 1); // Force re-render to update comment count
  };

  // Define helper functions first
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#FFA500';
      case 'in-progress': return '#FF9933';
      case 'resolved': return '#138808';
      case 'rejected': return '#D32F2F';
      default: return '#666';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#D32F2F';
      case 'medium': return '#FF9933';
      case 'low': return '#138808';
      default: return '#666';
    }
  };

  // Now use the functions
  const allReports = getReports();
  
  // Sort by priority (critical infrastructure gets priority)
  const sortedReports = sortReportsByPriority(allReports, getUpvoteCount, getCommentCount);
  
  const issues = sortedReports.map(report => ({
    ...report,
    timeAgo: getTimeAgo(report.date),
    reporter: report.userName || 'Anonymous',
    priorityBadge: getPriorityBadge(report)
  }));

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>🏠 Community Feed</h1>
          <p>Latest civic issues in your area</p>
        </div>

        <div className="filters">
          <button className="filter-btn active">All Issues</button>
          <button className="filter-btn">Potholes</button>
          <button className="filter-btn">Streetlights</button>
          <button className="filter-btn">Garbage</button>
          <button className="filter-btn">Water Leaks</button>
        </div>

        <div className="issues-grid">
          {issues.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                No issues reported yet. Be the first to report!
              </p>
              <a href="/report" style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#FF9933',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}>
                Report an Issue
              </a>
            </div>
          ) : (
            issues.map((issue) => (
              <div 
                key={issue.id} 
                className="issue-card fade-in"
                onClick={() => handleCardClick(issue.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image if available */}
                {issue.image && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    marginBottom: '15px'
                  }}>
                    <img 
                      src={issue.image} 
                      alt={issue.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}

                <div className="issue-header">
                  <div className="issue-meta">
                    <span className="reporter">👤 {issue.reporter}</span>
                    <span className="time">
                      <Clock size={14} />
                      {issue.timeAgo}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(issue.status) }}
                    >
                      {issue.status}
                    </span>
                    {issue.severity && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        backgroundColor: getSeverityColor(issue.severity),
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        <AlertCircle size={12} />
                        {issue.severity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Infrastructure Alert - Auto-detects nearby facilities */}
                {issue.geoTag && issue.geoTag.latitude && issue.geoTag.longitude && (
                  <InfrastructureAlert report={issue} />
                )}

                {/* Priority Badge for Critical Infrastructure */}
                {issue.priorityBadge && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      backgroundColor: issue.priorityBadge.color,
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      alignSelf: 'flex-start'
                    }}>
                      <span style={{ fontSize: '16px' }}>{issue.priorityBadge.emoji}</span>
                      <TrendingUp size={14} />
                      {issue.priorityBadge.text}
                    </div>
                    {issue.priorityBadge.distanceInfo && (
                      <div style={{
                        fontSize: '11px',
                        color: '#666',
                        fontStyle: 'italic',
                        paddingLeft: '4px'
                      }}>
                        📍 {issue.priorityBadge.distanceInfo}
                      </div>
                    )}
                  </div>
                )}

                <h3 className="issue-title">{issue.title}</h3>
                <p className="issue-description">{issue.description}</p>

                {/* AI Analysis */}
                {issue.aiAnalysis && (
                  <div style={{
                    padding: '10px',
                    backgroundColor: '#F0F7FF',
                    borderLeft: '3px solid #1976D2',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '13px',
                    color: '#1565C0'
                  }}>
                    <strong>AI Analysis:</strong> {issue.aiAnalysis}
                    {issue.accuracy > 0 && (
                      <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                        ({issue.accuracy}% confidence)
                      </span>
                    )}
                  </div>
                )}

                <div className="issue-location">
                  <MapPin size={16} />
                  <span>{issue.location}</span>
                  {issue.geoTag && (
                    <a
                      href={issue.geoTag.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginLeft: '10px',
                        padding: '4px 10px',
                        backgroundColor: '#E3F2FD',
                        color: '#1976D2',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      📍 View Map
                    </a>
                  )}
                </div>

                <div className="issue-actions">
                  <UpvoteButton
                    issueId={issue.id}
                    upvotes={getUpvoteCount(issue.id)}
                    hasUpvoted={hasUserUpvoted(issue.id, currentUser.id)}
                    onUpvote={handleUpvote}
                  />
                  <button 
                    className="action-btn"
                    onClick={(e) => handleCommentClick(e, issue.id)}
                  >
                    <MessageCircle size={16} />
                    <span>{getCommentCount(issue.id)}</span>
                  </button>
                  <span className="category-tag">{issue.category}</span>
                </div>

                {/* Inline Comments Section */}
                {expandedIssueId === issue.id && (
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #E0E0E0' }}>
                    <CommentSection
                      issueId={issue.id}
                      comments={getIssueComments(issue.id)}
                      onAddComment={handleAddComment}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .home-page {
          padding: var(--spacing-xl) 0;
        }

        .page-header {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .page-header h1 {
          color: var(--civic-blue);
          margin-bottom: var(--spacing-sm);
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .filters {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-xl);
          overflow-x: auto;
          padding-bottom: var(--spacing-sm);
        }

        .filter-btn {
          padding: var(--spacing-sm) var(--spacing-md);
          border: 2px solid var(--civic-blue);
          background: transparent;
          color: var(--civic-blue);
          border-radius: var(--radius-xl);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .filter-btn:hover,
        .filter-btn.active {
          background: var(--civic-blue);
          color: var(--text-light);
        }

        .issues-grid {
          display: grid;
          gap: var(--spacing-lg);
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }

        .issue-card {
          background: var(--white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-lg);
          transition: all 0.2s ease;
        }

        .issue-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .issue-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .issue-meta {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }

        .reporter {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .time {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .status-badge {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
        }

        .issue-title {
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
          font-size: 1.1rem;
        }

        .issue-description {
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: var(--spacing-md);
        }

        .issue-location {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-md);
        }

        .issue-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          border: 1px solid var(--emerald-green);
          background: transparent;
          color: var(--emerald-green);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.875rem;
        }

        .action-btn:hover {
          background: var(--emerald-green);
          color: var(--text-light);
        }

        .category-tag {
          margin-left: auto;
          padding: var(--spacing-xs) var(--spacing-sm);
          background: rgba(0, 119, 182, 0.1);
          color: var(--civic-blue);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .issues-grid {
            grid-template-columns: 1fr;
          }
          
          .filters {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;