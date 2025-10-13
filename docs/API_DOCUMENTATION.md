# Kartavya API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-production-api.com/api`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", // optional
  "phone": "9876543210", // optional
  "pincode": "110001",
  "role": "citizen", // or "authority"
  "authorityRole": "Municipal Corporation" // required if role is "authority"
}
```

#### POST /auth/login
Login user.

**Request Body:**
```json
{
  "identifier": "john@example.com", // email or phone
  "pincode": "110001"
}
```

#### GET /auth/me
Get current user profile (requires authentication).

### Issues

#### POST /issues
Create a new issue (requires authentication).

**Request:** Multipart form data
- `data`: JSON string with issue details
- `images`: Array of image files (max 5)

#### GET /issues/feed
Get issues feed (requires authentication).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `status`: Filter by status
- `pincode`: Filter by pincode
- `priority`: Filter by priority

#### GET /issues/my-reports
Get user's reported issues (requires authentication).

#### POST /issues/:id/vote
Vote on an issue (requires authentication).

**Request Body:**
```json
{
  "voteType": "upvote" // or "downvote"
}
```

#### PATCH /issues/:id/status
Update issue status (authorities only).

**Request Body:**
```json
{
  "status": "Resolved" // Pending, In Progress, Resolved, Rejected
}
```

### Users

#### GET /users/profile/:id?
Get user profile (requires authentication).

#### PATCH /users/profile
Update user profile (requires authentication).

#### GET /users/stats
Get user statistics (requires authentication).

#### GET /users/community
Get community users in same pincode (requires authentication).

### Leaderboard

#### GET /leaderboard/global
Get global leaderboard (requires authentication).

#### GET /leaderboard/local
Get local leaderboard for same pincode (requires authentication).

#### GET /leaderboard/categories
Get category-wise statistics (requires authentication).

#### GET /leaderboard/contributors/:category
Get top contributors for a category (requires authentication).

#### GET /leaderboard/monthly
Get monthly statistics (requires authentication).

## Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "error": "Error message",
  "details": "Additional error details (optional)"
}
```

## Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error