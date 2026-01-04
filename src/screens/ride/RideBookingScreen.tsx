import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import {
  Button,
  SafetyBar,
  DriverCard,
  RideMapView,
  LocationSelector,
  VehicleSelector,
} from '../../components';
import { Vehicle } from '../../components/VehicleSelector';
import { BookingLocation } from '../../components/LocationSelector';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

type RideBookingNavigationProp = StackNavigationProp<RootStackParamList, 'RideBooking'>;

interface Props {
  navigation: RideBookingNavigationProp;
}

// Modern vehicle options with detailed pricing
const vehicleTypes: Vehicle[] = [
  {
    id: 'bike',
    name: 'Bike',
    icon: 'bicycle',
    capacity: '1 rider',
    eta: '4 min',
    basePrice: 40,
    pricePerKm: 8,
    description: 'Budget-friendly option for solo travelers',
    color: '#10B981',
  },
  {
    id: 'auto',
    name: 'Auto',
    icon: 'car',
    capacity: '3 seats',
    eta: '5 min',
    basePrice: 50,
    pricePerKm: 10,
    description: 'Comfortable ride for 3 passengers',
    color: '#FF8A4C',
  },
  {
    id: 'cab-ac',
    name: 'Cab AC',
    icon: 'car',
    capacity: '4 seats',
    eta: '7 min',
    basePrice: 100,
    pricePerKm: 15,
    description: 'Air-conditioned sedan for comfort',
    color: '#6A5AE0',
  },
  {
    id: 'cab-non-ac',
    name: 'Cab Non-AC',
    icon: 'car',
    capacity: '4 seats',
    eta: '7 min',
    basePrice: 80,
    pricePerKm: 12,
    description: 'Economy cab option',
    color: '#3B82F6',
  },
  {
    id: 'cab-premium',
    name: 'Cab Premium',
    icon: 'car',
    capacity: '4 seats',
    eta: '9 min',
    basePrice: 150,
    pricePerKm: 20,
    description: 'Premium luxury sedan experience',
    color: '#8B5CF6',
  },
  {
    id: 'cab-xl',
    name: 'Cab XL',
    icon: 'car',
    capacity: '6 seats',
    eta: '8 min',
    basePrice: 180,
    pricePerKm: 25,
    description: 'Spacious vehicle for groups',
    color: '#EC4899',
  },
];

const RideBookingScreen: React.FC<Props> = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState<BookingLocation | null>(null);
  const [dropLocation, setDropLocation] = useState<BookingLocation | null>(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [selectedVehiclePrice, setSelectedVehiclePrice] = useState<number>(0);
  const [isBooking, setIsBooking] = useState(false);  const { addBooking } = useAppState();
  const { selectedCabType, setSelectedCabType } = useAppState();

  // Calculate distance between pickup and drop (mock)
  const distance = useMemo(() => {
    if (pickupLocation && dropLocation) {
      const lat1 = pickupLocation.latitude;
      const lon1 = pickupLocation.longitude;
      const lat2 = dropLocation.latitude;
      const lon2 = dropLocation.longitude;

      const R = 6371; // Earth's radius in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c * 10) / 10; // Round to 1 decimal
    }
    return 0;
  }, [pickupLocation, dropLocation]);

  // Determine current step
  const currentStep = useMemo(() => {
    if (!pickupLocation) return 'pickup';
    if (!dropLocation) return 'drop';
    if (!selectedVehicleId) return 'vehicle';
    return 'confirm';
  }, [pickupLocation, dropLocation, selectedVehicleId]);

  const handleSelectVehicle = (vehicleId: string, price: number) => {
    setSelectedVehicleId(vehicleId);
    setSelectedVehiclePrice(price);
    if (setSelectedCabType) setSelectedCabType(vehicleId);
  };

  const handleBookRide = async () => {
    if (!pickupLocation || !dropLocation || !selectedVehicleId) return;

    setIsBooking(true);
    try {
      const selectedVehicle = vehicleTypes.find(v => v.id === selectedVehicleId);
      
      // Save booking to app state
      await addBooking({
        type: 'ride',
        status: 'active',
        vehicleName: selectedVehicle?.name || 'Vehicle',
        pickupAddress,
        dropAddress,
        price: selectedVehiclePrice,
        distance,
      });

      // Simulate booking process
      setTimeout(() => {
        setIsBooking(false);
        // Navigate to bookings screen to show the booking
        navigation.navigate('Main', { screen: 'Bookings' } as any);
      }, 1500);
    } catch (error) {
      setIsBooking(false);
      console.error('Booking error:', error);
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isWeb = screenWidth >= 1024;
  const mapHeight = isWeb ? 440 : screenHeight * 0.5;

  // RESPONSIVE LAYOUT: Mobile = vertical stack, Web = side-by-side
  return (
    <SafeAreaView style={[styles.container, !isMobile && styles.containerWebHeight]}>
      {isMobile ? (
        // MOBILE: Vertical Scrollable Layout
        <MobileLayout
          navigation={navigation}
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          selectedVehicleId={selectedVehicleId}
          selectedVehiclePrice={selectedVehiclePrice}
          isBooking={isBooking}
          distance={distance}
          currentStep={currentStep}
          onPickupSelect={(location: BookingLocation, address: string) => {
            setPickupLocation(location);
            setPickupAddress(address);
          }}
          onDropSelect={(location: BookingLocation, address: string) => {
            setDropLocation(location);
            setDropAddress(address);
          }}
          onSelectVehicle={handleSelectVehicle}
          onBookRide={handleBookRide}
        />
      ) : (
        // WEB/TABLET: Single vertical ScrollView wrapping both panels
        <ScrollView
          style={styles.webPageScroll}
          contentContainerStyle={styles.webPageScrollContent}
          showsVerticalScrollIndicator={Platform.OS === 'web'}
          scrollEnabled={true}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          overScrollMode={Platform.OS === 'web' ? 'auto' : 'always'}
        >
          <WebLayout
            navigation={navigation}
            pickupLocation={pickupLocation}
            dropLocation={dropLocation}
            pickupAddress={pickupAddress}
            dropAddress={dropAddress}
            selectedVehicleId={selectedVehicleId}
            selectedVehiclePrice={selectedVehiclePrice}
            isBooking={isBooking}
            distance={distance}
            currentStep={currentStep}
            mapHeight={mapHeight}
            onPickupSelect={(location: BookingLocation, address: string) => {
              setPickupLocation(location);
              setPickupAddress(address);
            }}
            onDropSelect={(location: BookingLocation, address: string) => {
              setDropLocation(location);
              setDropAddress(address);
            }}
            onSelectVehicle={handleSelectVehicle}
            onBookRide={handleBookRide}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// ============= MOBILE LAYOUT =============
const MobileLayout: React.FC<any> = ({
  navigation,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  selectedVehicleId,
  selectedVehiclePrice,
  isBooking,
  distance,
  currentStep,
  onPickupSelect,
  onDropSelect,
  onSelectVehicle,
  onBookRide,
}) => (
  <View style={styles.mobileContainer}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Book a Ride</Text>
      <View style={{ width: 40 }} />
    </View>

    {/* Progress */}
    <View style={styles.progressBar}>
      <View style={[styles.progressStep, currentStep !== 'pickup' && styles.progressStepComplete]}>
        <Text style={styles.progressStepNumber}>{currentStep !== 'pickup' ? '✓' : '1'}</Text>
      </View>
      <View style={[styles.progressLine, currentStep !== 'pickup' && styles.progressLineComplete]} />
      <View style={[styles.progressStep, currentStep === 'confirm' || currentStep === 'vehicle' ? styles.progressStepComplete : {}]}>
        <Text style={styles.progressStepNumber}>{currentStep === 'confirm' || currentStep === 'vehicle' ? '✓' : '2'}</Text>
      </View>
      <View style={[styles.progressLine, (currentStep === 'vehicle' || currentStep === 'confirm') && styles.progressLineComplete]} />
      <View style={[styles.progressStep, (currentStep === 'vehicle' || currentStep === 'confirm') && styles.progressStepComplete]}>
        <Text style={styles.progressStepNumber}>{currentStep === 'confirm' ? '✓' : '3'}</Text>
      </View>
    </View>

    {/* Main Content - Scrollable */}
    <ScrollView
      style={styles.mobileScroll}
      contentContainerStyle={styles.mobileScrollContent}
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      overScrollMode="always"
    >
      {/* Location Selection */}
      <View style={styles.mobileSection}>
        <View style={styles.mobileLocationHeader}>
          <Ionicons name="location" size={20} color={theme.colors.primary.main} />
          <Text style={styles.mobileSectionTitle}>Select Locations</Text>
        </View>

        <LocationSelector
          label="Pickup"
          placeholder="Choose pickup location"
          value={pickupAddress}
          onSelect={onPickupSelect}
          showCurrentLocation={true}
        />

        <LocationSelector
          label="Drop"
          placeholder="Choose drop location"
          value={dropAddress}
          onSelect={onDropSelect}
          disabled={!pickupLocation}
        />

        {/* Distance Summary */}
        {dropLocation && (
          <View style={styles.routeSummaryMobile}>
            <View style={styles.routeItem}>
              <Ionicons name="navigate" size={18} color={theme.colors.primary.main} />
              <Text style={styles.routeLabel}>Distance</Text>
              <Text style={styles.routeValue}>{distance} km</Text>
            </View>
            <View style={styles.routeDivider} />
            <View style={styles.routeItem}>
              <Ionicons name="time-outline" size={18} color={theme.colors.success} />
              <Text style={styles.routeLabel}>Est. Time</Text>
              <Text style={styles.routeValue}>~{Math.round(distance * 3)} min</Text>
            </View>
          </View>
        )}
      </View>

      {/* Vehicle Selection */}
      {dropLocation && (
        <View style={styles.mobileSection}>
          <View style={styles.mobileLocationHeader}>
            <Ionicons name="car" size={20} color={theme.colors.primary.main} />
            <Text style={styles.mobileSectionTitle}>Choose Vehicle</Text>
          </View>

          <VehicleSelector
            vehicles={vehicleTypes}
            selectedVehicleId={selectedVehicleId || undefined}
            onSelectVehicle={onSelectVehicle}
            distance={distance}
            disabled={isBooking}
            scrollEnabled={true}
            showHeader={false}
          />
        </View>
      )}

      {/* Fare Summary & Confirm */}
      {selectedVehicleId && (
        <View style={styles.mobileSummaryCard}>
          <View style={styles.summaryCardHeader}>
            <Ionicons name="checkmark-circle" size={28} color={theme.colors.success} />
            <Text style={styles.summaryCardTitle}>Ready to Book!</Text>
          </View>

          <View style={styles.fareSummaryRow}>
            <Text style={styles.fareLabel}>Estimated Fare</Text>
            <Text style={styles.fareValue}>₹{selectedVehiclePrice}</Text>
          </View>

          <View style={styles.fareDetails}>
            <View style={styles.fareDetailRow}>
              <Text style={styles.fareDetailLabel}>Base Fare</Text>
              <Text style={styles.fareDetailValue}>₹{40}</Text>
            </View>
            <View style={styles.fareDetailRow}>
              <Text style={styles.fareDetailLabel}>Distance ({distance} km)</Text>
              <Text style={styles.fareDetailValue}>₹{Math.round(distance * 10)}</Text>
            </View>
            <View style={styles.fareDetailRow}>
              <Text style={styles.fareDetailLabel}>Taxes & Fees</Text>
              <Text style={styles.fareDetailValue}>₹{Math.round(selectedVehiclePrice * 0.05)}</Text>
            </View>
          </View>

          <Button
            title={isBooking ? 'Booking...' : 'Confirm Booking'}
            onPress={onBookRide}
            disabled={isBooking}
            fullWidth
            gradient
            size="lg"
          />

          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ height: theme.spacing.xl }} />
    </ScrollView>
  </View>
);

// ============= WEB/TABLET LAYOUT =============
const WebLayout: React.FC<any> = ({
  navigation,
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  selectedVehicleId,
  selectedVehiclePrice,
  isBooking,
  distance,
  currentStep,
  mapHeight,
  onPickupSelect,
  onDropSelect,
  onSelectVehicle,
  onBookRide,
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Ride</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressBar}>
        <View style={[styles.progressStep, currentStep !== 'pickup' && styles.progressStepComplete]}>
          <Text style={styles.progressStepNumber}>{currentStep !== 'pickup' ? '✓' : '1'}</Text>
        </View>
        <View style={[styles.progressLine, currentStep !== 'pickup' && styles.progressLineComplete]} />
        <View style={[styles.progressStep, currentStep === 'confirm' || currentStep === 'vehicle' ? styles.progressStepComplete : {}]}>
          <Text style={styles.progressStepNumber}>{currentStep === 'confirm' || currentStep === 'vehicle' ? '✓' : '2'}</Text>
        </View>
        <View style={[styles.progressLine, (currentStep === 'vehicle' || currentStep === 'confirm') && styles.progressLineComplete]} />
        <View style={[styles.progressStep, (currentStep === 'vehicle' || currentStep === 'confirm') && styles.progressStepComplete]}>
          <Text style={styles.progressStepNumber}>{currentStep === 'confirm' ? '✓' : '3'}</Text>
        </View>
      </View>

      {/* Content - Vertical Stack (NO row layout) */}
      <View style={styles.webContentVertical}>
        {/* Location Selection Section */}
        <View style={styles.webSection}>
          <Text style={styles.webPanelTitle}>Select Locations</Text>

          <LocationSelector
            label="Pickup"
            placeholder="Choose pickup location"
            value={pickupAddress}
            onSelect={onPickupSelect}
            showCurrentLocation={true}
          />

          <LocationSelector
            label="Drop"
            placeholder="Choose drop location"
            value={dropAddress}
            onSelect={onDropSelect}
            disabled={!pickupLocation}
          />

          {dropLocation && (
            <View style={styles.routeSummaryWeb}>
              <View style={styles.routeItemWeb}>
                <Ionicons name="navigate" size={20} color={theme.colors.primary.main} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.routeLabelWeb}>Distance</Text>
                  <Text style={styles.routeValueWeb}>{distance} km</Text>
                </View>
              </View>
              <View style={styles.routeItemWeb}>
                <Ionicons name="time-outline" size={20} color={theme.colors.success} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.routeLabelWeb}>Est. Time</Text>
                  <Text style={styles.routeValueWeb}>~{Math.round(distance * 3)} min</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Map Section */}
        {pickupLocation && (
          <View style={styles.webSection}>
            <View style={[styles.mapContainer, { height: mapHeight }]}>
              <RideMapView
                pickupLocation={{
                  latitude: pickupLocation.latitude,
                  longitude: pickupLocation.longitude,
                  address: pickupAddress,
                  label: 'pickup',
                }}
                dropLocation={
                  dropLocation
                    ? {
                      latitude: dropLocation.latitude,
                      longitude: dropLocation.longitude,
                      address: dropAddress,
                      label: 'drop',
                    }
                    : undefined
                }
                height={mapHeight}
              />
            </View>
          </View>
        )}

        {/* Vehicle Selection Section */}
        {dropLocation && (
          <View style={styles.webSection}>
            <Text style={styles.webPanelTitle}>Choose Vehicle</Text>

            <VehicleSelector
              vehicles={vehicleTypes}
              selectedVehicleId={selectedVehicleId || undefined}
              onSelectVehicle={onSelectVehicle}
              distance={distance}
              disabled={isBooking}
              scrollEnabled={true}
              showHeader={false}
            />

            {/* Summary & Confirm */}
            {selectedVehicleId && (
              <View style={styles.summaryCardWeb}>
                <View style={styles.summaryHeaderWeb}>
                  <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
                  <Text style={styles.summaryTitleWeb}>Ready to Book!</Text>
                </View>

                <View style={styles.summaryContentWeb}>
                  <View style={styles.summaryRowWeb}>
                    <Text style={styles.summaryLabelWeb}>Estimated Fare</Text>
                    <Text style={styles.summaryValueWebLarge}>₹{selectedVehiclePrice}</Text>
                  </View>
                  <View style={styles.summaryDividerWeb} />
                  <View style={styles.summaryRowWeb}>
                    <Text style={styles.summaryLabelWeb}>Distance</Text>
                    <Text style={styles.summaryValueWeb}>{distance} km</Text>
                  </View>
                  <View style={styles.summaryRowWeb}>
                    <Text style={styles.summaryLabelWeb}>Est. Time</Text>
                    <Text style={styles.summaryValueWeb}>~{Math.round(distance * 3)} min</Text>
                  </View>
                </View>

                <Button
                  title={isBooking ? 'Booking...' : 'Confirm Booking'}
                  onPress={onBookRide}
                  disabled={isBooking}
                  fullWidth
                  gradient
                  size="lg"
                />
              </View>
            )}
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: theme.spacing['2xl'] }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    width: '100%',
    display: 'flex' as any,
    height: '100%',
  },
  containerWebHeight: {
    flex: 1,
    minHeight: '100%',
  },

  // ===== SHARED STYLES =====
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    width: '100%',
  },
  backButton: {
    padding: theme.spacing.sm,
    marginLeft: -theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.base,
    backgroundColor: theme.colors.background.secondary,
  },
  progressStep: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressStepComplete: {
    backgroundColor: theme.colors.success,
  },
  progressStepNumber: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.background.primary,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.border.light,
    marginHorizontal: theme.spacing.sm,
  },
  progressLineComplete: {
    backgroundColor: theme.colors.success,
  },

  // ===== MOBILE STYLES =====
  mobileContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.background.primary,
    width: '100%',
  },
  mobileScroll: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  mobileScrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xl,
  } as any,
  mobileSection: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    width: '100%',
  },
  mobileLocationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  mobileSectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  routeSummaryMobile: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
    minHeight: 75,
    width: '100%',
  },
  routeItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    minWidth: 80,
  },
  routeDivider: {
    width: 1,
    backgroundColor: theme.colors.border.light,
  },
  routeLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  routeValue: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  mobileSummaryCard: {
    marginHorizontal: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.xl,
    borderTopWidth: 4,
    borderTopColor: theme.colors.success,
    width: 'auto',
    ...theme.shadows.lg,
  },
  summaryCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  summaryCardTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  fareSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  fareLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  fareValue: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
    marginTop: theme.spacing.xs,
  },
  fareDetails: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  fareDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareDetailLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  fareDetailValue: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  cancelButton: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  cancelButtonText: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
  },

  // ===== WEB STYLES =====
  webContainer: {
    width: '100%',
  },
  webPageScroll: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
  },
  webPageScrollContent: {
    paddingBottom: theme.spacing['2xl'],
    flexGrow: 1,
  },
  webContent: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 0,
  },
  webContentVertical: {
    width: '100%',
    flexGrow: 1,
  },
  webSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
  },
  webLeftPanel: {
    display: 'none' as any,
  },
  webRightPanel: {
    display: 'none' as any,
  },
  webScroll: {
    padding: theme.spacing.lg,
    width: '100%',
    display: 'none' as any,
  },
  webPanelTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  routeSummaryWeb: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  routeItemWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  routeLabelWeb: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  routeValueWeb: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.xs,
  },
  mapContainer: {
    height: Platform.OS === 'web' ? 400 : 500,
    width: '100%',
    backgroundColor: theme.colors.background.secondary,
  },
  vehicleSection: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    width: '100%',
  },
  vehicleSectionScroll: {
    backgroundColor: theme.colors.background.primary,
  },
  vehicleSectionContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing['2xl'],
    paddingTop: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
    overflow: 'hidden',
  },
  summaryHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
  },
  summaryTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  summaryContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  summaryCardWeb: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderTopWidth: 3,
    borderTopColor: theme.colors.success,
    ...theme.shadows.lg,
  },
  summaryHeaderWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  summaryTitleWeb: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  summaryContentWeb: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  summaryRowWeb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  summaryLabelWeb: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  summaryValueWeb: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  summaryValueWebLarge: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  summaryDividerWeb: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.sm,
  },
});

export default RideBookingScreen;
