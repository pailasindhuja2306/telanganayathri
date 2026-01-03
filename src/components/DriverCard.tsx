import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

interface DriverCardProps {
  name: string;
  rating: number;
  totalTrips: number;
  vehicleNumber: string;
  vehicleModel: string;
  photo?: string;
  verified?: boolean;
  womenDriver?: boolean;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  name,
  rating,
  totalTrips,
  vehicleNumber,
  vehicleModel,
  photo,
  verified = true,
  womenDriver = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.driverInfo}>
          <View style={styles.avatarContainer}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Ionicons name="person" size={32} color={theme.colors.text.secondary} />
              </View>
            )}
            {verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
              </View>
            )}
          </View>

          <View style={styles.details}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{name}</Text>
              {womenDriver && (
                <View style={styles.womenBadge}>
                  <Ionicons name="woman" size={12} color="#FFFFFF" />
                </View>
              )}
            </View>

            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons name="star" size={14} color={theme.colors.secondary.main} />
                <Text style={styles.statText}>{rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.statText}>{totalTrips} trips</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.vehicleInfo}>
        <View style={styles.vehicleRow}>
          <Ionicons name="car-outline" size={16} color={theme.colors.text.secondary} />
          <Text style={styles.vehicleText}>{vehicleModel}</Text>
        </View>
        <Text style={styles.vehicleNumber}>{vehicleNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    ...theme.shadows.base,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
  },
  avatarPlaceholder: {
    backgroundColor: theme.colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.full,
  },
  details: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  name: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  womenBadge: {
    backgroundColor: theme.colors.accent.women,
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  separator: {
    color: theme.colors.text.tertiary,
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  vehicleText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  vehicleNumber: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
});
