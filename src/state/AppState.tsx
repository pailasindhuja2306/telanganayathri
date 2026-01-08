import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RoleKey = 'customer' | 'cityDriver' | 'intercityDriver' | 'logistics';

export interface Booking {
  id: string;
  type: 'ride' | 'driver' | 'vehicle' | 'tour';
  status: 'active' | 'completed' | 'cancelled';
  vehicleName: string;
  pickupAddress: string;
  dropAddress?: string;
  price: number;
  distance?: number;
  date: string;
  time: string;
}

interface AppState {
  language: 'en' | 'te' | 'ur';
  setLanguage: (l: 'en' | 'te' | 'ur') => void;
  phone?: string;
  setPhone: (p: string) => void;
  profile: { name?: string; gender?: 'male' | 'female' | 'other' };
  setProfile: (p: Partial<{ name?: string; gender?: 'male' | 'female' | 'other' }>) => void;
  // auth token persisted across sessions
  token?: string;
  setToken: (t?: string) => Promise<void>;
  // derived
  isProfileComplete: boolean;
  // selected cab type (e.g., 'cab-ac')
  selectedCabType?: string;
  setSelectedCabType: (t?: string) => void;
  verified: Record<RoleKey, boolean>;
  verifyRole: (r: RoleKey) => void;
  logout: () => void;
  // bookings
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'date' | 'time'>) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: 'active' | 'completed' | 'cancelled') => Promise<void>;
  // activities (completed bookings)
  activities: Booking[];
}

const Ctx = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te' | 'ur'>('en');
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [profile, setProfileState] = useState<{ name?: string; gender?: 'male' | 'female' | 'other' }>({});
  const [token, setTokenState] = useState<string | undefined>(undefined);
  const [selectedCabType, setSelectedCabTypeState] = useState<string | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [verified, setVerified] = useState<Record<RoleKey, boolean>>({
    customer: false,
    cityDriver: false,
    intercityDriver: false,
    logistics: false,
  });

  const STORAGE_KEYS = {
    token: 'TY_AUTH_TOKEN',
    profile: 'TY_USER_PROFILE',
    bookings: 'TY_BOOKINGS',
  };

  // Load persisted auth/profile on mount
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedProfile, storedBookings] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.token),
          AsyncStorage.getItem(STORAGE_KEYS.profile),
          AsyncStorage.getItem(STORAGE_KEYS.bookings),
        ]);
        if (storedToken) setTokenState(storedToken);
        if (storedProfile) {
          setProfileState(JSON.parse(storedProfile));
        }
        if (storedBookings) {
          setBookings(JSON.parse(storedBookings));
        }
      } catch (err) {
        // ignore
        console.warn('Failed to load auth from storage', err);
      }
    })();
  }, []);

  const verifyRole = (r: RoleKey) => setVerified((v) => ({ ...v, [r]: true }));
  const setProfile = (p: Partial<{ name?: string; gender?: 'male' | 'female' | 'other' }>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...p };
      try {
        AsyncStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(next));
      } catch (err) {
        console.warn('Failed to persist profile', err);
      }
      return next;
    });
  };

  const setToken = async (t?: string) => {
    try {
      if (t) {
        await AsyncStorage.setItem(STORAGE_KEYS.token, t);
        setTokenState(t);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.token);
        setTokenState(undefined);
      }
    } catch (err) {
      console.warn('Failed to persist token', err);
    }
  };

  const setSelectedCabType = (t?: string) => {
    setSelectedCabTypeState(t);
  };

  const addBooking = async (booking: Omit<Booking, 'id' | 'date' | 'time'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updatedBookings));
    } catch (err) {
      console.warn('Failed to persist bookings', err);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'active' | 'completed' | 'cancelled') => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updatedBookings));
    } catch (err) {
      console.warn('Failed to update booking status', err);
    }
  };

  const activities = useMemo(() => {
    return bookings.filter(booking => booking.status === 'completed');
  }, [bookings]);

  const logout = useCallback(async () => {
    setPhone(undefined);
    setProfileState({});
    setVerified({
      customer: false,
      cityDriver: false,
      intercityDriver: false,
      logistics: false,
    });
    setBookings([]);
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.token,
        STORAGE_KEYS.profile,
        STORAGE_KEYS.bookings,
      ]);
      setTokenState(undefined);
      // clear transient app state (ride selection etc.)
      setSelectedCabTypeState(undefined);
    } catch (err) {
      console.warn('Failed to clear storage during logout', err);
    }
  }, []);

  const isProfileComplete = Boolean(profile && profile.name && profile.name.trim().length > 0);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      phone,
      setPhone,
      profile,
      setProfile,
      token,
      setToken,
      isProfileComplete,
      selectedCabType,
      setSelectedCabType,
      verified,
      verifyRole,
      logout,
      bookings,
      addBooking,
      updateBookingStatus,
      activities,
    }),
    [language, phone, profile, token, isProfileComplete, selectedCabType, verified, logout, bookings, activities]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAppState = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used within AppStateProvider');
  return v;
};
