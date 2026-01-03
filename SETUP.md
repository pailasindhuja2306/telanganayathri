# 🚀 Telangana Yatri - Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd "Telangana Yatri"
npm install
```

## Step 2: Start Development Server

```bash
npm start
```

This will open Expo Dev Tools in your browser.

## Step 3: Run on Your Device

### Option A: Physical Device (Recommended)
1. Install **Expo Go** app from:
   - iOS: App Store
   - Android: Play Store

2. Scan the QR code shown in terminal or browser
3. App will load automatically

### Option B: iOS Simulator (Mac Only)
```bash
npm run ios
```

### Option C: Android Emulator
1. Install Android Studio
2. Set up an Android Virtual Device (AVD)
3. Run:
```bash
npm run android
```

### Option D: Web Browser
```bash
npm run web
```

## 📱 Testing the App

### Authentication Flow
1. App starts with **Splash Screen** (3 seconds)
2. Navigate to **Login Screen**
3. Enter any 10-digit phone number
4. Click "Send OTP"
5. Enter any 6-digit OTP
6. Click "Verify & Continue"
7. Select **Rider** or **Driver** role
8. You'll land on the **Home Screen**

### Explore Features
- **Home Tab**: Browse all 8 services
- **Ride Now**: Book instant rides
- **She-Yatri**: Women-only safe rides
- **Tour Packages**: Browse Telangana tours
- **Book Driver**: Hourly driver booking

## 🎨 Customization

### Change Brand Colors
Edit `src/theme/colors.ts`:
```typescript
primary: {
  main: '#0F3D2E',  // Your brand color
}
```

### Modify Services
Edit service tiles in `src/screens/main/HomeScreen.tsx`

### Add New Screens
1. Create screen file in appropriate folder
2. Add route in `src/navigation/AppNavigator.tsx`
3. Add TypeScript type in `src/types/index.ts`

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --clear
```

### iOS Build Issues
```bash
cd ios
pod install
cd ..
npm run ios
```

### Android Build Issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### TypeScript Errors
```bash
npm run tsc
```

## 📦 Build for Production

### Android APK
```bash
eas build -p android --profile preview
```

### iOS IPA
```bash
eas build -p ios --profile preview
```

Note: Requires Expo EAS account (free tier available)

## 🔧 Development Tips

### Hot Reloading
- Press `r` in terminal to reload
- Press `m` to toggle menu
- Shake device to open developer menu

### Debugging
- Use React Native Debugger
- Enable "Debug JS Remotely" in dev menu
- Use `console.log()` for quick debugging

### Performance
- Use React DevTools for component inspection
- Profile with Flipper for advanced debugging

## 📚 Project Resources

### Key Files
- `App.tsx` - Entry point
- `src/navigation/AppNavigator.tsx` - Navigation setup
- `src/theme/index.ts` - Design system
- `src/components/` - Reusable components

### Important Packages
- `react-navigation` - Navigation
- `react-native-reanimated` - Animations
- `expo-linear-gradient` - Gradients
- `@expo/vector-icons` - Icons

## 🎯 Next Steps

1. **Backend Integration**
   - Set up REST API or GraphQL
   - Implement real authentication
   - Add database for user data

2. **Maps Integration**
   - Google Maps API
   - Real-time location tracking
   - Route optimization

3. **Payment Gateway**
   - Razorpay / Stripe integration
   - UPI payments
   - Wallet functionality

4. **Push Notifications**
   - Firebase Cloud Messaging
   - Ride status updates
   - Promotional alerts

5. **Analytics**
   - Google Analytics
   - Crashlytics
   - User behavior tracking

## 💡 Pro Tips

- Test on real devices for accurate performance
- Use Expo's Over-The-Air (OTA) updates
- Follow React Native best practices
- Keep dependencies updated
- Use TypeScript for type safety

## 📞 Need Help?

- Expo Docs: https://docs.expo.dev
- React Navigation: https://reactnavigation.org
- React Native: https://reactnative.dev

---

**Happy Coding! 🎉**

Build the best mobility app on Earth! 🚀
