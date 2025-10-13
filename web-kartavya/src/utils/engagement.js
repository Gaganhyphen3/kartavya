// Engagement utility functions for upvotes and comments

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
