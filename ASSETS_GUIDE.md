# 📁 Assets Guide - Telangana Yatri

## 🎨 Required Assets (To Be Added)

### App Icons

#### icon.png
- Size: 1024x1024px
- Format: PNG with transparency
- Content: App logo with Telangana Yatri branding
- Color: Deep Green (#0F3D2E) primary
- Location: `assets/icon.png`

#### adaptive-icon.png (Android)
- Size: 1024x1024px
- Safe zone: Central 816x816px
- Background: Deep Green
- Foreground: Logo/Car icon
- Location: `assets/adaptive-icon.png`

#### favicon.png (Web)
- Size: 48x48px
- Format: PNG
- Location: `assets/favicon.png`

### Splash Screen

#### splash.png
- Size: 2048x2048px minimum
- Background: Deep Green (#0F3D2E)
- Logo: Centered, white/yellow
- Text: "Telangana Yatri" + tagline
- Location: `assets/splash.png`

## 🖼️ Image Assets Needed

### Tour Package Images
```
assets/images/tours/
├── heritage.jpg       (Charminar, historical sites)
├── filmcity.jpg       (Ramoji Film City)
├── spiritual.jpg      (Temples)
└── shopping.jpg       (Markets, bazaars)
```

Specs:
- Size: 1200x800px
- Format: JPG (optimized)
- Quality: 85%

### Service Icons (Optional - Using Ionicons)
If custom icons needed:
```
assets/icons/
├── ride.svg
├── women.svg
├── ev.svg
├── tour.svg
├── driver.svg
├── intercity.svg
├── parcel.svg
└── bus.svg
```

Specs:
- Size: 64x64px
- Format: SVG (vector)
- Style: Outline, consistent stroke

### Placeholder Images

#### User Avatar Placeholder
```javascript
// Currently using Ionicons "person"
// Can replace with custom image
assets/images/avatar-placeholder.png
```
- Size: 200x200px
- Format: PNG
- Content: Generic person silhouette

#### Vehicle Placeholders
```
assets/images/vehicles/
├── bike.png
├── auto.png
├── cab.png
└── ev.png
```
- Size: 400x300px
- Format: PNG with transparency

#### Map Placeholder
```
assets/images/map-placeholder.png
```
- Size: 800x400px
- Shows generic map illustration

## 🎭 Brand Assets

### Logo Variations

#### Primary Logo
```
assets/branding/logo-primary.png
```
- Full color logo
- Size: 512x512px
- PNG with transparency

#### Logo White
```
assets/branding/logo-white.png
```
- For dark backgrounds
- Size: 512x512px
- White version

#### Logo Horizontal
```
assets/branding/logo-horizontal.png
```
- Text + icon side by side
- Size: 1000x300px
- For headers/banners

### Safety Badges
```
assets/badges/
├── verified.png       (Checkmark badge)
├── safe.png          (Shield badge)
└── women-driver.png  (Women-only indicator)
```

## 🎨 Creating Assets

### Using Figma (Recommended)
1. Design at @3x resolution
2. Export as PNG (iOS) and WebP (Android)
3. Use Asset Export plugin for multiple sizes

### Using Canva (Easier)
1. Create 1024x1024px canvas
2. Use brand colors:
   - Primary: #0F3D2E
   - Secondary: #F4C430
3. Export as PNG

### Online Tools
- **App Icon Generator**: appicon.co
- **Splash Screen**: apetools.webprofusion.com
- **Image Optimization**: tinypng.com

## 📐 Size Guidelines

### iOS Sizes (automatically generated)
- 1024x1024 (App Store)
- 180x180 (iPhone)
- 167x167 (iPad Pro)
- 152x152 (iPad)
- 120x120 (iPhone)
- 87x87 (iPhone)
- 80x80 (iPad)
- 76x76 (iPad)
- 60x60 (iPhone)
- 58x58 (iPhone)
- 40x40 (iPad/iPhone)
- 29x29 (iPhone)
- 20x20 (iPhone)

### Android Sizes (automatically generated)
- xxxhdpi: 192x192
- xxhdpi: 144x144
- xhdpi: 96x96
- hdpi: 72x72
- mdpi: 48x48

## 🖼️ Current Placeholder Strategy

Currently the app uses:
- **Ionicons** for all icons (no custom assets needed)
- **Gradients** for backgrounds
- **Colors** for visual appeal
- **Placeholders** for images (grey boxes with icons)

This allows the app to run immediately without custom assets!

## ✅ Quick Start (No Assets Needed)

The app is ready to run with:
- ✅ Vector icons (Ionicons)
- ✅ Solid colors and gradients
- ✅ Default Expo icon/splash (temporary)

When ready for production:
1. Create app icon (1024x1024)
2. Create splash screen (2048x2048)
3. Replace in `assets/` folder
4. Run `expo prebuild` to generate platform assets

## 🎨 Asset Creation Tools

### Free Tools
- **Figma**: figma.com (Design)
- **Canva**: canva.com (Quick design)
- **Photopea**: photopea.com (Photoshop alternative)
- **GIMP**: gimp.org (Free Photoshop)
- **Inkscape**: inkscape.org (Vector graphics)

### Paid Tools
- Adobe Photoshop (Industry standard)
- Adobe Illustrator (Vector graphics)
- Sketch (Mac only, UI design)
- Affinity Designer (One-time purchase)

## 📋 Asset Checklist

Before Production:
- [ ] App icon (1024x1024)
- [ ] Splash screen (2048x2048)
- [ ] Adaptive icon (Android)
- [ ] Tour package photos (4-8 images)
- [ ] Vehicle photos/illustrations (4 types)
- [ ] Logo files (primary, white, horizontal)
- [ ] Safety badges
- [ ] Optimize all images (TinyPNG)
- [ ] Test on multiple devices

## 🔧 Adding Assets to Project

### 1. Icon & Splash
```bash
# Place files in assets/ folder
assets/
├── icon.png          (1024x1024)
├── splash.png        (2048x2048)
├── adaptive-icon.png (1024x1024)
└── favicon.png       (48x48)

# Update app.json (already configured)
# Run to generate platform assets
expo prebuild
```

### 2. Custom Images
```typescript
// In React Native
import { Image } from 'react-native';

<Image 
  source={require('../../assets/images/tours/heritage.jpg')}
  style={{ width: 200, height: 150 }}
  resizeMode="cover"
/>
```

### 3. SVG Icons (if needed)
```bash
# Install SVG support
expo install react-native-svg

# Use custom SVG
import Logo from '../../assets/icons/logo.svg';
<Logo width={50} height={50} />
```

## 💡 Pro Tips

1. **Optimize Images**: Use TinyPNG before adding to project
2. **Use WebP**: Better compression for Android
3. **Lazy Load**: Load images only when needed
4. **Cache**: Use FastImage for better performance
5. **CDN**: Store large images on CDN, not in app bundle

## 📦 Image Optimization

```bash
# Install image optimizer
npm install -g imageoptim-cli

# Optimize all images
imageoptim --directory assets/images
```

## 🎨 Design Resources

### Free Stock Photos
- Unsplash (unsplash.com)
- Pexels (pexels.com)
- Pixabay (pixabay.com)

### Icon Libraries
- Ionicons (current - included)
- Font Awesome
- Material Icons
- Feather Icons

### Illustrations
- unDraw (undraw.co)
- Storyset (storyset.com)
- DrawKit (drawkit.com)

---

## 🚀 For Now

**The app works perfectly with default assets and Ionicons!**

Add custom assets when:
- Preparing for App Store/Play Store
- Branding is finalized
- Production release ready

---

**Start building first, polish assets later! 🎨**
