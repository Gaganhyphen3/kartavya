# Kartavya Project - Technical Interview Questions

## 📋 Table of Contents
1. [Frontend Questions](#frontend-questions)
2. [Backend Questions](#backend-questions)
3. [Database Questions](#database-questions)
4. [Architecture & Design Questions](#architecture--design-questions)
5. [API & Integration Questions](#api--integration-questions)
6. [Security Questions](#security-questions)
7. [Performance & Optimization Questions](#performance--optimization-questions)
8. [Testing & Debugging Questions](#testing--debugging-questions)

---

## 🎨 Frontend Questions

### React & Component Architecture

**Q1:** Explain the component structure of the Kartavya application. How are pages organized?
**Answer:** The app uses a page-based architecture with:
- Pages: Home, Report, Profile, Leaderboard, MyReports, AdminDashboard, Login, Register
- Components: Layout, UpvoteButton, CommentSection, InfrastructureAlert
- Utilities: auth.js, reports.js, geolocation.js, engagement.js
- Routing handled by React Router with protected routes

**Q2:** How does the dual login system work (Citizen vs Authority)?
**Answer:** 
- Login page has role selector (user/admin)
- Different authentication flows based on role
- Authority users require authorityRole selection
- Session stored in localStorage with role information
- Conditional rendering based on user.role

**Q3:** Explain the state management approach used in Kartavya.
**Answer:**
- Uses React useState and useEffect hooks
- No global state management (Redux/Context API not used)
- LocalStorage for persistence
- Component-level state for UI interactions
- Auth state managed through localStorage

**Q4:** How is the priority ranking system implemented in the Home feed?
**Answer:**
- `sortReportsByPriority()` function calculates priority scores
- Score = (upvotes × 5) + (comments × 3) + recency bonus + severity bonus + infrastructure bonus
- Reports near critical infrastructure get +60 to +100 bonus points
- Sorted array displayed in Home component
- Real-time updates on user interactions

**Q5:** Describe the geolocation implementation. How does it work?
**Answer:**
- Uses browser's `navigator.geolocation` API
- `getCurrentPosition()` gets user coordinates
- Reverse geocoding via OpenStreetMap Nominatim API
- Converts lat/long to human-readable address
- Stores geoTag object with report: {latitude, longitude, address, googleMapsLink}

**Q6:** How does the Infrastructure Alert component detect nearby facilities?
**Answer:**
- Queries Overpass API (OpenStreetMap) with report coordinates
- Searches within 5km radius for hospitals, schools, police stations
- Uses Haversine formula to calculate distances
- Displays expandable alert with facility list
- Provides Google Maps directions for each facility

**Q7:** Explain the upvote and comment system implementation.
**Answer:**
- Stored in localStorage under 'upvotes' and 'comments' keys
- Upvotes: {issueId, userId} pairs to prevent duplicate votes
- Comments: {id, issueId, userId, userName, text, timestamp}
- Real-time count updates using state refresh
- Optimistic UI updates

**Q8:** How is the leaderboard calculated and displayed?
**Answer:**
- Aggregates data from all reports by userId
- Calculates: reports × 20 + upvotes × 5 + resolved × 50
- Sorts users by total points
- Displays top contributors with badges
- Badge system based on point thresholds

**Q9:** Describe the image upload and AI analysis feature.
**Answer:**
- FileReader API converts image to base64
- Simulated AI analysis (mock implementation)
- Detects issue type, severity, and confidence score
- Stores analysis with report
- Displays AI insights on report cards

**Q10:** How does the responsive design work across devices?
**Answer:**
- CSS Grid and Flexbox for layouts
- Media queries for breakpoints (@media max-width: 768px)
- Mobile-first approach
- Responsive navigation (sidebar → bottom nav)
- Touch-friendly button sizes

---

## ⚙️ Backend Questions

### Node.js & Express

**Q11:** What is the backend architecture of Kartavya?
**Answer:**
- Node.js with Express.js framework
- RESTful API design
- Route-based organization: /auth, /issues, /users, /leaderboard
- Middleware for CORS, body parsing, error handling
- MongoDB models for data structure

**Q12:** Explain the authentication flow in the backend.
**Answer:**
- POST /auth/register - Creates new user
- POST /auth/login - Validates credentials, returns user object
- No JWT tokens (simplified for demo)
- Password stored as plain text (should be hashed in production)
- Session management on frontend via localStorage

**Q13:** How are API routes organized?
**Answer:**
```
backend/
├── routes/
│   ├── auth.js      - Registration, login
│   ├── issues.js    - CRUD for reports
│   ├── users.js     - User management
│   └── leaderboard.js - Leaderboard data
├── models/
│   ├── User.js      - User schema
│   └── Issue.js     - Report schema
└── server.js        - Main entry point
```

**Q14:** What middleware is used and why?
**Answer:**
- `cors()` - Enable cross-origin requests from frontend
- `express.json()` - Parse JSON request bodies
- `express.urlencoded()` - Parse URL-encoded data
- Custom error handler - Catch and format errors
- Logger middleware - Request logging

**Q15:** How would you implement file upload on the backend?
**Answer:**
- Use `multer` middleware for multipart/form-data
- Configure storage (disk or memory)
- Set file size limits
- Validate file types (images only)
- Store file path in database
- Serve static files via Express

---

## 💾 Database Questions

### LocalStorage & Data Management

**Q16:** Why is localStorage used instead of a real database?
**Answer:**
- Simplified demo/prototype
- No backend setup required
- Client-side persistence
- Easy testing and development
- Suitable for small-scale applications
- Production would use MongoDB/PostgreSQL

**Q17:** What is the data structure for users in localStorage?
**Answer:**
```javascript
{
  id: Number,
  name: String,
  email: String,
  password: String,
  role: 'user' | 'admin',
  authorityRole: String (for admin),
  department: String,
  contactNumber: String,
  location: String,
  area: String,
  pincode: String,
  permissions: Array,
  isActive: Boolean,
  joinDate: Date,
  lastLogin: Date,
  stats: {
    totalReports: Number,
    resolvedIssues: Number,
    assignedTasks: Number,
    points: Number
  }
}
```

**Q18:** How are reports stored and retrieved?
**Answer:**
- Stored as JSON array in localStorage under 'reports' key
- Each report has unique ID (timestamp-based)
- Retrieved with `JSON.parse(localStorage.getItem('reports'))`
- Filtered and sorted on client-side
- No indexing or query optimization

**Q19:** What are the limitations of using localStorage?
**Answer:**
- 5-10MB storage limit
- Synchronous API (blocks main thread)
- No encryption (data visible in DevTools)
- No concurrent access control
- No relationships or joins
- No backup or recovery
- Cleared when cache is cleared

**Q20:** How would you migrate from localStorage to MongoDB?
**Answer:**
1. Define Mongoose schemas for User, Report, Comment, Upvote
2. Create API endpoints for CRUD operations
3. Update frontend to use fetch/axios instead of localStorage
4. Implement authentication with JWT
5. Add database indexing for performance
6. Set up data validation and sanitization
7. Implement backup and recovery

---

## 🏗️ Architecture & Design Questions

**Q21:** Explain the overall system architecture of Kartavya.
**Answer:**
```
┌─────────────────────────────────────┐
│         Frontend (React)            │
│  - Pages, Components, Utils         │
│  - State Management (useState)      │
│  - Routing (React Router)           │
└──────────────┬──────────────────────┘
               │
               │ API Calls / LocalStorage
               │
┌──────────────┴──────────────────────┐
│      Backend (Node.js/Express)      │
│  - REST API Routes                  │
│  - Business Logic                   │
│  - Data Validation                  │
└──────────────┬──────────────────────┘
               │
               │ Database Operations
               │
┌──────────────┴──────────────────────┐
│    Database (LocalStorage/MongoDB)  │
│  - Users, Reports, Comments         │
│  - Upvotes, Assignments             │
└─────────────────────────────────────┘
```

**Q22:** What design patterns are used in the project?
**Answer:**
- **Component Pattern** - Reusable UI components
- **Container/Presentational** - Pages vs Components
- **Utility Pattern** - Helper functions in utils/
- **Module Pattern** - Separate concerns (auth, reports, etc.)
- **Observer Pattern** - State updates trigger re-renders
- **Factory Pattern** - Creating report/user objects

**Q23:** How is separation of concerns achieved?
**Answer:**
- **Pages** - Route-level components
- **Components** - Reusable UI elements
- **Utils** - Business logic and data operations
- **Styles** - CSS separated from logic
- **Routes** - Backend API organization
- **Models** - Data structure definitions

**Q24:** Explain the priority ranking algorithm design.
**Answer:**
```javascript
Priority Score = 
  (Upvotes × 5) +
  (Comments × 3) +
  Recency Bonus (0-20) +
  Severity Bonus (5-30) +
  Infrastructure Bonus (60-100) +
  Status Penalty (×0.1 to ×1.0)

Sorting: Descending by priority score
```

**Q25:** How would you scale this application for 1 million users?
**Answer:**
1. **Database**: Migrate to MongoDB/PostgreSQL with sharding
2. **Caching**: Redis for frequently accessed data
3. **CDN**: Serve static assets via CDN
4. **Load Balancing**: Multiple server instances
5. **Microservices**: Split into auth, reports, notifications services
6. **Message Queue**: RabbitMQ/Kafka for async operations
7. **Search**: Elasticsearch for report search
8. **Monitoring**: APM tools for performance tracking

---

## 🔌 API & Integration Questions

**Q26:** What external APIs are integrated in Kartavya?
**Answer:**
1. **OpenStreetMap Nominatim** - Reverse geocoding
2. **Overpass API** - Finding nearby infrastructure
3. **Google Maps** - Directions and map display
4. **Browser Geolocation API** - Getting user location

**Q27:** How does the Overpass API integration work?
**Answer:**
- POST request to `https://overpass-api.de/api/interpreter`
- Query language: Overpass QL
- Searches for amenities (hospital, school, etc.) within radius
- Returns OSM nodes/ways with coordinates
- Processes response to extract facility details
- Caches results for 24 hours

**Q28:** Explain the reverse geocoding implementation.
**Answer:**
```javascript
// 1. Get coordinates from browser
navigator.geolocation.getCurrentPosition()

// 2. Call Nominatim API
fetch(`https://nominatim.openstreetmap.org/reverse?
  format=json&lat=${lat}&lon=${lon}`)

// 3. Parse response
{
  address: {
    road, suburb, city, state, postcode
  }
}

// 4. Format and store
formatted = `${road}, ${city}, ${state} ${postcode}`
```

**Q29:** How would you implement real-time notifications?
**Answer:**
- **WebSockets** (Socket.io) for bidirectional communication
- **Server-Sent Events** (SSE) for server-to-client updates
- **Push Notifications** (Service Workers) for mobile
- **Polling** (fallback) - Check for updates every N seconds
- **Firebase Cloud Messaging** for cross-platform notifications

**Q30:** What API security measures should be implemented?
**Answer:**
- **Authentication**: JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize all inputs
- **HTTPS**: Encrypt data in transit
- **CORS**: Restrict allowed origins
- **API Keys**: For external service access
- **SQL Injection Prevention**: Parameterized queries

---

## 🔒 Security Questions

**Q31:** What security vulnerabilities exist in the current implementation?
**Answer:**
1. **Plain text passwords** - Should be hashed (bcrypt)
2. **No authentication tokens** - Should use JWT
3. **LocalStorage for sensitive data** - Vulnerable to XSS
4. **No input sanitization** - Risk of XSS attacks
5. **No CSRF protection** - Vulnerable to cross-site requests
6. **No rate limiting** - API abuse possible
7. **Client-side validation only** - Can be bypassed

**Q32:** How would you implement secure password storage?
**Answer:**
```javascript
// Registration
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Login
const match = await bcrypt.compare(password, hashedPassword);
if (match) {
  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}
```

**Q33:** Explain JWT authentication flow.
**Answer:**
1. User logs in with credentials
2. Server validates and generates JWT
3. Token sent to client
4. Client stores token (httpOnly cookie preferred)
5. Client sends token in Authorization header
6. Server verifies token on each request
7. Token expires after set time
8. Refresh token for extended sessions

**Q34:** How would you prevent XSS attacks?
**Answer:**
- **Sanitize inputs**: Use DOMPurify library
- **Escape outputs**: React does this automatically
- **Content Security Policy**: Set CSP headers
- **HttpOnly cookies**: For sensitive data
- **Validate data types**: Ensure expected formats
- **Avoid dangerouslySetInnerHTML**: Unless necessary

**Q35:** What is CORS and how is it configured?
**Answer:**
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://kartavya.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

---

## ⚡ Performance & Optimization Questions

**Q36:** How would you optimize the Home feed for 10,000 reports?
**Answer:**
1. **Pagination**: Load 20 reports at a time
2. **Virtual Scrolling**: Render only visible items
3. **Lazy Loading**: Load images on demand
4. **Memoization**: Cache calculated priority scores
5. **Debouncing**: Delay search/filter operations
6. **Web Workers**: Calculate scores in background thread
7. **IndexedDB**: Store large datasets client-side

**Q37:** Explain lazy loading implementation for images.
**Answer:**
```javascript
// Using Intersection Observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      imageObserver.unobserve(img);
    }
  });
});

// Observe all images
document.querySelectorAll('img[data-src]')
  .forEach(img => imageObserver.observe(img));
```

**Q38:** How would you implement caching strategies?
**Answer:**
- **Browser Cache**: Set Cache-Control headers
- **Service Workers**: Cache static assets offline
- **LocalStorage**: Cache API responses (with TTL)
- **Redis**: Server-side caching for frequent queries
- **CDN**: Cache static files globally
- **Memoization**: Cache function results

**Q39:** What metrics would you track for performance?
**Answer:**
- **Load Time**: Time to First Byte (TTFB)
- **First Contentful Paint** (FCP)
- **Largest Contentful Paint** (LCP)
- **Time to Interactive** (TTI)
- **Cumulative Layout Shift** (CLS)
- **API Response Time**
- **Database Query Time**
- **Memory Usage**

**Q40:** How would you optimize the priority ranking calculation?
**Answer:**
```javascript
// 1. Pre-calculate scores on report creation
report.priorityScore = calculateScore(report);

// 2. Use memoization
const memoizedScores = new Map();
function getScore(reportId) {
  if (!memoizedScores.has(reportId)) {
    memoizedScores.set(reportId, calculateScore(report));
  }
  return memoizedScores.get(reportId);
}

// 3. Batch updates
const scores = reports.map(r => calculateScore(r));

// 4. Use Web Workers for heavy calculations
const worker = new Worker('scoreCalculator.js');
worker.postMessage(reports);
```

---

## 🧪 Testing & Debugging Questions

**Q41:** What testing strategies would you implement?
**Answer:**
1. **Unit Tests**: Jest for utility functions
2. **Component Tests**: React Testing Library
3. **Integration Tests**: Test API endpoints
4. **E2E Tests**: Cypress for user flows
5. **Performance Tests**: Lighthouse CI
6. **Security Tests**: OWASP ZAP
7. **Accessibility Tests**: axe-core

**Q42:** How would you debug the priority ranking not working?
**Answer:**
```javascript
// 1. Add console logs
console.log('Reports before sorting:', reports);
console.log('Priority scores:', reports.map(r => ({
  id: r.id,
  score: r.priorityScore
})));

// 2. Check localStorage data
console.log('Upvotes:', localStorage.getItem('upvotes'));
console.log('Comments:', localStorage.getItem('comments'));

// 3. Verify calculation
const testScore = calculatePriorityScore(reports[0], 5, 3);
console.log('Test score:', testScore);

// 4. Check sorting
const sorted = [...reports].sort((a, b) => 
  b.priorityScore - a.priorityScore
);
console.log('Sorted:', sorted);
```

**Q43:** What tools would you use for debugging?
**Answer:**
- **Chrome DevTools**: Console, Network, Performance
- **React DevTools**: Component inspection
- **Redux DevTools**: State management (if used)
- **Postman**: API testing
- **Lighthouse**: Performance auditing
- **Sentry**: Error tracking
- **LogRocket**: Session replay

**Q44:** How would you test the geolocation feature?
**Answer:**
```javascript
// Mock geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn()
    .mockImplementation((success) => 
      Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      }))
    )
};

// Test
test('gets user location', async () => {
  const location = await getCurrentPosition();
  expect(location.latitude).toBe(51.1);
  expect(location.longitude).toBe(45.3);
});
```

**Q45:** What would you include in a test suite for the auth system?
**Answer:**
```javascript
describe('Authentication', () => {
  test('registers new user successfully', () => {
    const user = registerUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(user.id).toBeDefined();
    expect(user.role).toBe('user');
  });

  test('prevents duplicate email registration', () => {
    expect(() => {
      registerUser({ email: 'existing@example.com' });
    }).toThrow('Email already registered');
  });

  test('logs in with correct credentials', () => {
    const user = loginUser('test@example.com', 'password123', 'user');
    expect(user).toBeDefined();
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('rejects invalid credentials', () => {
    expect(() => {
      loginUser('test@example.com', 'wrong', 'user');
    }).toThrow('Invalid credentials');
  });
});
```

---

## 🎯 Scenario-Based Questions

**Q46:** A user reports that their upvote isn't being saved. How do you debug?
**Answer:**
1. Check if user is logged in (getCurrentUser())
2. Verify upvote function is called (console.log)
3. Check localStorage for upvotes array
4. Verify userId matches
5. Check for duplicate prevention logic
6. Test state refresh mechanism
7. Check browser console for errors

**Q47:** The app is slow when loading 1000 reports. What do you do?
**Answer:**
1. Implement pagination (20 per page)
2. Add virtual scrolling
3. Lazy load images
4. Memoize priority calculations
5. Use React.memo for components
6. Debounce search/filter
7. Profile with Chrome DevTools
8. Consider server-side rendering

**Q48:** How would you implement offline functionality?
**Answer:**
1. Service Worker for caching
2. IndexedDB for large data storage
3. Sync API for background sync
4. Queue failed requests
5. Show offline indicator
6. Cache critical assets
7. Implement conflict resolution

**Q49:** A user wants to export their reports to PDF. How?
**Answer:**
```javascript
// Using jsPDF library
import jsPDF from 'jspdf';

function exportToPDF(reports) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('My Reports', 20, 20);
  
  let y = 40;
  reports.forEach((report, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${report.title}`, 20, y);
    doc.setFontSize(10);
    doc.text(report.description, 20, y + 7);
    y += 20;
  });
  
  doc.save('my-reports.pdf');
}
```

**Q50:** How would you implement multi-language support?
**Answer:**
1. Use i18n library (react-i18next)
2. Create translation files (en.json, hi.json)
3. Wrap text in translation function
4. Store language preference
5. Dynamic language switching
6. RTL support for certain languages
7. Date/number formatting per locale

---

## 📊 Summary

**Total Questions:** 50
- Frontend: 10 questions
- Backend: 5 questions
- Database: 5 questions
- Architecture: 5 questions
- API & Integration: 5 questions
- Security: 5 questions
- Performance: 5 questions
- Testing: 5 questions
- Scenarios: 5 questions

**Difficulty Levels:**
- Beginner: Q1-Q10, Q16-Q20
- Intermediate: Q11-Q15, Q21-Q30, Q41-Q45
- Advanced: Q31-Q40, Q46-Q50

---

**Note:** These questions are based on the actual Kartavya project implementation and cover real technical decisions, challenges, and solutions encountered during development.
