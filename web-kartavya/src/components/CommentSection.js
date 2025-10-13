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
            fontFamily: 'Poppins, sans-serif',
            minHeight: '80px',
            resize: 'vertical',
            outline: 'none'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--civic-blue)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E0E0E0';
          }}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          style={{
            marginTop: '8px',
            padding: '10px 20px',
            backgroundColor: newComment.trim() ? 'var(--civic-blue)' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: newComment.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
        >
          <Send size={16} />
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div>
        <h3 style={{ 
          marginBottom: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          color: 'var(--civic-blue)',
          fontSize: '18px',
          fontWeight: '600'
        }}>
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
              marginBottom: '12px',
              border: '1px solid #E0E0E0'
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
            <p style={{ color: '#333', lineHeight: '1.5', margin: 0 }}>{comment.text}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ color: '#999', textAlign: 'center', padding: '24px', fontStyle: 'italic' }}>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
