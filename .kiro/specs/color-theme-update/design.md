# Color Theme Update - Design Document

## Overview

This design document outlines the implementation of a modern, professional color palette that transforms the application from a civic-themed design (saffron/green) to a sophisticated dark dashboard theme with purple gradients and status-based colors.

## Architecture

### Color System Hierarchy

```
Global CSS Variables (global.css)
         ↓
Component Inline Styles
         ↓
Dynamic Status Colors
```

### Implementation Strategy

1. **Phase 1**: Update CSS variables in global.css
2. **Phase 2**: Update component inline styles
3. **Phase 3**: Update status color logic
4. **Phase 4**: Verify contrast and accessibility

## Components and Interfaces

### 1. Global CSS Variables

**File:** `web-kartavya/src/styles/global.css`

```css
:root {
  /* Primary Colors */
  --background-blue: #1E2A38;
  --panel-background: #0F172A;
  --gradient-start: #4C4CFF;
  --gradient-end: #6C63FF;
  
  /* Status Colors */
  --status-open: #E74C3C;
  --status-progress: #F1C40F;
  --status-resolved: #27AE60;
  --status-info: #2980B9;
  
  /* Neutral Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #B0BEC5;
  --divider: #2E3B4E;
  --border: #2E3B4E;
  
  /* Legacy mappings for compatibility */
  --civic-blue: #1E2A38;
  --civic-orange: #4C4CFF;
  --emerald-green: #27AE60;
}
```

### 2. Component Color Mapping

#### Layout Component
- **Header Background**: Gradient (#4C4CFF → #6C63FF)
- **Bottom Nav**: #1E2A38
- **Text**: #FFFFFF

#### Home Feed
- **Background**: #0F172A
- **Cards**: #1E2A38
- **Status Badges**: Status colors
- **Text**: #FFFFFF / #B0BEC5

#### Report Page
- **Background**: #0F172A
- **Form Inputs**: #1E2A38 with #2E3B4E border
- **Buttons**: Gradient or status colors
- **Text**: #FFFFFF

#### Profile Page
- **Background**: #0F172A
- **Cards**: #1E2A38
- **Stats**: Status colors for highlights
- **Text**: #FFFFFF / #B0BEC5

#### Dashboard
- **Background**: #0F172A
- **Stats Cards**: #1E2A38 with colored borders
- **Table**: #1E2A38 with #2E3B4E borders
- **Text**: #FFFFFF / #B0BEC5

#### Login/Register
- **Background**: Gradient (#4C4CFF → #6C63FF)
- **Form Card**: #1E2A38
- **Inputs**: #0F172A with #2E3B4E border
- **Text**: #FFFFFF

#### Splash Screen
- **Background**: #0F172A or gradient
- **Logo Circle**: #1E2A38
- **Text**: #FFFFFF

#### Onboarding
- **Background**: Gradient (#4C4CFF → #6C63FF)
- **Card**: #1E2A38
- **Text**: #FFFFFF
- **Dots**: Gradient colors

## Data Models

### Color Configuration Object

```javascript
export const THEME_COLORS = {
  primary: {
    backgroundBlue: '#1E2A38',
    panelBackground: '#0F172A',
    gradientStart: '#4C4CFF',
    gradientEnd: '#6C63FF'
  },
  status: {
    open: '#E74C3C',
    inProgress: '#F1C40F',
    resolved: '#27AE60',
    info: '#2980B9'
  },
  neutral: {
    textPrimary: '#FFFFFF',
    textSecondary: '#B0BEC5',
    divider: '#2E3B4E',
    border: '#2E3B4E'
  }
};
```

## Error Handling

### Contrast Issues
- Verify all text meets WCAG AA standards
- Adjust colors if contrast is insufficient
- Test with accessibility tools

### Browser Compatibility
- Test CSS variables in all browsers
- Provide fallbacks for older browsers
- Verify gradient rendering

## Testing Strategy

### Visual Testing
1. Check all pages for color consistency
2. Verify gradients render correctly
3. Test status colors are distinguishable
4. Verify text readability

### Accessibility Testing
1. Run contrast checker on all text
2. Test with screen readers
3. Verify color-blind friendly
4. Test in high contrast mode

### Cross-Browser Testing
1. Test in Chrome, Firefox, Safari, Edge
2. Verify mobile rendering
3. Check gradient support
4. Test CSS variable support

## Implementation Plan

### Step 1: Update Global CSS
- Add new CSS variables
- Update existing variable values
- Add gradient utilities

### Step 2: Update Layout
- Header gradient
- Bottom nav background
- Text colors

### Step 3: Update Pages
- Home feed
- Report page
- Profile page
- Dashboard
- Login/Register
- Splash screen
- Onboarding

### Step 4: Update Status Colors
- Issue status badges
- Severity indicators
- Alert boxes
- Success messages

### Step 5: Verify and Test
- Visual inspection
- Accessibility check
- Cross-browser test
- Mobile responsive test

## Migration Notes

### Breaking Changes
- None (CSS only)

### Backward Compatibility
- Old color variables mapped to new values
- Gradual migration possible
- No JavaScript changes required

### Rollback Plan
- Keep backup of global.css
- Can revert CSS variables easily
- No data migration needed
