import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

const BookingsScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { bookings, updateBookingStatus, syncBookingsFromRemote } = useAppState();
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  const layout = useMemo(() => {
    const isMobile = width < 640;
    return {
      isMobile,
      padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
    };
  }, [width]);

  React.useEffect(() => {
    void syncBookingsFromRemote();
  }, [syncBookingsFromRemote]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return typeof theme.colors.success === 'string' ? theme.colors.success : (theme.colors.success as any).main;
      case 'completed': return typeof theme.colors.text.secondary === 'string' ? theme.colors.text.secondary : theme.colors.text.secondary;
      case 'cancelled': return typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main;
      default: return typeof theme.colors.text.secondary === 'string' ? theme.colors.text.secondary : theme.colors.text.secondary;
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

  const openCancelModal = (bookingId: string) => {
    setCancelBookingId(bookingId);
    setCancelReason('');
    setCancelModalVisible(true);
  };

  const closeCancelModal = () => {
    setCancelModalVisible(false);
    setCancelReason('');
    setCancelBookingId(null);
  };

  const confirmCancel = () => {
    if (!cancelBookingId) return;
    const reason = cancelReason.trim();
    updateBookingStatus(cancelBookingId, 'cancelled', reason.length > 0 ? reason : undefined);
    closeCancelModal();
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
                    <Ionicons name="location" size={16} color={typeof theme.colors.success === 'string' ? theme.colors.success : (theme.colors.success as any).main} />
                    <Text style={styles.locationText} numberOfLines={1}>{booking.pickupAddress}</Text>
                  </View>
                  {booking.dropAddress && (
                    <>
                      <View style={styles.locationDivider} />
                      <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color={typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main} />
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

                {booking.status === 'cancelled' && booking.cancelReason ? (
                  <View style={styles.cancelReasonRow}>
                    <Ionicons name="information-circle-outline" size={16} color={theme.colors.text.secondary} />
                    <Text style={styles.cancelReasonText} numberOfLines={2}>
                      {booking.cancelReason}
                    </Text>
                  </View>
                ) : null}

                {/* Complete Button for Active Bookings */}
                {booking.status === 'active' && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() => updateBookingStatus(booking.id, 'completed')}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                      <Text style={styles.completeButtonText}>Complete Ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => openCancelModal(booking.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="close-circle" size={20} color={typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main} />
                      <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        visible={cancelModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Cancel Ride</Text>
            <Text style={styles.modalSubtitle}>Reason is optional</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Add a reason (optional)"
              placeholderTextColor={theme.colors.text.tertiary}
              value={cancelReason}
              onChangeText={setCancelReason}
              multiline
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalSecondaryButton} onPress={closeCancelModal}>
                <Text style={styles.modalSecondaryText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalPrimaryButton} onPress={confirmCancel}>
                <Text style={styles.modalPrimaryText}>Cancel Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: typeof theme.colors.success === 'string' ? theme.colors.success : (theme.colors.success as any).main,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  completeButtonText: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: '#FFFFFF',
  },
  actionRow: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main,
    backgroundColor: '#100f0f',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  cancelButtonText: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main,
  },
  cancelReasonRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  cancelReasonText: {
    flex: 1,
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
  },
  modalTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  modalSubtitle: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  modalInput: {
    marginTop: theme.spacing.md,
    minHeight: 80,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  modalActions: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
  modalSecondaryButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
  },
  modalSecondaryText: {
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeights.semiBold,
  },
  modalPrimaryButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: typeof theme.colors.error === 'string' ? theme.colors.error : (theme.colors.error as any).main,
  },
  modalPrimaryText: {
    color: '#FFFFFF',
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default BookingsScreen;
