# 🚀 Quick Start Commands

## First Time Setup

```bash
# Navigate to project
cd "Telangana Yatri"

# Install dependencies (this will take a few minutes)
npm install

# Start the app
npm start
```

## Daily Development

```bash
# Start development server
npm start

# Or directly run on platform
npm run android   # Android
npm run ios       # iOS (Mac only)
npm run web       # Web browser
```

## Useful Commands

```bash
# Clear cache and restart
npm start -- --clear

# Type checking
npm run tsc

# Check for issues
npm audit

# Update dependencies
npm update
```

## Testing on Device

### Android
1. Enable USB Debugging on your Android device
2. Connect via USB
3. Run: `npm run android`

### iOS (Mac only)
1. Open Xcode and install iOS Simulator
2. Run: `npm run ios`

### Physical Device (Easiest)
1. Install Expo Go app on your phone
2. Run: `npm start`
3. Scan QR code with Expo Go

## Troubleshooting

```bash
# If you see Metro bundler errors
npm start -- --reset-cache

# If node_modules is corrupted
rm -rf node_modules
npm install

# If iOS build fails
cd ios && pod install && cd ..

# If Android build fails
cd android && ./gradlew clean && cd ..
```

## Environment Setup (Optional)

Create `.env` file:
```
API_BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_key_here
```

## Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK (Android)
eas build -p android --profile preview

# Build IPA (iOS)
eas build -p ios --profile preview
```

## Project Structure Quick Reference

```
src/
├── components/     # Reusable UI components
├── screens/        # All app screens
│   ├── auth/      # Login, Splash, Role Selector
│   ├── main/      # Home, Bookings, Activity, Profile
│   ├── ride/      # Ride booking flow
│   ├── tour/      # Tour packages
│   ├── women/     # She-Yatri mode
│   └── driver/    # Driver booking
├── navigation/     # App navigation setup
├── theme/         # Design system (colors, spacing, etc.)
├── types/         # TypeScript definitions
└── services/      # API services (add later)
```

## Quick Tips

1. **Hot Reloading**: Save any file to see changes instantly
2. **Shake Device**: Opens developer menu on physical device
3. **Press 'r'**: Reload app in terminal
4. **Press 'm'**: Toggle menu
5. **Use 'console.log()'**: For debugging

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm start`
3. ✅ Scan QR code with Expo Go
4. ✅ Explore the app!
5. 📖 Read `README.md` for full documentation
6. 🎨 Check `DESIGN_GUIDE.md` for design system
7. 🔌 See `API_INTEGRATION.md` when ready for backend

## Need Help?

- 📧 Documentation: See `README.md`
- 🎨 Design: See `DESIGN_GUIDE.md`
- 🔧 Setup: See `SETUP.md`
- 🔌 API: See `API_INTEGRATION.md`
- ✨ Features: See `FEATURES.md`

---

**Happy Building! 🎉**
