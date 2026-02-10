import React, { createContext, useCallback, useContext, useMemo, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

type RoleKey = 'customer' | 'cityDriver' | 'intercityDriver' | 'logistics';

export interface Booking {
  id: string;
  rideId?: string;
  type: 'ride' | 'driver' | 'vehicle' | 'tour';
  status: 'active' | 'completed' | 'cancelled';
  vehicleName: string;
  pickupAddress: string;
  dropAddress?: string;
  price: number;
  distance?: number;
  cancelReason?: string;
  date: string;
  time: string;
}

interface UserProfile {
  name?: string;
  gender?: 'male' | 'female' | 'other';
  rating?: number;
  totalRides?: number;
  referrals?: number;
  walletBalance?: number;
  offersCount?: number;
}

interface AppState {
  language: 'en' | 'te' | 'ur';
  setLanguage: (l: 'en' | 'te' | 'ur') => void;
  phone?: string;
  setPhone: (p: string) => void;
  profile: UserProfile;
  setProfile: (p: Partial<UserProfile>) => void;
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
  updateBookingStatus: (bookingId: string, status: 'active' | 'completed' | 'cancelled', cancelReason?: string) => Promise<void>;
  syncProfileFromRemote: () => Promise<boolean>;
  syncBookingsFromRemote: () => Promise<void>;
  // activities (completed bookings)
  activities: Booking[];
}

const Ctx = createContext<AppState | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te' | 'ur'>('en');
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [profile, setProfileState] = useState<UserProfile>({});
  const [token, setTokenState] = useState<string | undefined>(undefined);
  const [selectedCabType, setSelectedCabTypeState] = useState<string | undefined>(undefined);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [verified, setVerified] = useState<Record<RoleKey, boolean>>({
    customer: false,
    cityDriver: false,
    intercityDriver: false,
    logistics: false,
  });
  const userBookingsRef = useRef<Booking[]>([]);
  const rideBookingsRef = useRef<Booking[]>([]);
  const migrationUserRef = useRef<string | null>(null);

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
  const setProfile = (p: Partial<UserProfile>) => {
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

  const persistBookings = useCallback(async (updatedBookings: Booking[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updatedBookings));
    } catch (err) {
      console.warn('Failed to persist bookings', err);
    }
  }, []);

  const mergeAndPersistBookings = useCallback(async () => {
    const seen = new Set<string>();
    const merged = [...userBookingsRef.current, ...rideBookingsRef.current].filter((booking) => {
      const key = booking.rideId
        ? `ride:${booking.rideId}`
        : `${booking.type}|${booking.vehicleName}|${booking.pickupAddress}|${booking.dropAddress || ''}|${booking.price}|${booking.date}|${booking.time}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setBookings(merged);
    await persistBookings(merged);
  }, [persistBookings]);

  const migrateLocalProfileToRemote = useCallback(async (userId: string) => {
    try {
      if (!profile?.name && !profile?.gender && !phone) return;

      const userRef = doc(db, 'users', userId);
      const snap = await getDoc(userRef);
      const data = snap.exists() ? snap.data() : undefined;

      const payload: Record<string, unknown> = {};
      if (!data?.name && profile?.name) payload.name = profile.name;
      if (!data?.gender && profile?.gender) payload.gender = profile.gender;
      if (!data?.phone && phone) payload.phone = phone;
      if (Object.keys(payload).length === 0) return;

      payload.updatedAt = serverTimestamp();
      await setDoc(userRef, payload, { merge: true });
    } catch (err) {
      console.warn('Failed to migrate local profile', err);
    }
  }, [profile, phone]);

  const migrateLocalBookingsToRemote = useCallback(async (userId: string, local: Booking[]) => {
    try {
      if (!local.length) return;

      const existingSnap = await getDocs(collection(db, 'users', userId, 'bookings'));
      const existingIds = new Set(existingSnap.docs.map((docSnap) => docSnap.id));

      const writes = local
        .filter((booking) => !booking.id.startsWith('ride_') && !existingIds.has(booking.id))
        .map((booking) => {
          const bookingRef = doc(db, 'users', userId, 'bookings', booking.id);
          return setDoc(
            bookingRef,
            {
              ...booking,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        });

      await Promise.all(writes);
    } catch (err) {
      console.warn('Failed to migrate local bookings', err);
    }
  }, []);

  const addBooking = async (booking: Omit<Booking, 'id' | 'date' | 'time'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);

    await persistBookings(updatedBookings);

    try {
      const user = auth.currentUser;
      if (user) {
        const bookingRef = doc(db, 'users', user.uid, 'bookings', newBooking.id);
        await setDoc(
          bookingRef,
          {
            ...newBooking,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }
    } catch (err) {
      console.warn('Failed to sync booking to Firestore', err);
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    status: 'active' | 'completed' | 'cancelled',
    cancelReason?: string
  ) => {
    const target = bookings.find((booking) => booking.id === bookingId);
    const updatedBookings = bookings.map(booking => {
      if (booking.id !== bookingId) return booking;
      return {
        ...booking,
        status,
        cancelReason: status === 'cancelled' ? cancelReason : undefined,
      };
    });
    setBookings(updatedBookings);

    await persistBookings(updatedBookings);

    try {
      const user = auth.currentUser;
      const rideId = target?.rideId || (bookingId.startsWith('ride_') ? bookingId.replace('ride_', '') : undefined);
      const payload: Record<string, unknown> = {
        status,
        updatedAt: serverTimestamp(),
      };
      if (status === 'cancelled' && cancelReason) {
        payload.cancelReason = cancelReason;
      }

      if (rideId) {
        const rideRef = doc(db, 'rides', rideId);
        await setDoc(rideRef, payload, { merge: true });
      }
      if (user && !bookingId.startsWith('ride_')) {
        const bookingRef = doc(db, 'users', user.uid, 'bookings', bookingId);
        await setDoc(bookingRef, payload, { merge: true });
      }
    } catch (err) {
      console.warn('Failed to sync booking update to Firestore', err);
    }
  };

  const syncBookingsFromRemote = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const bookingsRef = collection(db, 'users', user.uid, 'bookings');
      const bookingsSnap = await getDocs(bookingsRef);
      const userBookings: Booking[] = bookingsSnap.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          rideId: typeof data?.rideId === 'string' ? data.rideId : undefined,
          type: data?.type || 'ride',
          status: data?.status || 'active',
          vehicleName: data?.vehicleName || '',
          pickupAddress: data?.pickupAddress || '',
          dropAddress: data?.dropAddress || undefined,
          price: typeof data?.price === 'number' ? data.price : 0,
          distance: typeof data?.distance === 'number' ? data.distance : undefined,
          cancelReason: data?.cancelReason || undefined,
          date: data?.date || '',
          time: data?.time || '',
        };
      });

      const ridesRef = collection(db, 'rides');
      const ridesSnap = await getDocs(query(ridesRef, where('userId', '==', user.uid)));
      const rideBookings: Booking[] = ridesSnap.docs.map((docSnap) => {
        const data = docSnap.data();
        const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate() : null;
        const date = createdAt ? createdAt.toLocaleDateString() : '';
        const time = createdAt ? createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        return {
          id: `ride_${docSnap.id}`,
          rideId: docSnap.id,
          type: 'ride',
          status: data?.status === 'completed' || data?.status === 'cancelled' ? data.status : 'active',
          vehicleName: data?.vehicle?.name || 'Vehicle',
          pickupAddress: data?.pickup?.address || '',
          dropAddress: data?.drop?.address || undefined,
          price: typeof data?.fareEstimate === 'number' ? data.fareEstimate : 0,
          distance: typeof data?.distanceKm === 'number' ? data.distanceKm : undefined,
          date,
          time,
        };
      });

      userBookingsRef.current = userBookings;
      rideBookingsRef.current = rideBookings;
      await mergeAndPersistBookings();
    } catch (err) {
      console.warn('Failed to sync bookings from Firestore', err);
    }
  }, [mergeAndPersistBookings]);

  const syncProfileFromRemote = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) return false;

      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) return false;

      const data = snap.data();
      const name = typeof data?.name === 'string' ? data.name : undefined;
      const gender = data?.gender === 'male' || data?.gender === 'female' || data?.gender === 'other'
        ? data.gender
        : undefined;
      const phoneValue = typeof data?.phone === 'string' ? data.phone : undefined;
      const rating = typeof data?.rating === 'number' ? data.rating : undefined;
      const totalRides = typeof data?.totalRides === 'number' ? data.totalRides : undefined;
      const referrals = typeof data?.referralsCount === 'number'
        ? data.referralsCount
        : typeof data?.referrals === 'number'
          ? data.referrals
          : undefined;
      const walletBalance = typeof data?.walletBalance === 'number' ? data.walletBalance : undefined;
      const offersCount = typeof data?.offersCount === 'number' ? data.offersCount : undefined;

      if (name || gender) {
        setProfile({
          name,
          gender,
          rating,
          totalRides,
          referrals,
          walletBalance,
          offersCount,
        });
      } else if (
        rating !== undefined ||
        totalRides !== undefined ||
        referrals !== undefined ||
        walletBalance !== undefined ||
        offersCount !== undefined
      ) {
        setProfile({ rating, totalRides, referrals, walletBalance, offersCount });
      }
      if (phoneValue) {
        setPhone(phoneValue);
      }

      return Boolean((name && gender) || data?.isProfileComplete === true);
    } catch (err) {
      console.warn('Failed to sync profile from Firestore', err);
      return false;
    }
  }, []);

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
      try {
        await auth.signOut();
      } catch (err) {
        console.warn('Failed to sign out from Firebase', err);
      }
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

  useEffect(() => {
    let unsubscribeProfile = () => {};
    let unsubscribeUserBookings = () => {};
    let unsubscribeRides = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeProfile();
      unsubscribeUserBookings();
      unsubscribeRides();

      if (!user) return;

      if (migrationUserRef.current !== user.uid) {
        migrationUserRef.current = user.uid;
        void migrateLocalProfileToRemote(user.uid);
        void migrateLocalBookingsToRemote(user.uid, bookings);
      }

      const userRef = doc(db, 'users', user.uid);
      unsubscribeProfile = onSnapshot(userRef, (snap) => {
        if (!snap.exists()) return;
        const data = snap.data();
        const name = typeof data?.name === 'string' ? data.name : undefined;
        const gender = data?.gender === 'male' || data?.gender === 'female' || data?.gender === 'other'
          ? data.gender
          : undefined;
        const phoneValue = typeof data?.phone === 'string' ? data.phone : undefined;
        const rating = typeof data?.rating === 'number' ? data.rating : undefined;
        const totalRides = typeof data?.totalRides === 'number' ? data.totalRides : undefined;
        const referrals = typeof data?.referralsCount === 'number'
          ? data.referralsCount
          : typeof data?.referrals === 'number'
            ? data.referrals
            : undefined;
        const walletBalance = typeof data?.walletBalance === 'number' ? data.walletBalance : undefined;
        const offersCount = typeof data?.offersCount === 'number' ? data.offersCount : undefined;

        if (name || gender) {
          setProfile({
            name,
            gender,
            rating,
            totalRides,
            referrals,
            walletBalance,
            offersCount,
          });
        } else if (
          rating !== undefined ||
          totalRides !== undefined ||
          referrals !== undefined ||
          walletBalance !== undefined ||
          offersCount !== undefined
        ) {
          setProfile({ rating, totalRides, referrals, walletBalance, offersCount });
        }
        if (phoneValue) {
          setPhone(phoneValue);
        }
      });

      const bookingsRef = collection(db, 'users', user.uid, 'bookings');
      unsubscribeUserBookings = onSnapshot(bookingsRef, (snap) => {
        userBookingsRef.current = snap.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            rideId: typeof data?.rideId === 'string' ? data.rideId : undefined,
            type: data?.type || 'ride',
            status: data?.status || 'active',
            vehicleName: data?.vehicleName || '',
            pickupAddress: data?.pickupAddress || '',
            dropAddress: data?.dropAddress || undefined,
            price: typeof data?.price === 'number' ? data.price : 0,
            distance: typeof data?.distance === 'number' ? data.distance : undefined,
            cancelReason: data?.cancelReason || undefined,
            date: data?.date || '',
            time: data?.time || '',
          };
        });
        void mergeAndPersistBookings();
      });

      const ridesRef = collection(db, 'rides');
      const ridesQuery = query(ridesRef, where('userId', '==', user.uid));
      unsubscribeRides = onSnapshot(ridesQuery, (snap) => {
        rideBookingsRef.current = snap.docs.map((docSnap) => {
          const data = docSnap.data();
          const createdAt = data?.createdAt?.toDate ? data.createdAt.toDate() : null;
          const date = createdAt ? createdAt.toLocaleDateString() : '';
          const time = createdAt ? createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          return {
            id: `ride_${docSnap.id}`,
            rideId: docSnap.id,
            type: 'ride',
            status: data?.status === 'completed' || data?.status === 'cancelled' ? data.status : 'active',
            vehicleName: data?.vehicle?.name || 'Vehicle',
            pickupAddress: data?.pickup?.address || '',
            dropAddress: data?.drop?.address || undefined,
            price: typeof data?.fareEstimate === 'number' ? data.fareEstimate : 0,
            distance: typeof data?.distanceKm === 'number' ? data.distanceKm : undefined,
            date,
            time,
          };
        });
        void mergeAndPersistBookings();
      });
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile();
      unsubscribeUserBookings();
      unsubscribeRides();
    };
  }, [bookings, mergeAndPersistBookings, migrateLocalBookingsToRemote, migrateLocalProfileToRemote]);

  const isProfileComplete = Boolean(
    profile &&
    profile.name &&
    profile.name.trim().length > 0 &&
    profile.gender
  );

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
      syncProfileFromRemote,
      syncBookingsFromRemote,
      activities,
    }),
    [
      language,
      phone,
      profile,
      token,
      isProfileComplete,
      selectedCabType,
      verified,
      logout,
      bookings,
      activities,
      syncProfileFromRemote,
      syncBookingsFromRemote,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAppState = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used within AppStateProvider');
  return v;
};
