# Upvotes and Comments Feature - Design Document

## Overview

This design implements a social engagement system for civic issues, allowing users to upvote issues they care about and comment to provide additional context or discuss solutions.

## Architecture

### Data Flow

```
User Action (Upvote/Comment)
         ↓
   Frontend Handler
         ↓
   Update localStorage
         ↓
   Update UI State
         ↓
   Re-render Component
```

## Components and Interfaces

### 1. Upvote Button Component

**File:** `web-kartavya/src/components/UpvoteButton.js`

```javascript
import React from 'react';
import { ThumbsUp } from 'lucide-react';

const UpvoteButton = ({ issueId, upvotes, hasUpvoted, onUpvote }) => {
  return (
    <button
      onClick={() => onUpvote(issueId)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: hasUpvoted ? 'var(--civic-blue)' : 'transparent',
        color: hasUpvoted ? 'white' : 'var(--civic-blue)',
        border: `2px solid var(--civic-blue)`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <ThumbsUp size={18} fill={hasUpvoted ? 'white' : 'none'} />
      <span style={{ fontWeight: '600' }}>{upvotes}</span>
    </button>
  );
};

export default UpvoteButton;
```

### 2. Comment Section Component

**File:** `web-kartavya/src/components/CommentSection.js`

```javascript
import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const CommentSection = ({ issueId, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(issueId, newComment);
      setNewComment('');
    }
  };

  return (
    <div style={{ marginTop: '24px' }}>
      {/* Comment Input */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #E0E0E0',
            borderRadius: '8px',
            fontSize: '14px',
            minHeight: '80px',
            resize: 'vertical'
          }}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          style={{
            marginTop: '8px',
            padding: '10px 20px',
            backgroundColor: 'var(--civic-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Send size={16} />
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div>
        <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageCircle size={20} />
          Comments ({comments.length})
        </h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              padding: '16px',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600', color: 'var(--civic-blue)' }}>
                {comment.userName}
              </span>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {new Date(comment.timestamp).toLocaleString()}
              </span>
            </div>
            <p style={{ color: '#333', lineHeight: '1.5' }}>{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', padding: '24px' }}>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
```

### 3. Engagement Utility Functions

**File:** `web-kartavya/src/utils/engagement.js`

```javascript
// Get all upvotes from localStorage
export const getUpvotes = () => {
  const upvotes = localStorage.getItem('issueUpvotes');
  return upvotes ? JSON.parse(upvotes) : {};
};

// Toggle upvote for an issue
export const toggleUpvote = (issueId, userId) => {
  const upvotes = getUpvotes();
  
  if (!upvotes[issueId]) {
    upvotes[issueId] = [];
  }
  
  const userIndex = upvotes[issueId].indexOf(userId);
  
  if (userIndex > -1) {
    // Remove upvote
    upvotes[issueId].splice(userIndex, 1);
  } else {
    // Add upvote
    upvotes[issueId].push(userId);
  }
  
  localStorage.setItem('issueUpvotes', JSON.stringify(upvotes));
  return upvotes[issueId].length;
};

// Check if user has upvoted an issue
export const hasUserUpvoted = (issueId, userId) => {
  const upvotes = getUpvotes();
  return upvotes[issueId]?.includes(userId) || false;
};

// Get upvote count for an issue
export const getUpvoteCount = (issueId) => {
  const upvotes = getUpvotes();
  return upvotes[issueId]?.length || 0;
};

// Get all comments from localStorage
export const getComments = () => {
  const comments = localStorage.getItem('issueComments');
  return comments ? JSON.parse(comments) : {};
};

// Add a comment to an issue
export const addComment = (issueId, userId, userName, text) => {
  const comments = getComments();
  
  if (!comments[issueId]) {
    comments[issueId] = [];
  }
  
  const newComment = {
    id: Date.now().toString(),
    issueId,
    userId,
    userName,
    text,
    timestamp: new Date().toISOString()
  };
  
  comments[issueId].push(newComment);
  localStorage.setItem('issueComments', JSON.stringify(comments));
  
  return newComment;
};

// Get comments for an issue
export const getIssueComments = (issueId) => {
  const comments = getComments();
  return comments[issueId] || [];
};

// Get comment count for an issue
export const getCommentCount = (issueId) => {
  const comments = getComments();
  return comments[issueId]?.length || 0;
};

// Sort issues by upvotes
export const sortByUpvotes = (issues) => {
  return [...issues].sort((a, b) => {
    const aUpvotes = getUpvoteCount(a.id);
    const bUpvotes = getUpvoteCount(b.id);
    return bUpvotes - aUpvotes;
  });
};
```

### 4. Updated Home Page with Engagement

**Updates to:** `web-kartavya/src/pages/Home.js`

Add upvote and comment display to issue cards:

```javascript
import UpvoteButton from '../components/UpvoteButton';
import { MessageCircle } from 'lucide-react';
import { toggleUpvote, hasUserUpvoted, getUpvoteCount, getCommentCount } from '../utils/engagement';

// In the issue card rendering:
<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
  <UpvoteButton
    issueId={issue.id}
    upvotes={getUpvoteCount(issue.id)}
    hasUpvoted={hasUserUpvoted(issue.id, currentUser.id)}
    onUpvote={handleUpvote}
  />
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
    <MessageCircle size={18} />
    <span>{getCommentCount(issue.id)}</span>
  </div>
</div>
```

### 5. Issue Detail Page with Comments

**New File:** `web-kartavya/src/pages/IssueDetail.js`

```javascript
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CommentSection from '../components/CommentSection';
import UpvoteButton from '../components/UpvoteButton';
import { getIssues } from '../utils/reports';
import { toggleUpvote, hasUserUpvoted, getUpvoteCount, getIssueComments, addComment } from '../utils/engagement';
import { getCurrentUser } from '../utils/auth';

function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const issues = getIssues();
    const foundIssue = issues.find(i => i.id === id);
    setIssue(foundIssue);
    
    if (foundIssue) {
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

  if (!issue) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Issue Details */}
        <div style={{ marginBottom: '24px' }}>
          <h1>{issue.title}</h1>
          <p>{issue.description}</p>
          
          {/* Engagement Actions */}
          <div style={{ marginTop: '16px' }}>
            <UpvoteButton
              issueId={issue.id}
              upvotes={upvotes}
              hasUpvoted={hasUpvoted}
              onUpvote={handleUpvote}
            />
          </div>
        </div>

        {/* Comments */}
        <CommentSection
          issueId={issue.id}
          comments={comments}
          onAddComment={handleAddComment}
        />
      </div>
    </Layout>
  );
}

export default IssueDetail;
```

## Testing Strategy

### Unit Tests
- Test upvote toggle functionality
- Test comment addition
- Test localStorage persistence
- Test sorting by upvotes

### Integration Tests
- Test upvote button in issue cards
- Test comment section in detail view
- Test data persistence across page reloads

### User Acceptance Tests
- Users can upvote issues
- Users can comment on issues
- Upvotes and comments persist
- Popular issues appear first when sorted

## Migration Notes

### Data Migration
- Existing issues will have 0 upvotes initially
- Existing issues will have empty comment arrays
- No data loss for existing functionality

### Backward Compatibility
- All existing features remain functional
- New features are additive only
- localStorage keys are namespaced to avoid conflicts
