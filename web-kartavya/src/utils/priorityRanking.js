// Priority ranking system for reports near critical infrastructure

import { calculateDistance } from './geolocation';

// Critical infrastructure types with their priority weights
const INFRASTRUCTURE_TYPES = {
  hospital: { weight: 10, keywords: ['hospital', 'clinic', 'medical', 'health center', 'dispensary', 'emergency'] },
  school: { weight: 8, keywords: ['school', 'college', 'university', 'education', 'institute', 'academy'] },
  emergency: { weight: 9, keywords: ['police', 'fire station', 'ambulance'] },
  transport: { weight: 6, keywords: ['bus stop', 'railway', 'metro', 'station'] }
};

// Distance threshold in kilometers
const PRIORITY_RADIUS_KM = 5;

/**
 * Detect if a location is near critical infrastructure
 * @param {string} location - Location string from report
 * @param {object} geoTag - GeoTag object with coordinates
 * @returns {object} - Infrastructure detection result
 */
export const detectCriticalInfrastructure = (location, geoTag) => {
  if (!location) {
    return { isCritical: false, type: null, weight: 0 };
  }

  const locationLower = location.toLowerCase();
  
  // Check each infrastructure type
  for (const [type, config] of Object.entries(INFRASTRUCTURE_TYPES)) {
    const hasKeyword = config.keywords.some(keyword => 
      locationLower.includes(keyword)
    );
    
    if (hasKeyword) {
      return {
        isCritical: true,
        type: type,
        weight: config.weight,
        keywords: config.keywords.filter(k => locationLower.includes(k))
      };
    }
  }

  return { isCritical: false, type: null, weight: 0 };
};

/**
 * Check if report is within priority radius of critical infrastructure
 * @param {object} report - Report object with geoTag
 * @param {array} criticalLocations - Array of known critical locations (optional)
 * @returns {boolean}
 */
export const isNearCriticalInfrastructure = (report, criticalLocations = []) => {
  if (!report.geoTag || !report.geoTag.latitude || !report.geoTag.longitude) {
    return false;
  }

  // Check if location text indicates critical infrastructure
  const detection = detectCriticalInfrastructure(report.location, report.geoTag);
  if (detection.isCritical) {
    return true;
  }

  // Check distance to known critical locations (if provided)
  for (const criticalLoc of criticalLocations) {
    const distance = calculateDistance(
      report.geoTag.latitude,
      report.geoTag.longitude,
      criticalLoc.latitude,
      criticalLoc.longitude
    );
    
    if (distance <= PRIORITY_RADIUS_KM) {
      return true;
    }
  }

  return false;
};

/**
 * Calculate priority score for a report
 * @param {object} report - Report object
 * @param {number} upvotes - Number of upvotes
 * @param {number} comments - Number of comments
 * @returns {number} - Priority score (higher = more priority)
 */
export const calculatePriorityScore = (report, upvotes = 0, comments = 0) => {
  let score = 0;

  // Base score from engagement
  score += upvotes * 5;
  score += comments * 3;

  // Recency bonus (newer reports get higher score)
  const reportDate = new Date(report.date);
  const now = new Date();
  const hoursSinceReport = (now - reportDate) / (1000 * 60 * 60);
  
  if (hoursSinceReport < 24) {
    score += 20; // Recent report bonus
  } else if (hoursSinceReport < 72) {
    score += 10;
  }

  // Severity bonus
  const severityBonus = {
    'high': 30,
    'medium': 15,
    'low': 5
  };
  score += severityBonus[report.severity?.toLowerCase()] || 0;

  // Critical infrastructure bonus
  const infrastructure = detectCriticalInfrastructure(report.location, report.geoTag);
  if (infrastructure.isCritical) {
    score += infrastructure.weight * 10; // Significant boost for critical areas
  }

  // Status penalty (resolved issues get lower priority)
  if (report.status?.toLowerCase() === 'resolved') {
    score *= 0.3;
  } else if (report.status?.toLowerCase() === 'rejected') {
    score *= 0.1;
  }

  return score;
};

/**
 * Sort reports by priority (async version with real infrastructure detection)
 * @param {array} reports - Array of report objects
 * @param {function} getUpvoteCount - Function to get upvote count
 * @param {function} getCommentCount - Function to get comment count
 * @param {boolean} useRealDetection - Whether to use real API detection
 * @returns {Promise<array>} - Sorted reports (highest priority first)
 */
export const sortReportsByPriorityAsync = async (reports, getUpvoteCount, getCommentCount, useRealDetection = false) => {
  // If real detection is enabled, we'll need to import and use the nearby infrastructure module
  // For now, use keyword-based detection
  const processedReports = reports.map(report => ({
    ...report,
    priorityScore: calculatePriorityScore(
      report,
      getUpvoteCount(report.id),
      getCommentCount(report.id)
    ),
    infrastructure: detectCriticalInfrastructure(report.location, report.geoTag)
  }));

  return processedReports.sort((a, b) => b.priorityScore - a.priorityScore);
};

/**
 * Sort reports by priority (sync version - backward compatible)
 * @param {array} reports - Array of report objects
 * @param {function} getUpvoteCount - Function to get upvote count
 * @param {function} getCommentCount - Function to get comment count
 * @returns {array} - Sorted reports (highest priority first)
 */
export const sortReportsByPriority = (reports, getUpvoteCount, getCommentCount) => {
  return reports
    .map(report => ({
      ...report,
      priorityScore: calculatePriorityScore(
        report,
        getUpvoteCount(report.id),
        getCommentCount(report.id)
      ),
      infrastructure: detectCriticalInfrastructure(report.location, report.geoTag)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
};

/**
 * Extract infrastructure name from location string
 * @param {string} location - Location string
 * @param {string} type - Infrastructure type
 * @returns {string|null} - Extracted name or null
 */
const extractInfrastructureName = (location, type) => {
  if (!location) return null;

  const keywords = INFRASTRUCTURE_TYPES[type]?.keywords || [];
  const locationLower = location.toLowerCase();

  // Try to find the infrastructure name
  for (const keyword of keywords) {
    const keywordIndex = locationLower.indexOf(keyword);
    if (keywordIndex !== -1) {
      // Extract surrounding words (before and after keyword)
      const words = location.split(/[\s,]+/);
      
      // Find the keyword position in words array
      let keywordWordIndex = -1;
      for (let i = 0; i < words.length; i++) {
        if (words[i].toLowerCase().includes(keyword)) {
          keywordWordIndex = i;
          break;
        }
      }

      if (keywordWordIndex !== -1) {
        // Get 2-3 words around the keyword to form the name
        const start = Math.max(0, keywordWordIndex - 2);
        const end = Math.min(words.length, keywordWordIndex + 3);
        const extractedName = words.slice(start, end).join(' ');
        
        // Clean up the name
        return extractedName
          .replace(/^(near|at|in|on|the)\s+/i, '')
          .replace(/\s+(near|at|in|on|the)$/i, '')
          .trim();
      }
    }
  }

  return null;
};

/**
 * Get priority badge for display
 * @param {object} report - Report object
 * @returns {object|null} - Badge info or null
 */
export const getPriorityBadge = (report) => {
  const infrastructure = detectCriticalInfrastructure(report.location, report.geoTag);
  
  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Priority Badge Check:', {
      location: report.location,
      isCritical: infrastructure.isCritical,
      type: infrastructure.type
    });
  }
  
  if (!infrastructure.isCritical) {
    return null;
  }

  // Extract the actual infrastructure name from location
  const infrastructureName = extractInfrastructureName(report.location, infrastructure.type);

  const badges = {
    hospital: { 
      emoji: '🏥', 
      prefix: 'Near',
      fallbackText: 'Health Center',
      color: '#D32F2F' 
    },
    school: { 
      emoji: '🏫', 
      prefix: 'Near',
      fallbackText: 'Education Center',
      color: '#FF9933' 
    },
    emergency: { 
      emoji: '🚨', 
      prefix: 'Near',
      fallbackText: 'Emergency Services',
      color: '#D32F2F' 
    },
    transport: { 
      emoji: '🚌', 
      prefix: 'Near',
      fallbackText: 'Transport Hub',
      color: '#1976D2' 
    }
  };

  const badge = badges[infrastructure.type];
  if (!badge) return null;

  // Use extracted name if available, otherwise use fallback
  const displayText = infrastructureName 
    ? `${badge.prefix} ${infrastructureName}`
    : `${badge.prefix} ${badge.fallbackText}`;

  // Add distance info if available (within 5km radius)
  const distanceText = `(Within ${PRIORITY_RADIUS_KM}km radius)`;

  return {
    emoji: badge.emoji,
    text: displayText,
    distanceInfo: distanceText,
    color: badge.color,
    infrastructureName: infrastructureName,
    radiusKm: PRIORITY_RADIUS_KM
  };
};

/**
 * Extract infrastructure details from geotag
 * @param {object} geoTag - GeoTag object with address details
 * @returns {object} - Infrastructure details
 */
export const extractInfrastructureDetails = (geoTag) => {
  if (!geoTag || !geoTag.address) {
    return { hasInfrastructure: false, details: [] };
  }

  const address = geoTag.address.toLowerCase();
  const details = [];

  // Check for each infrastructure type
  for (const [type, config] of Object.entries(INFRASTRUCTURE_TYPES)) {
    const matches = config.keywords.filter(keyword => address.includes(keyword));
    if (matches.length > 0) {
      details.push({
        type: type,
        keywords: matches,
        priority: config.weight
      });
    }
  }

  return {
    hasInfrastructure: details.length > 0,
    details: details
  };
};
