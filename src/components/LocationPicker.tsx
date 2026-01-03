import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import theme from '../theme';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationSelect?: (location: LocationData) => void;
  showMap?: boolean;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  showMap = true,
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { width } = Dimensions.get('window');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      await fetchCurrentLocation();
    } catch (error) {
      setErrorMsg('Failed to get location');
      setLoading(false);
    }
  };

  const fetchCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = currentLocation.coords;
      
      // Try to get reverse geocoding (address)
      let address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      try {
        const geocodedAddress = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (geocodedAddress.length > 0) {
          const { name, street, city } = geocodedAddress[0];
          address = `${street || name || ''} ${city || ''}`.trim() || address;
        }
      } catch (err) {
        // Fallback to coordinates if geocoding fails
      }

      const locationData: LocationData = {
        latitude,
        longitude,
        address,
      };

      setLocation(locationData);
      onLocationSelect?.(locationData);
      setLoading(false);
    } catch (error) {
      setErrorMsg('Unable to fetch location');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchCurrentLocation();
  };

  const handleSelectAddress = async () => {
    if (location) {
      onLocationSelect?.(location);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="location" size={24} color={theme.colors.primary.main} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Pick Your Location</Text>
            <Text style={styles.headerSubtitle}>For accurate ride estimates</Text>
          </View>
        </View>
      </View>

      {/* Map Placeholder / Location Display */}
      {showMap && (
        <View style={[styles.mapContainer, { height: Math.max(250, width * 0.5) }]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary.main} />
              <Text style={styles.loadingText}>Finding your location...</Text>
            </View>
          ) : errorMsg ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
              <Text style={styles.errorText}>{errorMsg}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mapContent}>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map" size={48} color={theme.colors.primary.main} />
                <Text style={styles.mapPlaceholderText}>Live Map View</Text>
                <Text style={styles.mapPlaceholderSubtext}>
                  {location?.latitude.toFixed(4)}, {location?.longitude.toFixed(4)}
                </Text>
              </View>
              <View style={styles.pinIndicator}>
                <Ionicons name="location-sharp" size={32} color={theme.colors.error} />
              </View>
            </View>
          )}
        </View>
      )}

      {/* Location Details */}
      <View style={styles.detailsContainer}>
        {loading ? (
          <View style={styles.skeleton}>
            <View style={styles.skeletonText} />
            <View style={[styles.skeletonText, { marginTop: theme.spacing.sm, width: '70%' }]} />
          </View>
        ) : location && !errorMsg ? (
          <>
            <View style={styles.locationInfo}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={20} color={theme.colors.primary.main} />
              </View>
              <View style={styles.locationDetails}>
                <Text style={styles.locationAddress} numberOfLines={2}>
                  {location.address || 'Current Location'}
                </Text>
                <Text style={styles.locationCoords}>
                  Lat: {location.latitude.toFixed(4)} | Lng: {location.longitude.toFixed(4)}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton]}
                onPress={handleSelectAddress}
              >
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Confirm Location</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.secondaryButton]}
                onPress={handleRetry}
              >
                <Ionicons name="refresh" size={20} color={theme.colors.primary.main} />
                <Text style={styles.secondaryButtonText}>Update Location</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="checkmark-circle" size={18} color={theme.colors.success} />
          </View>
          <Text style={styles.infoText}>Precise location detection</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="shield-checkmark" size={18} color={theme.colors.success} />
          </View>
          <Text style={styles.infoText}>Your location is secure & private</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Ionicons name="pin" size={18} color={theme.colors.success} />
          </View>
          <Text style={styles.infoText}>Drag pin to adjust location</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  header: {
    backgroundColor: `${theme.colors.primary.main}08`,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.primary.main}15`,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  mapContainer: {
    backgroundColor: theme.colors.background.secondary,
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  errorText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.error,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.borderRadius.lg,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: theme.fontWeights.semiBold,
    fontSize: theme.fontSizes.base,
  },
  mapContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
  },
  mapPlaceholderSubtext: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  pinIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -16,
    marginTop: -16,
  },
  detailsContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.secondary,
  },
  skeleton: {
    gap: theme.spacing.md,
  },
  skeletonText: {
    height: 16,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.sm,
    width: '100%',
  },
  locationInfo: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationDetails: {
    flex: 1,
  },
  locationAddress: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationCoords: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  actionButtons: {
    gap: theme.spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: theme.fontWeights.semiBold,
    fontSize: theme.fontSizes.base,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary.main,
  },
  secondaryButtonText: {
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
    fontSize: theme.fontSizes.base,
  },
  infoSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: `${theme.colors.success}08`,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  infoItem_last: {
    marginBottom: 0,
  },
  infoIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
    flex: 1,
  },
});
