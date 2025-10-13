# Save Logo Instructions

## Quick Steps to Add the Logo

### 1. Save the Main Logo
1. Right-click on the logo image provided in the chat
2. Save it as `logo.png`
3. Place it in the `web-kartavya/public/` folder

### 2. Create Additional Logo Versions (Optional but Recommended)

#### Small Logo for Mobile/Favicon
- Resize the logo to 192x192 pixels
- Save as `logo-small.png` in `web-kartavya/public/`

#### Favicon
- Resize the logo to 32x32 pixels or 16x16 pixels
- Save as `favicon.ico` in `web-kartavya/public/`

### 3. File Structure
After saving, your public folder should look like this:
```
web-kartavya/public/
├── index.html
├── logo.png          (Main logo - full size)
├── logo-small.png    (192x192px for mobile)
└── favicon.ico       (32x32px or 16x16px)
```

### 4. Test the Logo
Run the application:
```bash
cd web-kartavya
npm start
```

### 5. Verify Logo Appears On:
- ✅ Header navigation (clickable, links to home)
- ✅ Splash screen (large, animated)
- ✅ Login page (centered, 120px height)
- ✅ Register page (centered, 120px height)
- ✅ Onboarding first slide (150px height)
- ✅ Browser tab (favicon)

## Logo Specifications

### Main Logo (`logo.png`)
- **Format**: PNG with transparency
- **Recommended Size**: 400x400px or larger
- **File Size**: Under 100KB (optimized)
- **Usage**: All pages, responsive sizing

### Small Logo (`logo-small.png`)
- **Format**: PNG
- **Size**: 192x192px
- **Usage**: Mobile devices, PWA icon

### Favicon (`favicon.ico`)
- **Format**: ICO
- **Size**: 32x32px or 16x16px
- **Usage**: Browser tab icon

## Troubleshooting

### Logo Not Showing?
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Verify file is in `web-kartavya/public/` folder
3. Check file name is exactly `logo.png` (case-sensitive)
4. Restart the development server

### Logo Too Large/Small?
The logo sizes are responsive and defined in the components:
- **Header**: 50px (desktop), 40px (mobile)
- **Splash**: 200px
- **Login/Register**: 120px
- **Onboarding**: 150px

To adjust, edit the `height` style in each component.

### Logo Quality Issues?
- Use a high-resolution PNG (at least 400x400px)
- Ensure transparency is preserved
- Optimize file size using tools like TinyPNG

## Color Coordination

The logo colors match the civic palette:
- **Navy Blue** (#1E2A38) - Shield and cityscape
- **Emerald Green** (#00B894) - Hands and nature
- **Sun Yellow** (#FDCB2D) - Sun rays
- **Beige/Cream** - Background rays

These colors are already defined in `global.css` and used throughout the app.

## Next Steps

After saving the logo:
1. ✅ Test on all pages
2. ✅ Check mobile responsiveness
3. ✅ Verify accessibility (alt text is already added)
4. ✅ Test social media sharing (logo should appear in previews)
5. ✅ Confirm favicon appears in browser tab

## Files Already Updated

All components have been updated to use the new logo:
- ✅ `web-kartavya/src/components/Layout.js`
- ✅ `web-kartavya/src/pages/SplashScreen.js`
- ✅ `web-kartavya/src/pages/Login.js`
- ✅ `web-kartavya/src/pages/Register.js`
- ✅ `web-kartavya/src/pages/Onboarding.js`
- ✅ `web-kartavya/public/index.html`

Just save the logo image and you're ready to go! 🎉
