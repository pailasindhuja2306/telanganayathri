# 🚗 Telangana Yatri - Mobility Super App

A world-class, cross-platform mobility super-app built with React Native (Expo) for Telangana. Combining ride-hailing, women-safety features, tourism packages, and comprehensive transport services.

## ✨ Features

### 🎯 Core Services
- **Ride Now** - Instant bike, auto, cab, and EV rides
- **She-Yatri** - Women-only rides with verified female drivers
- **EV Rides** - Eco-friendly electric vehicle options
- **Book Driver** - Hourly driver booking (3-12 hours)
- **Tour Packages** - Curated Telangana tourism experiences
- **Intercity Share** - Share rides between cities
- **Parcel & Logistics** - Quick delivery services
- **Bus/Bulk Transport** - Event and group travel booking

### 🛡️ Safety Features
- ✅ Verified drivers with background checks
- 📍 Real-time live tracking
- 🚨 One-tap SOS emergency button
- 👥 Share trip details with family/friends
- 📞 24/7 customer support
- 👩 Women-only mode with female drivers

### 🎨 Design Highlights
- Clean, modern, trustworthy UI
- Telangana-inspired color palette (Deep Green #0F3D2E)
- Micro-interactions and smooth animations
- Intuitive navigation (minimum taps)
- Dark mode ready architecture
- Indian UX patterns optimized

## 🛠️ Tech Stack

- **Framework**: React Native (Expo SDK 51)
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Animations**: React Native Reanimated + Gesture Handler
- **Gradients**: Expo Linear Gradient
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Hooks (expandable to Redux/Zustand)

## 📁 Project Structure

```
telangana-yatri/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── Input.tsx
│   │   ├── SafetyBar.tsx
│   │   └── DriverCard.tsx
│   ├── screens/
│   │   ├── auth/           # Authentication flows
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RoleSelectorScreen.tsx
│   │   ├── main/           # Main app screens
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── BookingsScreen.tsx
│   │   │   ├── ActivityScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── ride/           # Ride booking flows
│   │   ├── tour/           # Tourism packages
│   │   ├── women/          # She-Yatri women-only mode
│   │   └── driver/         # Driver booking
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── theme/             # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── types/             # TypeScript types
│   └── utils/             # Helper functions
├── App.tsx
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio/Emulator

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on specific platform**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web browser
   ```

### Using Expo Go
1. Install Expo Go app on your phone
2. Scan the QR code from terminal
3. App will load on your device

## 🎨 Design System

### Color Palette
- **Primary**: Deep Green (#0F3D2E) - Telangana identity
- **Secondary**: Warm Yellow (#F4C430)
- **Accent EV**: EV Green (#3DDC84)
- **Women Mode**: Soft Purple (#8B5CF6)
- **Background**: Off-White/Light Grey

### Typography
- Headings: Semi-bold, clean
- Body: Readable with Indian language support
- Proper spacing and line heights

### Components
All components follow:
- Rounded corners (12-20px)
- Soft shadows for depth
- Large tap areas (48px minimum)
- Consistent spacing using 4px grid

## 🎯 Key Screens

### 1. Authentication Flow
- **Splash Screen**: Branded intro with safety tagline
- **Login Screen**: Mobile + OTP authentication
- **Role Selector**: Choose Rider or Driver

### 2. Home Screen
- Safety bar with SOS button
- Quick action banner
- Service tiles grid (8 services)
- Safety features showcase

### 3. Ride Booking
- Location picker (pickup/drop)
- Vehicle selection (Bike/Auto/Cab/EV)
- Price breakdown
- Driver details

### 4. Women-Only Mode (She-Yatri)
- Purple-themed safe environment
- Women drivers only
- Enhanced safety features
- Verification badges

### 5. Tour Packages
- Curated Telangana tours
- Duration-based packages
- Places preview
- Fixed pricing

### 6. Driver Booking
- Hourly slot selection (3-12 hrs)
- Use case scenarios
- Professional drivers
- Transparent pricing

## 🔐 Safety Features

- Background verification of all drivers
- Real-time GPS tracking
- Emergency SOS with one tap
- Share trip functionality
- 24/7 support access
- Women-only ride option
- In-app safety center

## 🎭 User Roles

### Rider
- Book all services
- Track rides
- Rate drivers
- Safety features access

### Driver
- Accept ride requests
- Navigate with in-app GPS
- Earnings dashboard
- Performance metrics

## 📱 Platform Support

- ✅ iOS 13+
- ✅ Android 6.0+
- ✅ Web (responsive)

## 🌟 Future Enhancements

- [ ] Backend API integration
- [ ] Payment gateway (UPI, Cards, Wallets)
- [ ] Real-time map integration (Google Maps/Mapbox)
- [ ] Push notifications
- [ ] Multi-language support (Telugu, Hindi, English)
- [ ] Ride scheduling
- [ ] Loyalty rewards program
- [ ] AI-based pricing
- [ ] Voice commands
- [ ] Offline mode

## 📄 License

This project is a demonstration application. All rights reserved.

## 🤝 Contributing

This is a demonstration project. For production deployment, ensure:
- Backend API integration
- Real payment gateway setup
- Proper authentication & authorization
- Legal compliance with transport regulations
- Insurance and liability coverage

## 📧 Contact

For inquiries about Telangana Yatri:
- Email: support@telanganayatri.com
- Website: www.telanganayatri.com

---

**Built with ❤️ for Telangana's mobility needs**

*Safe. Secure. Trusted.*
