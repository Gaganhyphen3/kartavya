# Design Document - Enhanced Authority Dashboard

## Overview

This design document outlines the architecture and implementation approach for a comprehensive authority dashboard system with report management, task assignment, communication, analytics, and performance tracking capabilities.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                   Authority Dashboard                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Overview   │  │  Assignment  │  │ Communication│ │
│  │   Dashboard  │  │    System    │  │   Channel    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Analytics   │  │   Emergency  │  │ Performance  │ │
│  │  & Reports   │  │    Alerts    │  │   Metrics    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                            │
├─────────────────────────────────────────────────────────┤
│  • Reports Database                                      │
│  • Field Workers Database                                │
│  • Assignments Database                                  │
│  • Communications Database                               │
│  • Analytics Cache                                       │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Enhanced AdminDashboard Component

**Location:** `web-kartavya/src/pages/AdminDashboard.js`

**Features:**
- Overview statistics cards
- Prioritized report list
- Quick action buttons
- Emergency alerts banner
- Real-time updates

**Props:** None (uses auth context)

**State:**
```javascript
{
  reports: [],
  filteredReports: [],
  stats: { total, pending, inProgress, resolved, emergency },
  selectedReport: null,
  filterOptions: { status, severity, category, dateRange },
  emergencyAlerts: []
}
```

### 2. ReportManagement Component

**Location:** `web-kartavya/src/components/authority/ReportManagement.js`

**Features:**
- Filterable report table
- Sort by priority/date/severity
- Bulk actions
- Export functionality

**Props:**
```javascript
{
  reports: Array,
  onAssign: Function,
  onStatusChange: Function,
  onFilter: Function
}
```

### 3. TaskAssignment Component

**Location:** `web-kartavya/src/components/authority/TaskAssignment.js`

**Features:**
- Field worker selection
- Assignment form
- Due date picker
- Priority setting
- Notes/instructions field

**Props:**
```javascript
{
  report: Object,
  fieldWorkers: Array,
  onAssign: Function,
  onCancel: Function
}
```

### 4. CommunicationThread Component

**Location:** `web-kartavya/src/components/authority/CommunicationThread.js`

**Features:**
- Message thread display
- Authority message composer
- Status update notifications
- File attachment support

**Props:**
```javascript
{
  reportId: String,
  messages: Array,
  onSendMessage: Function,
  currentUser: Object
}
```

### 5. AnalyticsDashboard Component

**Location:** `web-kartavya/src/components/authority/AnalyticsDashboard.js`

**Features:**
- Time-series charts
- Category breakdown
- Worker performance metrics
- Export reports

**Props:**
```javascript
{
  dateRange: Object,
  onExport: Function
}
```

### 6. EmergencyAlerts Component

**Location:** `web-kartavya/src/components/authority/EmergencyAlerts.js`

**Features:**
- Alert banner
- Emergency report list
- Quick escalation
- Notification system

**Props:**
```javascript
{
  emergencies: Array,
  onEscalate: Function,
  onResolve: Function
}
```

### 7. PerformanceMetrics Component

**Location:** `web-kartavya/src/components/authority/PerformanceMetrics.js`

**Features:**
- Worker leaderboard
- Resolution time metrics
- Satisfaction scores
- Achievement badges

**Props:**
```javascript
{
  workers: Array,
  metrics: Object,
  dateRange: Object
}
```

### 8. FieldWorkerManagement Component

**Location:** `web-kartavya/src/components/authority/FieldWorkerManagement.js`

**Features:**
- Worker list
- Add/edit worker
- View assignments
- Performance history

**Props:**
```javascript
{
  workers: Array,
  onAdd: Function,
  onEdit: Function,
  onDeactivate: Function
}
```

## Data Models

### Enhanced Authority User Model

```javascript
{
  id: String,
  name: String,
  email: String, // Gmail stored here
  password: String, // Hashed
  role: 'admin',
  authorityRole: String, // 'Municipal Corporation', 'Police', etc.
  department: String,
  contactNumber: String,
  joinDate: Date,
  permissions: Array,
  isActive: Boolean,
  lastLogin: Date
}
```

### Field Worker Model

```javascript
{
  id: String,
  name: String,
  email: String,
  contactNumber: String,
  department: String,
  specialization: Array, // ['Potholes', 'Streetlights', etc.]
  assignedBy: String, // Authority ID
  status: 'active' | 'inactive',
  currentAssignments: Array,
  completedTasks: Number,
  averageResolutionTime: Number,
  rating: Number,
  createdDate: Date
}
```

### Assignment Model

```javascript
{
  id: String,
  reportId: String,
  fieldWorkerId: String,
  fieldWorkerName: String,
  assignedBy: String, // Authority ID
  assignedByName: String,
  assignedDate: Date,
  dueDate: Date,
  priority: 'low' | 'medium' | 'high' | 'emergency',
  status: 'assigned' | 'in-progress' | 'completed' | 'cancelled',
  notes: String,
  startedDate: Date,
  completedDate: Date,
  resolutionNotes: String,
  verifiedBy: String, // Authority ID
  verifiedDate: Date
}
```

### Communication Message Model

```javascript
{
  id: String,
  reportId: String,
  senderId: String,
  senderName: String,
  senderRole: 'citizen' | 'authority' | 'field-worker',
  message: String,
  attachments: Array,
  timestamp: Date,
  isStatusUpdate: Boolean,
  statusChange: Object // { from, to }
}
```

### Analytics Model

```javascript
{
  period: String, // 'daily', 'weekly', 'monthly'
  date: Date,
  totalReports: Number,
  resolvedReports: Number,
  averageResolutionTime: Number, // in hours
  categoryBreakdown: Object,
  severityBreakdown: Object,
  workerPerformance: Array,
  citizenSatisfaction: Number,
  emergencyCount: Number
}
```

## Utility Modules

### 1. Assignment Manager

**Location:** `web-kartavya/src/utils/assignmentManager.js`

**Functions:**
```javascript
- assignTask(reportId, workerId, authorityId, options)
- updateAssignmentStatus(assignmentId, status, notes)
- getWorkerAssignments(workerId)
- getReportAssignment(reportId)
- cancelAssignment(assignmentId, reason)
- verifyCompletion(assignmentId, authorityId)
```

### 2. Communication Manager

**Location:** `web-kartavya/src/utils/communicationManager.js`

**Functions:**
```javascript
- sendMessage(reportId, senderId, message, attachments)
- getMessageThread(reportId)
- markAsRead(messageId, userId)
- addStatusUpdate(reportId, oldStatus, newStatus, userId)
- requestClarification(reportId, authorityId, question)
```

### 3. Analytics Engine

**Location:** `web-kartavya/src/utils/analyticsEngine.js`

**Functions:**
```javascript
- calculateMetrics(dateRange)
- getWorkerPerformance(workerId, dateRange)
- getCategoryTrends(dateRange)
- generateReport(type, dateRange, format)
- exportToCSV(data)
- exportToPDF(data)
```

### 4. Emergency Alert System

**Location:** `web-kartavya/src/utils/emergencyAlerts.js`

**Functions:**
```javascript
- detectEmergency(report)
- flagAsEmergency(reportId, reason)
- escalateIssue(reportId, escalationLevel, reason)
- getActiveEmergencies()
- resolveEmergency(reportId, resolution)
- sendAlertNotification(reportId, authorities)
```

### 5. Performance Tracker

**Location:** `web-kartavya/src/utils/performanceTracker.js`

**Functions:**
```javascript
- trackResolutionTime(assignmentId)
- calculateWorkerRating(workerId)
- updatePerformanceMetrics(workerId)
- getLeaderboard(dateRange)
- awardBadge(workerId, badgeType)
- calculateSatisfactionScore(reportId)
```

### 6. Enhanced Auth Module

**Location:** `web-kartavya/src/utils/auth.js` (Update existing)

**New Functions:**
```javascript
- registerAuthority(name, email, password, authorityRole, department)
- loginAuthority(email, password)
- updateAuthorityProfile(userId, updates)
- getAuthorityByEmail(email)
- storeGmail(userId, gmail)
- getStoredGmail(userId)
```

## Database Schema Updates

### LocalStorage Structure

```javascript
// Existing
localStorage.setItem('reports', JSON.stringify(reports));
localStorage.setItem('users', JSON.stringify(users));

// New additions
localStorage.setItem('fieldWorkers', JSON.stringify(fieldWorkers));
localStorage.setItem('assignments', JSON.stringify(assignments));
localStorage.setItem('communications', JSON.stringify(communications));
localStorage.setItem('analytics', JSON.stringify(analytics));
localStorage.setItem('emergencyAlerts', JSON.stringify(emergencyAlerts));
localStorage.setItem('performanceMetrics', JSON.stringify(performanceMetrics));
```

## Error Handling

### Assignment Errors
- Worker not available
- Report already assigned
- Invalid worker ID
- Permission denied

### Communication Errors
- Message send failure
- Attachment too large
- Invalid report ID
- User not authorized

### Analytics Errors
- Insufficient data
- Export failure
- Invalid date range
- Calculation error

## Testing Strategy

### Unit Tests
- Assignment manager functions
- Communication manager functions
- Analytics calculations
- Performance metrics
- Emergency detection logic

### Integration Tests
- Complete assignment workflow
- Communication thread flow
- Analytics generation
- Emergency escalation
- Performance tracking

### E2E Tests
- Authority login with Gmail
- Assign task to field worker
- Send message to citizen
- Generate analytics report
- Flag emergency and escalate

## Security Considerations

1. **Authentication**
   - Secure password hashing
   - Gmail validation
   - Session management
   - Role-based access control

2. **Authorization**
   - Authority-only access to dashboard
   - Field worker permissions
   - Data access restrictions
   - Action logging

3. **Data Protection**
   - Encrypt sensitive data
   - Secure communication channels
   - Audit trail for all actions
   - Privacy compliance

## Performance Optimization

1. **Caching**
   - Cache analytics data
   - Cache worker performance metrics
   - Cache frequently accessed reports

2. **Lazy Loading**
   - Load reports on demand
   - Paginate large lists
   - Defer analytics calculations

3. **Real-time Updates**
   - Use efficient polling
   - Batch notifications
   - Optimize re-renders

## UI/UX Design

### Color Scheme
- Emergency: #D32F2F (Red)
- High Priority: #FF9933 (Orange)
- Success: #138808 (Green)
- Info: #1976D2 (Blue)
- Warning: #FFB300 (Amber)

### Layout
- Sidebar navigation
- Top stats bar
- Main content area
- Right panel for details
- Bottom action bar

### Responsive Design
- Desktop: Full dashboard
- Tablet: Collapsed sidebar
- Mobile: Bottom navigation

---

**Design Status:** Complete
**Next Step:** Create implementation tasks
