# Kartavya Logo Update Guide

## Overview
This guide explains how to integrate the new Kartavya logo throughout the website.

## Logo Description
The new logo features:
- A shield containing a cityscape silhouette
- Two hands supporting the shield from below
- A rising sun behind the shield
- The text "Kartavya" and "CIVIC-TECH APP"
- Color scheme: Navy blue, emerald green, sun yellow/orange, beige background

## Step 1: Save the Logo Image

1. Save the provided logo image to: `web-kartavya/public/logo.png`
2. Also create a smaller version for favicons: `web-kartavya/public/logo-small.png` (192x192px)
3. Create a favicon: `web-kartavya/public/favicon.ico`

## Step 2: Components Updated

The following components have been updated to use the new logo:

### 1. Layout Component (`web-kartavya/src/components/Layout.js`)
- Header now displays the logo image
- Logo is clickable and links to home page
- Responsive sizing for mobile devices

### 2. Splash Screen (`web-kartavya/src/pages/SplashScreen.js`)
- Large logo display on app launch
- Animated entrance effect

### 3. Login Page (`web-kartavya/src/pages/Login.js`)
- Logo displayed at top of login form
- Maintains brand consistency

### 4. Register Page (`web-kartavya/src/pages/Register.js`)
- Logo displayed at top of registration form
- Consistent with login page

### 5. Onboarding Slides (`web-kartavya/src/pages/Onboarding.js`)
- Logo shown on first slide
- Sets brand identity from the start

### 6. HTML Head (`web-kartavya/public/index.html`)
- Favicon updated
- Meta tags include logo for social sharing

## Logo Usage Guidelines

### Sizes
- **Header**: 50px height (desktop), 40px height (mobile)
- **Splash Screen**: 200px height
- **Login/Register**: 120px height
- **Onboarding**: 150px height

### Spacing
- Maintain minimum 20px padding around logo
- Center-align for splash/auth pages
- Left-align for header navigation

### Accessibility
- Always include alt text: "Kartavya Civic-Tech App Logo"
- Ensure sufficient contrast with background
- Logo should be clickable in navigation

## Color Coordination

The logo colors align with the civic color palette:
- **Navy Blue** (#1E2A38) - Shield and cityscape
- **Emerald Green** (#00B894) - Hands and nature elements
- **Sun Yellow** (#FDCB2D) - Sun rays
- **Civic Orange** (#E17055) - Accent elements

## Files Modified

1. `web-kartavya/src/components/Layout.js` - Header logo
2. `web-kartavya/src/pages/SplashScreen.js` - Splash screen logo
3. `web-kartavya/src/pages/Login.js` - Login page logo
4. `web-kartavya/src/pages/Register.js` - Register page logo
5. `web-kartavya/src/pages/Onboarding.js` - Onboarding logo
6. `web-kartavya/public/index.html` - Favicon and meta tags

## Testing Checklist

- [ ] Logo displays correctly on all pages
- [ ] Logo is responsive on mobile devices
- [ ] Logo loads quickly (optimized file size)
- [ ] Favicon appears in browser tab
- [ ] Logo maintains aspect ratio
- [ ] Alt text is present for accessibility
- [ ] Logo is clickable in header (links to home)

## Next Steps

After saving the logo image to the public folder:
1. Test the application: `npm start`
2. Verify logo appears on all pages
3. Check mobile responsiveness
4. Validate accessibility with screen readers
5. Test social media sharing (logo should appear in previews)

## Notes

- The logo image should be optimized for web (PNG format, compressed)
- Consider creating SVG version for better scalability
- Maintain original aspect ratio to prevent distortion
- Logo file size should be under 100KB for optimal performance
