import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import theme from '../theme';

export interface BookingLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationSelectorProps {
  label: 'Pickup' | 'Drop';
  placeholder: string;
  value?: string;
  onSelect: (location: BookingLocation, address: string) => void;
  disabled?: boolean;
  showCurrentLocation?: boolean;
}

/**
 * LocationSelector Component
 * Handles location selection for ride booking
 * Features:
 * - Auto-load current location with permission
 * - Search location input
 * - Recent locations
 * - Reverse geocoding for addresses
 */
const LocationSelector: React.FC<LocationSelectorProps> = ({
  label,
  placeholder,
  value,
  onSelect,
  disabled = false,
  showCurrentLocation = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [suggestedLocations, setSuggestedLocations] = useState<
    Array<{ name: string; address: string; lat: number; lng: number }>
  >([]);
  const [error, setError] = useState('');

  // Mock recent locations
  const recentLocations = [
    { name: 'Office', address: '123 IT Park, Hitech City, Hyderabad' },
    { name: 'Home', address: '456 Jubilee Hills, Hyderabad' },
  ];

  // Request location permission and get current location
  const requestCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied. Please enable location access in settings.');
        setIsLoading(false);
        return;
      }

      // Get current position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeoutMs: 10000,
      });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      // Reverse geocoding to get address
      let address = 'Current Location';
      try {
        const geocodedLocations = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geocodedLocations && geocodedLocations.length > 0) {
          const geo = geocodedLocations[0];
          const parts = [];
          if (geo.street) parts.push(geo.street);
          if (geo.city) parts.push(geo.city);
          if (geo.region) parts.push(geo.region);
          address = parts.length > 0 ? parts.join(', ') : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
      } catch (geocodeErr) {
        // If geocoding fails, use coordinates
        address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        console.log('Geocoding error (using coordinates):', geocodeErr);
      }

      // Call onSelect with the location
      onSelect(
        {
          latitude,
          longitude,
          address,
        },
        address
      );

      setModalVisible(false);
      setSearchText('');
    } catch (err: any) {
      let errorMsg = 'Failed to get location. Please try again.';
      if (err.code === 'E_LOCATION_SETTINGS_UNSATISFIED') {
        errorMsg = 'Please enable location services in your device settings.';
      } else if (err.code === 'E_PERMISSION_UNDETERMINED') {
        errorMsg = 'Location permission not granted.';
      } else if (err.message && err.message.includes('timeout')) {
        errorMsg = 'Location request timed out. Please try again.';
      }
      setError(errorMsg);
      console.error('Location error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle location search
  const handleSearch = async (text: string) => {
    setSearchText(text);

    if (text.length < 2) {
      setSuggestedLocations([]);
      return;
    }

    try {
      setIsSearching(true);
      // Mock search results - In production, use Google Maps Places API
      const mockResults = [
        {
          name: 'Hitech City',
          address: `${text} - Hitech City, Hyderabad`,
          lat: 17.361588,
          lng: 78.412883,
        },
        {
          name: 'Jubilee Hills',
          address: `${text} - Jubilee Hills, Hyderabad`,
          lat: 17.378,
          lng: 78.4119,
        },
        {
          name: 'Banjara Hills',
          address: `${text} - Banjara Hills, Hyderabad`,
          lat: 17.3742,
          lng: 78.4439,
        },
      ];
      setSuggestedLocations(mockResults);
    } catch (err) {
      setError('Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle location selection from search or recent
  const handleSelectLocation = (location: any) => {
    const address = location.address || location.name;
    onSelect(
      {
        latitude: location.lat || 17.361588,
        longitude: location.lng || 78.412883,
        address,
      },
      address
    );
    setModalVisible(false);
    setSearchText('');
  };

  const iconColor = label === 'Pickup' ? theme.colors.success : theme.colors.error;
  const isDot = label === 'Pickup';

  return (
    <>
      <TouchableOpacity
        style={[styles.container, disabled && styles.containerDisabled]}
        onPress={() => setModalVisible(true)}
        disabled={disabled}
      >
        {/* Location Icon */}
        <View style={[styles.iconContainer, { borderColor: iconColor }]}>
          {isDot ? (
            <View style={[styles.dot, { backgroundColor: iconColor }]} />
          ) : (
            <Ionicons name="location-sharp" size={16} color={iconColor} />
          )}
        </View>

        {/* Location Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={[styles.value, !value && styles.placeholder]}>
            {value || placeholder}
          </Text>
        </View>

        {/* Action Icon */}
        {value ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil" size={18} color={theme.colors.primary.main} />
          </TouchableOpacity>
        ) : (
          <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
        )}
      </TouchableOpacity>

      {/* Location Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select {label} Location</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color={theme.colors.text.tertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder={`Search ${label.toLowerCase()} location...`}
              placeholderTextColor={theme.colors.text.tertiary}
              value={searchText}
              onChangeText={handleSearch}
            />
            {searchText ? (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={18} color={theme.colors.text.tertiary} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={theme.colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Current Location Button */}
          {showCurrentLocation && !searchText && (
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={requestCurrentLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.primary.main} size="small" />
              ) : (
                <>
                  <View style={styles.currentLocationIcon}>
                    <Ionicons name="navigate" size={20} color={theme.colors.primary.main} />
                  </View>
                  <View style={styles.currentLocationText}>
                    <Text style={styles.currentLocationTitle}>Use Current Location</Text>
                    <Text style={styles.currentLocationSubtitle}>
                      {isLoading ? 'Getting location...' : 'Auto-detect your position'}
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          )}

          {/* Search Results */}
          {searchText && (
            <>
              {isSearching ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color={theme.colors.primary.main} size="large" />
                  <Text style={styles.loadingText}>Searching locations...</Text>
                </View>
              ) : (
                <FlatList
                  data={suggestedLocations}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.locationItem}
                      onPress={() => handleSelectLocation(item)}
                    >
                      <Ionicons
                        name="location-outline"
                        size={18}
                        color={theme.colors.text.secondary}
                      />
                      <View style={styles.locationItemText}>
                        <Text style={styles.locationItemName}>{item.name}</Text>
                        <Text style={styles.locationItemAddress}>{item.address}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              )}
            </>
          )}

          {/* Recent Locations */}
          {!searchText && (
            <>
              <Text style={styles.sectionTitle}>Recent Locations</Text>
              {recentLocations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.locationItem}
                  onPress={() => handleSelectLocation(location)}
                >
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={theme.colors.text.secondary}
                  />
                  <View style={styles.locationItemText}>
                    <Text style={styles.locationItemName}>{location.name}</Text>
                    <Text style={styles.locationItemAddress}>{location.address}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginRight: theme.spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.semiBold,
    marginBottom: 2,
  },
  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  placeholder: {
    color: theme.colors.text.tertiary,
    fontWeight: theme.fontWeights.normal,
  },
  modal: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingTop: theme.spacing.base,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    height: 40,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: '#FEE2E2',
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
  },
  errorText: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.error,
    fontWeight: theme.fontWeights.semiBold,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    backgroundColor: '#F0F4FF',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    gap: theme.spacing.md,
  },
  currentLocationIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  currentLocationText: {
    flex: 1,
  },
  currentLocationTitle: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  currentLocationSubtitle: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing.base,
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    gap: theme.spacing.md,
  },
  locationItemText: {
    flex: 1,
  },
  locationItemName: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  locationItemAddress: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.base,
  },
  loadingText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
  },
});

export default LocationSelector;
