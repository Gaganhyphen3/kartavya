# Upvotes and Comments Feature - Requirements

## Introduction

This feature adds social engagement capabilities to issue reports by allowing users to upvote issues and add comments. This helps prioritize issues based on community interest and enables discussion around reported problems.

## Requirements

### Requirement 1: Upvote System

**User Story:** As a user, I want to upvote issues that I also experience so that authorities can see which problems affect the most people.

#### Acceptance Criteria

1. WHEN viewing an issue THEN the system SHALL display the current upvote count
2. WHEN a user clicks the upvote button THEN the system SHALL increment the upvote count by 1
3. WHEN a user clicks upvote again THEN the system SHALL remove their upvote (toggle)
4. WHEN viewing an issue THEN the system SHALL indicate if the current user has upvoted it
5. WHEN an issue is upvoted THEN the system SHALL store the user ID and timestamp

### Requirement 2: Comment System

**User Story:** As a user, I want to comment on issues so that I can provide additional information or discuss solutions with the community.

#### Acceptance Criteria

1. WHEN viewing an issue THEN the system SHALL display all comments in chronological order
2. WHEN a user submits a comment THEN the system SHALL save it with user info and timestamp
3. WHEN viewing comments THEN the system SHALL show the commenter's name and time posted
4. WHEN a user posts a comment THEN it SHALL appear immediately in the comment list
5. WHEN viewing an issue THEN the system SHALL display the total comment count

### Requirement 3: Data Storage

**User Story:** As a developer, I want upvotes and comments stored persistently so that data is not lost on page refresh.

#### Acceptance Criteria

1. WHEN a user upvotes THEN the system SHALL store it in localStorage
2. WHEN a user comments THEN the system SHALL store it in localStorage
3. WHEN the page reloads THEN the system SHALL restore all upvotes and comments
4. WHEN viewing issues THEN upvote counts SHALL be accurate
5. WHEN viewing issues THEN comment counts SHALL be accurate

### Requirement 4: UI Display

**User Story:** As a user, I want to easily see and interact with upvotes and comments so that I can engage with the community.

#### Acceptance Criteria

1. WHEN viewing an issue card THEN the system SHALL display upvote and comment counts
2. WHEN viewing an issue detail THEN the system SHALL show the full comment thread
3. WHEN hovering over upvote button THEN the system SHALL provide visual feedback
4. WHEN a user has upvoted THEN the button SHALL be visually distinct
5. WHEN viewing comments THEN each SHALL show user avatar/name and timestamp

### Requirement 5: Sorting and Filtering

**User Story:** As a user, I want to see the most popular issues first so that I can focus on problems that affect many people.

#### Acceptance Criteria

1. WHEN viewing the home feed THEN the system SHALL allow sorting by upvotes
2. WHEN sorting by popular THEN issues with more upvotes SHALL appear first
3. WHEN viewing issues THEN the system SHALL show "Most Popular" filter option
4. WHEN filtering by popular THEN only highly upvoted issues SHALL display
5. WHEN viewing an issue THEN comments SHALL be sorted by time (newest/oldest)

### Requirement 6: Notifications

**User Story:** As an issue reporter, I want to know when someone comments on my issue so that I can respond to questions or feedback.

#### Acceptance Criteria

1. WHEN someone comments on a user's issue THEN the system SHALL show a notification indicator
2. WHEN viewing notifications THEN the system SHALL list new comments
3. WHEN a user clicks a notification THEN the system SHALL navigate to that issue
4. WHEN viewing notifications THEN unread ones SHALL be visually distinct
5. WHEN a user views a comment THEN the notification SHALL be marked as read

---

## Data Models

### Upvote Structure
```javascript
{
  issueId: string,
  userId: string,
  timestamp: Date
}
```

### Comment Structure
```javascript
{
  id: string,
  issueId: string,
  userId: string,
  userName: string,
  text: string,
  timestamp: Date
}
```

### Issue Updates
```javascript
{
  // Existing fields...
  upvotes: number,
  upvotedBy: [userId],
  comments: [Comment],
  commentCount: number
}
```

## Non-Functional Requirements

### Performance
- Upvote toggle should respond within 100ms
- Comments should load within 500ms
- Sorting by upvotes should be instant

### Usability
- Upvote button should be easily accessible
- Comment input should be intuitive
- Visual feedback for all interactions

### Scalability
- Support up to 1000 upvotes per issue
- Support up to 500 comments per issue
- Efficient storage and retrieval
