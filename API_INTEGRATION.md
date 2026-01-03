# 🔌 Telangana Yatri - Backend Integration Guide

## 🏗️ Architecture Overview

The app is built with a clean separation between UI and data layers, making backend integration straightforward.

```
┌─────────────────────────────────────┐
│         React Native UI             │
├─────────────────────────────────────┤
│      API Service Layer (To Add)     │
├─────────────────────────────────────┤
│   State Management (Context/Redux)  │
├─────────────────────────────────────┤
│         REST/GraphQL API            │
├─────────────────────────────────────┤
│         Backend Server              │
└─────────────────────────────────────┘
```

## 📋 Required API Endpoints

### 1. Authentication APIs

#### Send OTP
```typescript
POST /api/auth/send-otp
Body: {
  phoneNumber: string; // "+91XXXXXXXXXX"
}
Response: {
  success: boolean;
  message: string;
  expiresIn: number; // seconds
}
```

#### Verify OTP
```typescript
POST /api/auth/verify-otp
Body: {
  phoneNumber: string;
  otp: string;
}
Response: {
  success: boolean;
  token: string; // JWT
  user: {
    id: string;
    phoneNumber: string;
    name?: string;
    role?: 'rider' | 'driver';
  }
}
```

#### Update User Role
```typescript
PATCH /api/auth/role
Headers: { Authorization: "Bearer <token>" }
Body: {
  role: 'rider' | 'driver';
}
Response: {
  success: boolean;
  user: User;
}
```

### 2. User Profile APIs

#### Get Profile
```typescript
GET /api/user/profile
Headers: { Authorization: "Bearer <token>" }
Response: {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  avatar?: string;
  role: 'rider' | 'driver';
  verified: boolean;
  rating?: number;
  totalTrips: number;
}
```

#### Update Profile
```typescript
PUT /api/user/profile
Body: {
  name?: string;
  email?: string;
  avatar?: string;
}
```

### 3. Ride Booking APIs

#### Get Vehicle Types & Pricing
```typescript
GET /api/rides/vehicles
Query: {
  pickup: { lat: number, lng: number };
  destination: { lat: number, lng: number };
}
Response: {
  vehicles: [
    {
      id: string;
      type: 'bike' | 'auto' | 'cab' | 'ev';
      name: string;
      capacity: number;
      baseFare: number;
      perKm: number;
      estimatedFare: number;
      eta: number; // minutes
      available: boolean;
    }
  ]
}
```

#### Create Ride Booking
```typescript
POST /api/rides/book
Body: {
  vehicleTypeId: string;
  pickup: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  scheduledTime?: string; // ISO timestamp
  womenOnly?: boolean;
}
Response: {
  rideId: string;
  status: 'pending' | 'accepted' | 'arrived' | 'in_progress' | 'completed';
  driver?: Driver;
  estimatedArrival: string;
  fare: number;
}
```

#### Get Ride Status
```typescript
GET /api/rides/:rideId
Response: {
  id: string;
  status: RideStatus;
  driver?: {
    id: string;
    name: string;
    photo: string;
    rating: number;
    phoneNumber: string;
    vehicle: {
      model: string;
      number: string;
      color: string;
    }
  };
  currentLocation?: { lat: number; lng: number };
  estimatedArrival?: string;
  fare: {
    base: number;
    distance: number;
    time: number;
    taxes: number;
    total: number;
  };
}
```

#### Cancel Ride
```typescript
POST /api/rides/:rideId/cancel
Body: {
  reason: string;
}
```

### 4. Tour Package APIs

#### Get All Packages
```typescript
GET /api/tours/packages
Response: {
  packages: [
    {
      id: string;
      title: string;
      description: string;
      duration: number; // hours
      price: number;
      places: string[];
      images: string[];
      rating: number;
      totalBookings: number;
      popular: boolean;
    }
  ]
}
```

#### Book Tour Package
```typescript
POST /api/tours/book
Body: {
  packageId: string;
  date: string; // ISO date
  passengers: number;
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}
```

### 5. Driver Booking APIs (Hourly)

#### Get Hourly Rates
```typescript
GET /api/driver-booking/rates
Response: {
  rates: [
    { hours: 3, price: 899 },
    { hours: 4, price: 1199 },
    { hours: 6, price: 1699 },
    { hours: 8, price: 2199 },
    { hours: 10, price: 2699 },
    { hours: 12, price: 3199 }
  ]
}
```

#### Book Driver
```typescript
POST /api/driver-booking/book
Body: {
  duration: number; // hours
  pickupLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  startTime: string; // ISO timestamp
  vehicleType?: string;
}
```

### 6. Women-Only Mode APIs

#### Get Women Drivers
```typescript
GET /api/women/drivers
Query: {
  location: { lat: number, lng: number };
}
Response: {
  drivers: [
    {
      id: string;
      name: string;
      photo: string;
      rating: number;
      totalTrips: number;
      vehicle: Vehicle;
      verified: boolean;
      backgroundCheck: boolean;
    }
  ]
}
```

### 7. Location & Maps APIs

#### Geocode Address
```typescript
GET /api/location/geocode
Query: { address: string }
Response: {
  lat: number;
  lng: number;
  formattedAddress: string;
}
```

#### Reverse Geocode
```typescript
GET /api/location/reverse-geocode
Query: { lat: number, lng: number }
Response: {
  address: string;
  city: string;
  state: string;
  pincode: string;
}
```

#### Calculate Distance
```typescript
POST /api/location/distance
Body: {
  origin: { lat: number, lng: number };
  destination: { lat: number, lng: number };
}
Response: {
  distance: number; // meters
  duration: number; // seconds
  route: { lat: number; lng: number }[];
}
```

### 8. Payment APIs

#### Get Payment Methods
```typescript
GET /api/payments/methods
Response: {
  methods: [
    { id: string, type: 'upi' | 'card' | 'wallet', details: any }
  ]
}
```

#### Create Payment
```typescript
POST /api/payments/create
Body: {
  rideId: string;
  amount: number;
  method: string;
}
Response: {
  paymentId: string;
  status: 'pending' | 'success' | 'failed';
  transactionId?: string;
}
```

### 9. Emergency & Safety APIs

#### Trigger SOS
```typescript
POST /api/safety/sos
Body: {
  rideId: string;
  location: { lat: number, lng: number };
  emergency: boolean;
}
Response: {
  alertId: string;
  authorities: string[];
  emergencyContacts: string[];
}
```

#### Share Trip
```typescript
POST /api/safety/share-trip
Body: {
  rideId: string;
  contacts: string[]; // phone numbers
}
```

### 10. Notifications APIs

#### Get Notifications
```typescript
GET /api/notifications
Response: {
  notifications: [
    {
      id: string;
      title: string;
      message: string;
      type: 'ride' | 'payment' | 'promo' | 'alert';
      read: boolean;
      createdAt: string;
    }
  ]
}
```

#### Mark as Read
```typescript
PATCH /api/notifications/:id/read
```

## 🔧 Implementation Guide

### Step 1: Create API Service

Create `src/services/api.ts`:

```typescript
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.telanganayatri.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // From storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Step 2: Create Service Modules

Create `src/services/auth.service.ts`:

```typescript
import apiClient from './api';

export const authService = {
  sendOTP: async (phoneNumber: string) => {
    return apiClient.post('/auth/send-otp', { phoneNumber });
  },

  verifyOTP: async (phoneNumber: string, otp: string) => {
    return apiClient.post('/auth/verify-otp', { phoneNumber, otp });
  },

  updateRole: async (role: 'rider' | 'driver') => {
    return apiClient.patch('/auth/role', { role });
  },
};
```

Create `src/services/ride.service.ts`:

```typescript
export const rideService = {
  getVehicles: async (pickup: Location, destination: Location) => {
    return apiClient.get('/rides/vehicles', {
      params: { pickup, destination },
    });
  },

  bookRide: async (bookingData: RideBookingData) => {
    return apiClient.post('/rides/book', bookingData);
  },

  getRideStatus: async (rideId: string) => {
    return apiClient.get(`/rides/${rideId}`);
  },

  cancelRide: async (rideId: string, reason: string) => {
    return apiClient.post(`/rides/${rideId}/cancel`, { reason });
  },
};
```

### Step 3: Update Screens

Update `LoginScreen.tsx`:

```typescript
import { authService } from '../../services/auth.service';

const handleSendOTP = async () => {
  try {
    setLoading(true);
    const response = await authService.sendOTP(phoneNumber);
    if (response.success) {
      setOtpSent(true);
      Alert.alert('Success', 'OTP sent to your mobile');
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to send OTP');
  } finally {
    setLoading(false);
  }
};
```

### Step 4: Add State Management

Create `src/context/AuthContext.tsx`:

```typescript
import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (token: string, user: User) => {
    setToken(token);
    setUser(user);
    await AsyncStorage.setItem('authToken', token);
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### Step 5: Add WebSocket for Real-time Updates

Create `src/services/websocket.service.ts`:

```typescript
import io from 'socket.io-client';

class WebSocketService {
  private socket: any;

  connect(token: string) {
    this.socket = io('wss://api.telanganayatri.com', {
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('ride-update', (data: any) => {
      // Handle ride status updates
    });

    this.socket.on('driver-location', (location: any) => {
      // Handle driver location updates
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  subscribeToRide(rideId: string) {
    this.socket.emit('subscribe-ride', rideId);
  }
}

export default new WebSocketService();
```

## 🔐 Security Best Practices

### 1. Token Storage
```typescript
// Use SecureStore for tokens
import * as SecureStore from 'expo-secure-store';

async function saveToken(token: string) {
  await SecureStore.setItemAsync('authToken', token);
}

async function getToken() {
  return await SecureStore.getItemAsync('authToken');
}
```

### 2. API Key Management
```bash
# Use environment variables
# Create .env file (add to .gitignore)
API_BASE_URL=https://api.telanganayatri.com
GOOGLE_MAPS_API_KEY=your_key_here
```

### 3. Request Encryption
```typescript
// Add request encryption for sensitive data
import CryptoJS from 'crypto-js';

const encryptData = (data: any, key: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};
```

## 📊 Error Handling

Create `src/utils/errorHandler.ts`:

```typescript
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You do not have permission for this action.';
      case 404:
        return 'Requested resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data?.message || 'Something went wrong.';
    }
  } else if (error.request) {
    // No response received
    return 'Network error. Please check your connection.';
  } else {
    return 'An unexpected error occurred.';
  }
};
```

## 🧪 Testing APIs

### Using Postman
1. Import collection (create from endpoints above)
2. Set environment variables
3. Test each endpoint
4. Save responses for mock data

### Mock Data During Development
```typescript
// src/services/mock.ts
export const mockRideData = {
  vehicles: [
    { id: '1', type: 'bike', name: 'Bike', price: 45 },
    // ... more
  ],
};

// Toggle mock mode
const USE_MOCK_DATA = __DEV__ && false;
```

## 📱 Push Notifications

Install and configure:
```bash
expo install expo-notifications
```

Setup:
```typescript
import * as Notifications from 'expo-notifications';

// Configure
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push
const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    const token = await Notifications.getExpoPushTokenAsync();
    // Send token to backend
    await apiClient.post('/user/push-token', { token });
  }
};
```

## 🗺️ Maps Integration

### Google Maps Setup
```bash
expo install react-native-maps
```

Usage:
```typescript
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: 17.385,
    longitude: 78.4867,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{ latitude: pickup.lat, longitude: pickup.lng }}
    title="Pickup"
  />
</MapView>
```

---

## 📋 Checklist for Backend Integration

- [ ] Set up API base URL
- [ ] Implement authentication service
- [ ] Add token storage (SecureStore)
- [ ] Create API service layer
- [ ] Add error handling
- [ ] Implement state management
- [ ] Add WebSocket for real-time
- [ ] Set up push notifications
- [ ] Integrate maps
- [ ] Add payment gateway
- [ ] Implement analytics
- [ ] Set up crash reporting
- [ ] Add offline support
- [ ] Test all endpoints
- [ ] Handle edge cases
- [ ] Add loading states
- [ ] Implement retry logic

---

**The UI is ready. Now connect it to the world! 🌍**
