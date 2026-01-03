import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

// Import Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LanguageScreen from '../screens/auth/LanguageScreen';
import RoleSelectorScreen from '../screens/auth/RoleSelectorScreen';
import HomeScreen from '../screens/main/HomeScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import ActivityScreen from '../screens/main/ActivityScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import RideBookingScreen from '../screens/ride/RideBookingScreen';
import TourPackagesScreen from '../screens/tour/TourPackagesScreen';
import WomenModeScreen from '../screens/women/WomenModeScreen';
import DriverBookingScreen from '../screens/driver/DriverBookingScreen';
import VehicleRentalScreen from '../screens/main/VehicleRentalScreen';
import CustomerOnboardingScreen from '../screens/onboarding/CustomerOnboardingScreen';
import CityDriverOnboardingScreen from '../screens/onboarding/CityDriverOnboardingScreen';
import IntercityOnboardingScreen from '../screens/onboarding/IntercityOnboardingScreen';
import LogisticsOnboardingScreen from '../screens/onboarding/LogisticsOnboardingScreen';
import DriverHomeScreen from '../screens/driverapp/DriverHomeScreen';
import DriverRidesScreen from '../screens/driverapp/DriverRidesScreen';
import DriverEarningsScreen from '../screens/driverapp/DriverEarningsScreen';
import DriverProfileScreen from '../screens/driverapp/DriverProfileScreen';
import IntercityHomeScreen from '../screens/intercityapp/IntercityHomeScreen';
import LogisticsHomeScreen from '../screens/logisticsapp/LogisticsHomeScreen';
import RideTrackingScreen from '../screens/ride/RideTrackingScreen';

import { RootStackParamList, MainTabParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppState } from '../state/AppState';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.light,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.medium,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          tabBarLabel: 'Bookings',
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" size={size} color={color} />
          ),
          tabBarLabel: 'Activity',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

function DriverTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.light,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          ...theme.shadows.lg,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.xs,
          fontWeight: theme.fontWeights.medium,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DriverHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={DriverRidesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
          tabBarLabel: 'Rides',
        }}
      />
      <Tab.Screen
        name="Activity"
        component={DriverEarningsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" size={size} color={color} />
          ),
          tabBarLabel: 'Earnings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DriverProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { token, isProfileComplete } = useAppState();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyle: {
            flex: 1,
            ...(Platform.OS === 'web' ? {
              height: '100%',
              overflow: 'hidden',
            } : {}),
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Public / Auth screens (always registered) */}
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="RoleSelector" component={RoleSelectorScreen} />

        {/* Onboarding */}
        <Stack.Screen name="CustomerOnboarding" component={CustomerOnboardingScreen} />
        <Stack.Screen name="CityDriverOnboarding" component={CityDriverOnboardingScreen} />
        <Stack.Screen name="IntercityOnboarding" component={IntercityOnboardingScreen} />
        <Stack.Screen name="LogisticsOnboarding" component={LogisticsOnboardingScreen} />

        {/* Main app flows */}
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="DriverApp" component={DriverTabs} />
        <Stack.Screen name="IntercityApp" component={IntercityHomeScreen} />
        <Stack.Screen name="LogisticsApp" component={LogisticsHomeScreen} />
        <Stack.Screen name="RideBooking" component={RideBookingScreen} />
        <Stack.Screen name="RideTracking" component={RideTrackingScreen} />
        <Stack.Screen name="TourPackages" component={TourPackagesScreen} />
        <Stack.Screen name="WomenMode" component={WomenModeScreen} />
        <Stack.Screen name="DriverBooking" component={DriverBookingScreen} />
        <Stack.Screen name="VehicleRental" component={VehicleRentalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

