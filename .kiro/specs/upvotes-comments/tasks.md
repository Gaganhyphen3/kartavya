# Upvotes and Comments Feature - Implementation Tasks

## Implementation Plan

- [x] 1. Create engagement utility functions


  - Create `web-kartavya/src/utils/engagement.js`
  - Implement getUpvotes() function
  - Implement toggleUpvote() function
  - Implement hasUserUpvoted() function
  - Implement getUpvoteCount() function
  - Implement getComments() function
  - Implement addComment() function
  - Implement getIssueComments() function
  - Implement getCommentCount() function
  - Implement sortByUpvotes() function
  - _Requirements: 1.5, 3.1, 3.2, 3.3_



- [ ] 2. Create UpvoteButton component
  - Create `web-kartavya/src/components/UpvoteButton.js`
  - Implement upvote button UI with ThumbsUp icon
  - Add active/inactive states
  - Add upvote count display
  - Add click handler
  - Style with civic colors


  - Add hover effects
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.3, 4.4_

- [ ] 3. Create CommentSection component
  - Create `web-kartavya/src/components/CommentSection.js`
  - Implement comment input textarea
  - Implement submit button with Send icon
  - Implement comments list display
  - Show commenter name and timestamp



  - Show comment count header
  - Add empty state message
  - Style comments with civic colors
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.2, 4.5_

- [ ] 4. Update Home page with upvotes and comments
  - Update `web-kartavya/src/pages/Home.js`
  - Import UpvoteButton component
  - Import engagement utilities
  - Add upvote button to issue cards
  - Add comment count display to issue cards
  - Implement handleUpvote function
  - Add MessageCircle icon for comments
  - Update card layout to include engagement metrics
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1_


- [-] 5. Add sorting by upvotes to Home page

  - Update `web-kartavya/src/pages/Home.js`
  - Add "Sort by Popular" button/dropdown
  - Implement sorting logic using sortByUpvotes()
  - Update UI to show current sort method
  - Maintain existing filter functionality
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 6. Create IssueDetail page
  - Create `web-kartavya/src/pages/IssueDetail.js`

  - Implement issue detail view
  - Add UpvoteButton component
  - Add CommentSection component
  - Load issue data from localStorage
  - Load comments and upvotes
  - Implement handleUpvote function


  - Implement handleAddComment function
  - Style page layout
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.2, 4.5_

- [ ] 7. Add routing for IssueDetail page
  - Update `web-kartavya/src/App.js`
  - Add route for `/issue/:id`
  - Import IssueDetail component
  - Test navigation from Home to IssueDetail
  - _Requirements: 4.2_

- [ ] 8. Make issue cards clickable
  - Update `web-kartavya/src/pages/Home.js`
  - Wrap issue cards with Link or onClick handler
  - Navigate to IssueDetail page on click
  - Add cursor pointer style
  - Add hover effect to indicate clickability
  - _Requirements: 4.2_

- [ ] 9. Update MyReports page with engagement metrics
  - Update `web-kartavya/src/pages/MyReports.js`
  - Show upvote count on user's reports
  - Show comment count on user's reports
  - Add UpvoteButton component
  - Display engagement metrics prominently
  - _Requirements: 4.1_

- [ ] 10. Test and validate
  - Test upvote toggle functionality
  - Test comment submission
  - Test data persistence (refresh page)
  - Test sorting by upvotes
  - Test navigation to issue detail
  - Verify localStorage data structure
  - Test with multiple users
  - Verify UI responsiveness
  - _Requirements: All_

