import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import CommentSection from '../components/CommentSection';
import UpvoteButton from '../components/UpvoteButton';
import { getReports } from '../utils/reports';
import { toggleUpvote, hasUserUpvoted, getUpvoteCount, getIssueComments, addComment } from '../utils/engagement';
import { getCurrentUser } from '../utils/auth';

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const issues = getReports();
    const foundIssue = issues.find(i => i.id === id);
    
    if (foundIssue) {
      setIssue(foundIssue);
      setComments(getIssueComments(id));
      setUpvotes(getUpvoteCount(id));
      setHasUpvoted(hasUserUpvoted(id, currentUser.id));
    }
  }, [id, currentUser.id]);

  const handleUpvote = () => {
    const newCount = toggleUpvote(id, currentUser.id);
    setUpvotes(newCount);
    setHasUpvoted(!hasUpvoted);
  };

  const handleAddComment = (issueId, text) => {
    const newComment = addComment(issueId, currentUser.id, currentUser.name, text);
    setComments([...comments, newComment]);
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

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  if (!issue) {
    return (
      <Layout>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <p>Loading issue...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: 'transparent',
            color: 'var(--civic-blue)',
            border: '2px solid var(--civic-blue)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'var(--civic-blue)';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--civic-blue)';
          }}
        >
          <ArrowLeft size={18} />
          Back to Feed
        </button>

        {/* Issue Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  👤 {issue.userName || 'Anonymous'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#999' }}>
                  <Clock size={14} />
                  {getTimeAgo(issue.date)}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{
                padding: '6px 12px',
                backgroundColor: getStatusColor(issue.status),
                color: 'white',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                {issue.status}
              </span>
              {issue.severity && (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  backgroundColor: getSeverityColor(issue.severity),
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  <AlertCircle size={14} />
                  {issue.severity}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '16px' }}>
            {issue.title}
          </h1>

          {/* Image */}
          {issue.image && (
            <div style={{
              width: '100%',
              maxHeight: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <img 
                src={issue.image} 
                alt={issue.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}

          {/* Description */}
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '20px' }}>
            {issue.description}
          </p>

          {/* AI Analysis */}
          {issue.aiAnalysis && (
            <div style={{
              padding: '16px',
              backgroundColor: '#F0F7FF',
              borderLeft: '4px solid #1976D2',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <strong style={{ color: '#1565C0', fontSize: '14px' }}>🤖 AI Analysis:</strong>
              <p style={{ margin: '8px 0 0 0', color: '#1565C0', fontSize: '14px' }}>
                {issue.aiAnalysis}
                {issue.accuracy > 0 && (
                  <span style={{ marginLeft: '8px', fontWeight: '600' }}>
                    ({issue.accuracy}% confidence)
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <MapPin size={18} color="var(--civic-blue)" />
            <span style={{ color: '#666', fontSize: '14px' }}>{issue.location}</span>
            {issue.geoTag && (
              <a
                href={issue.geoTag.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 'auto',
                  padding: '6px 12px',
                  backgroundColor: '#E3F2FD',
                  color: '#1976D2',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                📍 View on Map
              </a>
            )}
          </div>

          {/* Category */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 119, 182, 0.1)',
              color: 'var(--civic-blue)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {issue.category}
            </span>
          </div>

          {/* Upvote Button */}
          <div>
            <UpvoteButton
              issueId={issue.id}
              upvotes={upvotes}
              hasUpvoted={hasUpvoted}
              onUpvote={handleUpvote}
            />
          </div>
        </div>

        {/* Comments Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <CommentSection
            issueId={issue.id}
            comments={comments}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </Layout>
  );
}

export default IssueDetail;
