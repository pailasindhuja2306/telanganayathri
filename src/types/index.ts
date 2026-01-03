export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  RoleSelector: undefined;
  MainApp: undefined;
  DriverApp: undefined;
  IntercityApp: undefined;
  LogisticsApp: undefined;
  CustomerOnboarding: undefined;
  CityDriverOnboarding: undefined;
  IntercityOnboarding: undefined;
  LogisticsOnboarding: undefined;
  DriverOnboarding: undefined;
  RideBooking: undefined;
  RideDetails: { rideType: string };
  RideTracking: { rideId?: string } | undefined;
  TourPackages: undefined;
  TourDetails: { packageId: string };
  WomenMode: undefined;
  DriverBooking: undefined;
  VehicleRental: undefined;
  ParcelService: undefined;
  BusBooking: undefined;
  IntercityBooking: undefined;
  ProfileSetup: undefined;
  RideInProgress: { rideId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Activity: undefined;
  Profile: undefined;
};

export type UserRole = 'rider' | 'driver';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  isWoman?: boolean;
}
