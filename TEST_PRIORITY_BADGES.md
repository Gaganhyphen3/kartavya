# Testing Priority Badges - Quick Guide

## Why Badges Might Not Show

The priority badge system detects infrastructure keywords in the **location field** of reports. If your existing reports don't have these keywords, badges won't appear.

## Keywords That Trigger Badges

### 🏥 Health Centers (Red Badge)
- hospital
- clinic
- medical
- health center
- dispensary
- emergency

### 🏫 Education Centers (Orange Badge)
- school
- college
- university
- education
- institute
- academy

### 🚨 Emergency Services (Red Badge)
- police
- fire station
- ambulance

### 🚌 Transport Hubs (Blue Badge)
- bus stop
- railway
- metro
- station

## How to Test

### Option 1: Create a New Report

1. Go to "Report an Issue" page
2. Fill in the form with a location containing keywords:

**Example Locations:**
- "Main Road near City Hospital"
- "Park Street near ABC School"
- "MG Road near St. Mary's College"
- "Near Central Police Station"
- "Broken tiles near Metro Station"

3. Submit the report
4. Go to Home page
5. You should see the priority badge on your report!

### Option 2: Manually Add Test Data

Open browser console (F12) and run:

```javascript
// Add a test report near a hospital
const testReport = {
  id: Date.now().toString(),
  title: "Pothole on Main Road",
  description: "Large pothole causing traffic issues",
  category: "Potholes",
  location: "Main Road near City Hospital, Sector 5",
  severity: "high",
  status: "pending",
  date: new Date().toISOString(),
  userId: "user123",
  userName: "Test User",
  geoTag: {
    latitude: 28.6139,
    longitude: 77.2090,
    address: "Main Road near City Hospital",
    googleMapsLink: "https://www.google.com/maps?q=28.6139,77.2090"
  }
};

// Get existing reports
const reports = JSON.parse(localStorage.getItem('reports') || '[]');

// Add test report
reports.push(testReport);

// Save back
localStorage.setItem('reports', JSON.stringify(reports));

// Reload page
location.reload();
```

### Option 3: Check Existing Reports

Open browser console and check your reports:

```javascript
// View all reports
const reports = JSON.parse(localStorage.getItem('reports') || '[]');
console.log('Total reports:', reports.length);

// Check locations
reports.forEach((r, i) => {
  console.log(`Report ${i + 1}:`, r.location);
});
```

## Expected Results

When a report has infrastructure keywords in the location:

### Visual Display:
```
┌─────────────────────────────────────┐
│ 🏥 Near City Hospital               │ ← Red badge
│ 📍 (Within 5km radius)              │ ← Distance info
│                                     │
│ Pothole on Main Road                │
│ Large pothole causing traffic...    │
└─────────────────────────────────────┘
```

### Feed Sorting:
- Reports with badges appear at the TOP
- Higher priority score
- Sorted by: Infrastructure > Severity > Upvotes > Recency

## Troubleshooting

### Badge Not Showing?

**Check 1:** Does location contain keywords?
```javascript
const location = "Your location text here";
const keywords = ['hospital', 'school', 'college', 'clinic', 'police', 'metro'];
const hasKeyword = keywords.some(k => location.toLowerCase().includes(k));
console.log('Has keyword:', hasKeyword);
```

**Check 2:** Is the function being called?
- Open browser DevTools
- Go to Sources tab
- Set breakpoint in `priorityRanking.js` > `getPriorityBadge` function
- Reload Home page

**Check 3:** Check console for errors
- Press F12
- Look for red error messages
- Check if `priorityRanking.js` loaded correctly

### Still Not Working?

1. **Clear cache and reload:**
   - Press Ctrl+Shift+R (Windows)
   - Or Cmd+Shift+R (Mac)

2. **Check file imports:**
   - Verify `Home.js` imports `getPriorityBadge`
   - Verify `priorityRanking.js` exists in utils folder

3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm start
   ```

## Quick Test Report Examples

Copy these locations when creating reports:

1. **Hospital:**
   - "MG Road near Apollo Hospital"
   - "Sector 5 near City Medical Center"
   - "Park Street near Emergency Clinic"

2. **School:**
   - "Main Road near ABC School"
   - "Near St. Mary's College"
   - "Opposite Delhi Public School"

3. **Police:**
   - "Near Central Police Station"
   - "Block A near Police Headquarters"

4. **Metro:**
   - "Near Rajiv Chowk Metro Station"
   - "Opposite Metro Station Gate 2"

## Success Indicators

✅ Badge appears on report card
✅ Badge shows infrastructure name
✅ Distance info shows "Within 5km radius"
✅ Report appears at top of feed
✅ Badge color matches infrastructure type

---

**Need Help?** Check browser console for errors or create a test report with one of the example locations above!
