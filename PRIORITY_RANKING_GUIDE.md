# 🏥 Priority Ranking System - Critical Infrastructure Detection

## Overview

The Kartavya app now features an intelligent priority ranking system that automatically detects and prioritizes reports near critical infrastructure like hospitals, schools, and emergency services.

## How It Works

### 1. Critical Infrastructure Detection

The system automatically detects if a report is near:

- **🏥 Health Centers** (Weight: 10)
  - Hospitals, clinics, medical centers, health centers, dispensaries, emergency rooms

- **🏫 Education Centers** (Weight: 8)
  - Schools, colleges, universities, institutes, academies

- **🚨 Emergency Services** (Weight: 9)
  - Police stations, fire stations, ambulance services

- **🚌 Transport Hubs** (Weight: 6)
  - Bus stops, railway stations, metro stations

### 2. Priority Radius

Reports within **5 kilometers** of critical infrastructure are automatically prioritized.

### 3. Priority Score Calculation

Each report gets a priority score based on:

```javascript
Priority Score = 
  (Upvotes × 5) +
  (Comments × 3) +
  Recency Bonus (0-20 points) +
  Severity Bonus (5-30 points) +
  Infrastructure Bonus (60-100 points)
```

#### Scoring Breakdown:

**Engagement:**
- Each upvote: +5 points
- Each comment: +3 points

**Recency:**
- < 24 hours old: +20 points
- 24-72 hours old: +10 points
- > 72 hours old: 0 points

**Severity:**
- High: +30 points
- Medium: +15 points
- Low: +5 points

**Critical Infrastructure:**
- Near Hospital: +100 points (10 × 10)
- Near Emergency: +90 points (9 × 10)
- Near School: +80 points (8 × 10)
- Near Transport: +60 points (6 × 10)

**Status Penalty:**
- Resolved: Score × 0.3
- Rejected: Score × 0.1

### 4. Keyword Detection

The system scans the location field for keywords:

**Health Keywords:**
- hospital, clinic, medical, health center, dispensary, emergency

**Education Keywords:**
- school, college, university, education, institute, academy

**Emergency Keywords:**
- police, fire station, ambulance

**Transport Keywords:**
- bus stop, railway, metro, station

## Visual Indicators

### Priority Badges

Reports near critical infrastructure display colored badges with **specific infrastructure names**:

- 🏥 **Near City Hospital** - Red (#D32F2F) - Shows actual hospital name
- 🏫 **Near ABC School** - Orange (#FF9933) - Shows actual school name
- 🚨 **Near Central Police Station** - Red (#D32F2F) - Shows actual station name
- 🚌 **Near Metro Station** - Blue (#1976D2) - Shows actual station name

The system intelligently extracts the infrastructure name from the location string!

### Feed Sorting

The home feed automatically sorts reports by priority score, ensuring critical infrastructure issues appear at the top.

## Example Scenarios

### Scenario 1: Pothole Near Hospital
```
Location: "Main Road near City Hospital"
Badge Display: 🏥 "Near City Hospital"
Upvotes: 5
Comments: 2
Severity: High
Age: 12 hours

Score Calculation:
- Upvotes: 5 × 5 = 25
- Comments: 2 × 3 = 6
- Recency: 20 (< 24 hours)
- Severity: 30 (High)
- Infrastructure: 100 (Hospital)
Total: 181 points ⭐ HIGH PRIORITY
```

### Scenario 2: Streetlight Near School
```
Location: "Park Street near ABC School"
Badge Display: 🏫 "Near ABC School"
Upvotes: 3
Comments: 1
Severity: Medium
Age: 36 hours

Score Calculation:
- Upvotes: 3 × 5 = 15
- Comments: 1 × 3 = 3
- Recency: 10 (24-72 hours)
- Severity: 15 (Medium)
- Infrastructure: 80 (School)
Total: 123 points ⭐ MEDIUM PRIORITY
```

### Scenario 3: Regular Issue
```
Location: "Residential Area, Block A"
Upvotes: 8
Comments: 4
Severity: Low
Age: 6 hours

Score Calculation:
- Upvotes: 8 × 5 = 40
- Comments: 4 × 3 = 12
- Recency: 20 (< 24 hours)
- Severity: 5 (Low)
- Infrastructure: 0 (No critical infrastructure)
Total: 77 points ⭐ NORMAL PRIORITY
```

## Technical Implementation

### Files Created/Modified:

1. **`web-kartavya/src/utils/priorityRanking.js`** (NEW)
   - Core priority ranking logic
   - Infrastructure detection
   - Score calculation
   - Badge generation

2. **`web-kartavya/src/pages/Home.js`** (MODIFIED)
   - Integrated priority sorting
   - Added priority badge display
   - Automatic feed ranking

### Key Functions:

```javascript
// Detect critical infrastructure
detectCriticalInfrastructure(location, geoTag)

// Calculate priority score
calculatePriorityScore(report, upvotes, comments)

// Sort reports by priority
sortReportsByPriority(reports, getUpvoteCount, getCommentCount)

// Get display badge
getPriorityBadge(report)
```

## Benefits

1. **Public Safety** - Critical infrastructure issues get immediate attention
2. **Smart Sorting** - Most important issues appear first
3. **Automatic Detection** - No manual tagging required
4. **Visual Clarity** - Clear badges show priority status
5. **Fair Ranking** - Combines multiple factors for balanced prioritization

## Future Enhancements

Potential improvements:

1. **Real-time Distance Calculation** - Use actual GPS coordinates to calculate distance
2. **Custom Infrastructure Database** - Maintain a database of known critical locations
3. **User Location Proximity** - Prioritize issues near the user's current location
4. **Time-based Urgency** - Increase priority for older unresolved critical issues
5. **Authority Notifications** - Auto-notify relevant authorities for high-priority issues

## Testing

To test the priority ranking:

1. Create a report with location containing "hospital" or "school"
2. Check the home feed - it should appear at the top
3. Look for the colored priority badge on the report card
4. Compare with regular reports - critical infrastructure reports rank higher

## Configuration

To adjust priority settings, edit `priorityRanking.js`:

```javascript
// Change priority radius (default: 5km)
const PRIORITY_RADIUS_KM = 5;

// Adjust infrastructure weights
const INFRASTRUCTURE_TYPES = {
  hospital: { weight: 10, keywords: [...] },
  school: { weight: 8, keywords: [...] },
  // ...
};
```

---

**Status:** ✅ Fully Implemented
**Version:** 1.0
**Last Updated:** January 2025


## Real Examples with Actual Names

The system now extracts and displays the **actual infrastructure names** from location text:

### Example 1: Hospital
**Location:** "Main Road near City Hospital, Sector 5"
**Badge:** 🏥 **"Near City Hospital"**
- Extracts "City Hospital" from the location
- Red badge with high priority
- +100 infrastructure bonus

### Example 2: School
**Location:** "Park Street near St. Mary's School"
**Badge:** 🏫 **"Near St. Mary's School"**
- Extracts "St. Mary's School" from the location
- Orange badge with high priority
- +80 infrastructure bonus

### Example 3: College
**Location:** "MG Road near ABC Engineering College"
**Badge:** 🏫 **"Near ABC Engineering College"**
- Extracts "ABC Engineering College" from the location
- Orange badge with high priority
- +80 infrastructure bonus

### Example 4: Police Station
**Location:** "Near Central Police Station, Block A"
**Badge:** 🚨 **"Near Central Police Station"**
- Extracts "Central Police Station" from the location
- Red badge with very high priority
- +90 infrastructure bonus

### Example 5: Metro Station
**Location:** "Broken tiles near Rajiv Chowk Metro Station"
**Badge:** 🚌 **"Near Rajiv Chowk Metro Station"**
- Extracts "Rajiv Chowk Metro Station" from the location
- Blue badge with medium priority
- +60 infrastructure bonus

## How Name Extraction Works

The system:
1. Scans the location for infrastructure keywords (hospital, school, etc.)
2. Extracts 2-3 words before and after the keyword
3. Cleans up common words like "near", "at", "in"
4. Displays the extracted name in the badge

**Fallback:** If no specific name is found, it shows generic text like "Near Health Center"

---

**The home feed now shows exactly which hospital, school, or facility is affected!** 🎯
