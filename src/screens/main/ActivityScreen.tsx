import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

const ActivityScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { activities } = useAppState();

  const layout = useMemo(() => {
    const isMobile = width < 640;
    return {
      isMobile,
      padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
    };
  }, [width]);

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
        <Text style={[styles.title, { fontSize: layout.titleSize }]}>Activity</Text>
        <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>
          {activities.length} completed {activities.length === 1 ? 'trip' : 'trips'}
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: layout.padding }]}
        showsVerticalScrollIndicator={false}
      >
        {activities.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={64} color={theme.colors.text.secondary} />
            </View>
            <Text style={styles.emptyTitle}>No Activity Yet</Text>
            <Text style={styles.emptyText}>Your completed trips will appear here</Text>
          </View>
        ) : (
          activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={styles.activityCard} activeOpacity={0.7}>
              <LinearGradient
                colors={['#FFFFFF', '#F8F9FA']}
                style={styles.activityCardGradient}
              >
                {/* Header */}
                <View style={styles.activityHeader}>
                  <View style={styles.activityTypeContainer}>
                    <View style={[styles.activityTypeIcon, { backgroundColor: theme.colors.primary.main + '15' }]}>
                      <Ionicons name={getTypeIcon(activity.type) as any} size={20} color={theme.colors.primary.main} />
                    </View>
                    <View>
                      <Text style={styles.activityType}>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</Text>
                      <Text style={styles.activityVehicle}>{activity.vehicleName}</Text>
                    </View>
                  </View>
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={theme.colors.success.main} />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                </View>

                {/* Locations */}
                <View style={styles.locationContainer}>
                  <View style={styles.locationRow}>
                    <Ionicons name="location" size={16} color={theme.colors.success.main} />
                    <Text style={styles.locationText} numberOfLines={1}>{activity.pickupAddress}</Text>
                  </View>
                  {activity.dropAddress && (
                    <>
                      <View style={styles.locationDivider} />
                      <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color={theme.colors.error.main} />
                        <Text style={styles.locationText} numberOfLines={1}>{activity.dropAddress}</Text>
                      </View>
                    </>
                  )}
                </View>

                {/* Footer */}
                <View style={styles.activityFooter}>
                  <View style={styles.activityInfo}>
                    <Ionicons name="calendar-outline" size={14} color={theme.colors.text.secondary} />
                    <Text style={styles.activityInfoText}>{activity.date}</Text>
                    <Ionicons name="time-outline" size={14} color={theme.colors.text.secondary} style={{ marginLeft: theme.spacing.md }} />
                    <Text style={styles.activityInfoText}>{activity.time}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.activityPrice}>₹{activity.price}</Text>
                    {activity.distance && (
                      <Text style={styles.distanceText}>{activity.distance} km</Text>
                    )}
                  </View>
                </View>
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
    paddingBottom: theme.spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['4xl'],
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
  activityCard: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  activityCardGradient: {
    padding: theme.spacing.lg,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  activityTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityType: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.text.primary,
  },
  activityVehicle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.success.main + '15',
  },
  completedText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.success.main,
  },
  locationContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  locationText: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  locationDivider: {
    width: 2,
    height: 16,
    backgroundColor: theme.colors.border.light,
    marginLeft: 7,
    marginVertical: theme.spacing.xs,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityInfoText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  activityPrice: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  distanceText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
});

export default ActivityScreen;
