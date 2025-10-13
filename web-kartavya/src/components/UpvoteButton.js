import React from 'react';
import { ThumbsUp } from 'lucide-react';

const UpvoteButton = ({ issueId, upvotes, hasUpvoted, onUpvote }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card click when clicking upvote
        onUpvote(issueId);
      }}
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
        transition: 'all 0.2s ease',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: '600'
      }}
      onMouseEnter={(e) => {
        if (!hasUpvoted) {
          e.target.style.backgroundColor = 'rgba(0, 119, 182, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!hasUpvoted) {
          e.target.style.backgroundColor = 'transparent';
        }
      }}
    >
      <ThumbsUp size={18} fill={hasUpvoted ? 'white' : 'none'} />
      <span>{upvotes}</span>
    </button>
  );
};

export default UpvoteButton;
