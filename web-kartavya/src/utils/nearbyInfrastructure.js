// Nearby Infrastructure Detection using Overpass API (OpenStreetMap)

import { calculateDistance, formatDistance } from './geolocation';

const SEARCH_RADIUS_KM = 5;
const SEARCH_RADIUS_METERS = SEARCH_RADIUS_KM * 1000;

/**
 * Query nearby infrastructure using Overpass API
 * @param {number} latitude - Report latitude
 * @param {number} longitude - Report longitude
 * @returns {Promise<object>} - Nearby infrastructure data
 */
export const findNearbyInfrastructure = async (latitude, longitude) => {
  if (!latitude || !longitude) {
    return { found: false, infrastructure: [] };
  }

  try {
    // Overpass API query for hospitals, clinics, schools, colleges within radius
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="clinic"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="doctors"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="school"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="college"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="university"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="police"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        node["amenity"="fire_station"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="hospital"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="clinic"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="school"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="college"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="university"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="police"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
        way["amenity"="fire_station"](around:${SEARCH_RADIUS_METERS},${latitude},${longitude});
      );
      out center;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch nearby infrastructure');
    }

    const data = await response.json();
    const infrastructure = processInfrastructureData(data.elements, latitude, longitude);

    return {
      found: infrastructure.length > 0,
      infrastructure: infrastructure,
      searchRadius: SEARCH_RADIUS_KM
    };
  } catch (error) {
    console.error('Error finding nearby infrastructure:', error);
    return { found: false, infrastructure: [], error: error.message };
  }
};

/**
 * Process raw Overpass API data
 * @param {array} elements - Raw elements from API
 * @param {number} reportLat - Report latitude
 * @param {number} reportLon - Report longitude
 * @returns {array} - Processed infrastructure list
 */
const processInfrastructureData = (elements, reportLat, reportLon) => {
  const infrastructure = [];

  elements.forEach(element => {
    const lat = element.lat || element.center?.lat;
    const lon = element.lon || element.center?.lon;

    if (!lat || !lon) return;

    const distance = calculateDistance(reportLat, reportLon, lat, lon);
    
    // Only include if within radius
    if (distance <= SEARCH_RADIUS_KM) {
      const type = categorizeInfrastructure(element.tags?.amenity);
      
      infrastructure.push({
        id: element.id,
        name: element.tags?.name || `Unnamed ${type.label}`,
        type: type.category,
        typeLabel: type.label,
        amenity: element.tags?.amenity,
        distance: distance,
        distanceFormatted: formatDistance(distance),
        coordinates: { lat, lon },
        priority: type.priority,
        emoji: type.emoji,
        color: type.color
      });
    }
  });

  // Sort by distance (closest first)
  infrastructure.sort((a, b) => a.distance - b.distance);

  return infrastructure;
};

/**
 * Categorize infrastructure type
 * @param {string} amenity - Amenity type from OSM
 * @returns {object} - Category info
 */
const categorizeInfrastructure = (amenity) => {
  const categories = {
    hospital: { category: 'health', label: 'Hospital', priority: 10, emoji: '🏥', color: '#D32F2F' },
    clinic: { category: 'health', label: 'Clinic', priority: 9, emoji: '🏥', color: '#D32F2F' },
    doctors: { category: 'health', label: 'Medical Center', priority: 8, emoji: '🏥', color: '#D32F2F' },
    school: { category: 'education', label: 'School', priority: 8, emoji: '🏫', color: '#FF9933' },
    college: { category: 'education', label: 'College', priority: 8, emoji: '🏫', color: '#FF9933' },
    university: { category: 'education', label: 'University', priority: 8, emoji: '🏫', color: '#FF9933' },
    police: { category: 'emergency', label: 'Police Station', priority: 9, emoji: '🚨', color: '#D32F2F' },
    fire_station: { category: 'emergency', label: 'Fire Station', priority: 9, emoji: '🚨', color: '#D32F2F' }
  };

  return categories[amenity] || { category: 'other', label: 'Facility', priority: 5, emoji: '📍', color: '#666' };
};

/**
 * Get the closest critical infrastructure
 * @param {array} infrastructure - List of infrastructure
 * @returns {object|null} - Closest critical infrastructure
 */
export const getClosestCritical = (infrastructure) => {
  if (!infrastructure || infrastructure.length === 0) return null;

  // Filter for health and education only
  const critical = infrastructure.filter(i => 
    i.type === 'health' || i.type === 'education'
  );

  return critical.length > 0 ? critical[0] : null;
};

/**
 * Check if report should be prioritized
 * @param {array} infrastructure - List of nearby infrastructure
 * @returns {boolean}
 */
export const shouldPrioritize = (infrastructure) => {
  if (!infrastructure || infrastructure.length === 0) return false;

  // Prioritize if any health or education facility within 5km
  return infrastructure.some(i => 
    (i.type === 'health' || i.type === 'education') && i.distance <= SEARCH_RADIUS_KM
  );
};

/**
 * Generate alert message for nearby infrastructure
 * @param {array} infrastructure - List of nearby infrastructure
 * @returns {string|null} - Alert message
 */
export const generateAlertMessage = (infrastructure) => {
  if (!infrastructure || infrastructure.length === 0) return null;

  const critical = infrastructure.filter(i => 
    i.type === 'health' || i.type === 'education'
  );

  if (critical.length === 0) return null;

  const closest = critical[0];
  const count = critical.length;

  if (count === 1) {
    return `⚠️ Critical: ${closest.name} is ${closest.distanceFormatted} away`;
  } else {
    return `⚠️ Critical: ${count} facilities nearby (closest: ${closest.name} - ${closest.distanceFormatted})`;
  }
};

/**
 * Cache infrastructure data to avoid repeated API calls
 */
const infrastructureCache = new Map();

export const getCachedInfrastructure = (latitude, longitude) => {
  const key = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
  return infrastructureCache.get(key);
};

export const cacheInfrastructure = (latitude, longitude, data) => {
  const key = `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
  infrastructureCache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const isCacheValid = (cacheEntry) => {
  if (!cacheEntry) return false;
  const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours
  return (Date.now() - cacheEntry.timestamp) < MAX_AGE;
};
