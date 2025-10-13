// Authority Roles Configuration

export const AUTHORITY_ROLES = [
  'Municipal Worker',
  'PWD Contractor',
  'Health Inspector',
  'Traffic Police Officer',
  'Police Department Representative',
  'Water Supply Officer',
  'Electricity Board Officer',
  'Sanitation Supervisor',
  'Environment Officer',
  'Fire & Emergency Officer',
  'Public Relations Officer (PRO)',
  'Ward Officer / Area Supervisor',
  'Field Worker / Technician',
  'Disaster Management Officer',
  'City Administrator',
  'Others'
];

// Get icon for each authority role
export const getRoleIcon = (role) => {
  const icons = {
    'Municipal Worker': '🏗️',
    'PWD Contractor': '🚧',
    'Health Inspector': '🏥',
    'Traffic Police Officer': '🚦',
    'Police Department Representative': '👮',
    'Water Supply Officer': '💧',
    'Electricity Board Officer': '⚡',
    'Sanitation Supervisor': '🧹',
    'Environment Officer': '🌳',
    'Fire & Emergency Officer': '🚒',
    'Public Relations Officer (PRO)': '📢',
    'Ward Officer / Area Supervisor': '📋',
    'Field Worker / Technician': '🔧',
    'Disaster Management Officer': '🆘',
    'City Administrator': '🏛️',
    'Others': '👤'
  };
  return icons[role] || '👤';
};

// Get role color for badges
export const getRoleColor = (role) => {
  const colors = {
    'Municipal Worker': '#FF9933',
    'PWD Contractor': '#FF6B35',
    'Health Inspector': '#E63946',
    'Traffic Police Officer': '#1976D2',
    'Police Department Representative': '#000080',
    'Water Supply Officer': '#0077B6',
    'Electricity Board Officer': '#FFB703',
    'Sanitation Supervisor': '#138808',
    'Environment Officer': '#2D6A4F',
    'Fire & Emergency Officer': '#D32F2F',
    'Public Relations Officer (PRO)': '#7209B7',
    'Ward Officer / Area Supervisor': '#6A4C93',
    'Field Worker / Technician': '#F77F00',
    'Disaster Management Officer': '#DC2F02',
    'City Administrator': '#000080',
    'Others': '#666666'
  };
  return colors[role] || '#000080';
};

// Validate if role is valid
export const isValidRole = (role) => {
  return AUTHORITY_ROLES.includes(role);
};

// Get role category for grouping
export const getRoleCategory = (role) => {
  const categories = {
    'Municipal Worker': 'Administration',
    'PWD Contractor': 'Infrastructure',
    'Health Inspector': 'Health & Safety',
    'Traffic Police Officer': 'Law Enforcement',
    'Police Department Representative': 'Law Enforcement',
    'Water Supply Officer': 'Utilities',
    'Electricity Board Officer': 'Utilities',
    'Sanitation Supervisor': 'Sanitation',
    'Environment Officer': 'Environment',
    'Fire & Emergency Officer': 'Emergency Services',
    'Public Relations Officer (PRO)': 'Communication',
    'Ward Officer / Area Supervisor': 'Administration',
    'Field Worker / Technician': 'Operations',
    'Disaster Management Officer': 'Emergency Services',
    'City Administrator': 'Administration',
    'Others': 'General'
  };
  return categories[role] || 'General';
};
