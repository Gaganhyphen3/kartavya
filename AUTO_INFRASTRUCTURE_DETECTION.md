# 🚨 Auto Infrastructure Detection & Alerts

## Overview

The system now **automatically detects** hospitals, schools, and other critical infrastructure within 5km of any reported issue using real GPS coordinates and OpenStreetMap data!

## How It Works

### 1. Automatic Detection
When a report has GPS coordinates, the system:
1. Queries Overpass API (OpenStreetMap) for nearby facilities
2. Searches within 5km radius
3. Finds hospitals, clinics, schools, colleges, police stations, fire stations
4. Calculates exact distances
5. Ranks by proximity

### 2. Priority Alert Display
Reports near critical infrastructure show a **red alert box**:

```
┌─────────────────────────────────────────────┐
│ ⚠️ Priority Alert                           │
│ Critical: City Hospital is 1.2km away       │
│                                         ▶   │
└─────────────────────────────────────────────┘
```

### 3. Expandable Details
Click the alert to see all nearby facilities:

```
┌─────────────────────────────────────────────┐
│ Nearby Critical Infrastructure (3)          │
│                                             │
│ 🏥 City Hospital                            │
│    Hospital • 1.2km away      [Directions]  │
│                                             │
│ 🏫 ABC School                               │
│    School • 2.5km away        [Directions]  │
│                                             │
│ 🏥 Medical Clinic                           │
│    Clinic • 3.8km away        [Directions]  │
└─────────────────────────────────────────────┘
```

### 4. Direct Navigation
Each facility has a "Directions" button that opens Google Maps with:
- Start point: Report location
- End point: Facility location
- Ready-to-use navigation

## Features

### ✅ Real-Time Detection
- Uses Overpass API (free, no API key needed)
- Queries OpenStreetMap database
- Finds actual facilities with real coordinates
- Calculates precise distances

### ✅ Smart Caching
- Caches results for 24 hours
- Avoids repeated API calls
- Faster loading for nearby reports

### ✅ Priority Ranking
Reports near critical infrastructure:
- Appear at top of feed
- Get +100 priority score boost
- Show red alert badge
- Marked as high priority

### ✅ Facility Types Detected

**Health (🏥 Red):**
- Hospitals
- Clinics
- Medical centers
- Doctors' offices

**Education (🏫 Orange):**
- Schools
- Colleges
- Universities
- Educational institutes

**Emergency (🚨 Red):**
- Police stations
- Fire stations

## Technical Details

### API Used
**Overpass API** - OpenStreetMap query service
- Free and open source
- No API key required
- Global coverage
- Real-time data

### Search Query
```javascript
// Searches for facilities within 5km radius
node["amenity"="hospital"](around:5000,lat,lon);
node["amenity"="school"](around:5000,lat,lon);
// ... and more
```

### Distance Calculation
Uses Haversine formula for accurate distance:
```javascript
distance = calculateDistance(reportLat, reportLon, facilityLat, facilityLon);
// Returns distance in kilometers
```

## Example Scenarios

### Scenario 1: Pothole Near Hospital
```
Report Location: 28.6139°N, 77.2090°E
Detected Facilities:
  - City Hospital (1.2km)
  - Medical Clinic (3.5km)

Alert: ⚠️ Critical: City Hospital is 1.2km away
Priority: HIGH (appears at top of feed)
```

### Scenario 2: Broken Streetlight Near School
```
Report Location: 28.5355°N, 77.3910°E
Detected Facilities:
  - ABC School (800m)
  - XYZ College (2.1km)
  - Medical Center (4.5km)

Alert: ⚠️ Critical: 3 facilities nearby (closest: ABC School - 800m)
Priority: HIGH (appears at top of feed)
```

### Scenario 3: No Nearby Infrastructure
```
Report Location: Rural area
Detected Facilities: None

Alert: (No alert shown)
Priority: NORMAL (standard ranking)
```

## User Experience

### For Citizens:
1. **Submit report** with GPS location
2. **System auto-detects** nearby facilities
3. **See alert** if near critical infrastructure
4. **Click to expand** and view all facilities
5. **Get directions** to any facility

### For Authorities:
1. **See priority alerts** on reports
2. **Know which facilities** are affected
3. **Prioritize response** based on proximity
4. **Navigate directly** to affected areas

## Files Created

1. **`web-kartavya/src/utils/nearbyInfrastructure.js`**
   - Core detection logic
   - Overpass API integration
   - Distance calculations
   - Caching system

2. **`web-kartavya/src/components/InfrastructureAlert.js`**
   - Alert UI component
   - Expandable details panel
   - Navigation links
   - Loading states

3. **`web-kartavya/src/pages/Home.js`** (Updated)
   - Integrated alert display
   - Shows on all reports with GPS

## Configuration

### Adjust Search Radius
Edit `nearbyInfrastructure.js`:
```javascript
const SEARCH_RADIUS_KM = 5; // Change to desired radius
```

### Add More Facility Types
Add to Overpass query:
```javascript
node["amenity"="pharmacy"](around:5000,lat,lon);
node["amenity"="library"](around:5000,lat,lon);
```

### Customize Alert Colors
Edit `InfrastructureAlert.js`:
```javascript
backgroundColor: '#FFEBEE', // Alert background
borderLeft: '4px solid #D32F2F', // Alert border
```

## Performance

### API Response Time
- Average: 1-3 seconds
- Cached: Instant
- Timeout: 25 seconds

### Data Usage
- Per query: ~5-20 KB
- Cached for 24 hours
- Minimal bandwidth impact

## Privacy & Security

- ✅ No user tracking
- ✅ No personal data sent
- ✅ Uses public OpenStreetMap data
- ✅ No API key required
- ✅ HTTPS encrypted requests

## Troubleshooting

### Alert Not Showing?

**Check 1:** Does report have GPS coordinates?
```javascript
console.log(report.geoTag);
// Should have latitude and longitude
```

**Check 2:** Are there facilities nearby?
- System only shows alert if facilities found within 5km
- Rural areas may have no nearby infrastructure

**Check 3:** Check browser console
- Look for API errors
- Check network tab for Overpass API calls

### Slow Loading?

- First load queries API (1-3 seconds)
- Subsequent loads use cache (instant)
- Check internet connection
- Overpass API may be slow during peak hours

## Future Enhancements

Potential improvements:
1. **Real-time notifications** to facility authorities
2. **Heatmap view** showing infrastructure coverage
3. **Custom facility types** per region
4. **Offline mode** with pre-cached data
5. **Multi-language** facility names

---

**Status:** ✅ Fully Implemented
**Version:** 1.0
**Last Updated:** January 2025

The system now automatically detects and alerts about nearby critical infrastructure! 🎯
