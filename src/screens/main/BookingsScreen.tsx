import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

const BookingsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { bookings, updateBookingStatus } = useAppState();

  const layout = useMemo(() => {
    const isMobile = width < 640;
    return {
      isMobile,
      padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
    };
  }, [width]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return theme.colors.success.main;
      case 'completed': return theme.colors.text.secondary;
      case 'cancelled': return theme.colors.error.main;
      default: return theme.colors.text.secondary;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ride': return 'car-outline';
      case 'driver': return 'person-outline';
      case 'vehicle': return 'car-sport-outline';
      case 'tour': return 'map-outline';
      default: return 'document-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: layout.padding }]}>
        <Text style={[styles.title, { fontSize: layout.titleSize }]}>My Bookings</Text>
        <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>
          {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: layout.padding }]}
        showsVerticalScrollIndicator={false}
      >
        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-outline" size={64} color={theme.colors.text.secondary} />
            </View>
            <Text style={styles.emptyTitle}>No Bookings Yet</Text>
            <Text style={styles.emptyText}>Your trip history will appear here</Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.bookingCardGradient}
              >
                {/* Header */}
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingTypeContainer}>
                    <View style={[styles.bookingTypeIcon, { backgroundColor: theme.colors.primary.main + '15' }]}>
                      <Ionicons name={getTypeIcon(booking.type) as any} size={20} color={theme.colors.primary.main} />
                    </View>
                    <View>
                      <Text style={styles.bookingType}>{booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}</Text>
                      <Text style={styles.bookingVehicle}>{booking.vehicleName}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '15' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Text>
                  </View>
                </View>

                {/* Locations */}
                <View style={styles.locationContainer}>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color={theme.colors.success.main} />
                    <Text style={styles.locationText} numberOfLines={1}>{booking.pickupAddress}</Text>
                  </View>
                  {booking.dropAddress && (
                    <>
                      <View style={styles.locationDivider} />
                      <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color={theme.colors.error.main} />
                        <Text style={styles.locationText} numberOfLines={1}>{booking.dropAddress}</Text>
                      </View>
                    </>
                  )}
                </View>

                {/* Footer */}
                <View style={styles.bookingFooter}>
                  <View style={styles.bookingInfo}>
                    <Ionicons name="calendar-outline" size={14} color={theme.colors.text.secondary} />
                    <Text style={styles.bookingInfoText}>{booking.date}</Text>
                    <Ionicons name="time-outline" size={14} color={theme.colors.text.secondary} style={{ marginLeft: theme.spacing.md }} />
                    <Text style={styles.bookingInfoText}>{booking.time}</Text>
                  </View>
                  <Text style={styles.bookingPrice}>₹{booking.price}</Text>
                </View>

                {/* Complete Button for Active Bookings */}
                {booking.status === 'active' && (
                  <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => updateBookingStatus(booking.id, 'completed')}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.completeButtonText}>Complete Ride</Text>
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    width: '100%',
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  header: {
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl * 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl * 3,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  bookingCard: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  bookingCardGradient: {
    padding: theme.spacing.lg,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  bookingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  bookingTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingType: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.medium,
  },
  bookingVehicle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
  },
  locationContainer: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  locationDivider: {
    width: 2,
    height: 16,
    backgroundColor: theme.colors.border.light,
    marginLeft: 7,
    marginVertical: theme.spacing.xs,
  },
  locationText: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  bookingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  bookingInfoText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  bookingPrice: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.success.main,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
    ...theme.shadows.sm,
  },
  completeButtonText: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semibold,
    color: '#FFFFFF',
  },
});

export default BookingsScreen;
