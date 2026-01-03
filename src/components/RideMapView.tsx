import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  label: 'pickup' | 'drop';
}

interface RideMapViewProps {
  pickupLocation?: Location;
  dropLocation?: Location;
  onPickupEdit?: () => void;
  onDropEdit?: () => void;
  height?: number;
}

/**
 * RideMapView Component
 * Displays pickup and drop locations on a map placeholder
 * Ready for real map integration (Google Maps/Mapbox)
 * Shows route visualization when both locations are selected
 */
const RideMapView: React.FC<RideMapViewProps> = ({
  pickupLocation,
  dropLocation,
  onPickupEdit,
  onDropEdit,
  height = 300,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const aspectRatio = 16 / 9;
  const mapHeight = height;

  return (
    <View style={[styles.container, { height: mapHeight }]}>
      {/* Map Placeholder - Ready for Google Maps/Mapbox integration */}
      <View style={styles.mapPlaceholder}>
        {/* Background gradient-like effect */}
        <View style={styles.mapBackground}>
          {/* Decorative grid for visual interest */}
          <View style={styles.gridContainer}>
            {Array.from({ length: 9 }).map((_, i) => (
              <View key={i} style={styles.gridCell} />
            ))}
          </View>
        </View>

        {/* Pickup Point Indicator */}
        {pickupLocation && (
          <View style={styles.locationMarker}>
            <View style={[styles.markerIcon, styles.pickupMarker]}>
              <Ionicons name="location" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.markerLabel}>
              <Text style={styles.markerText} numberOfLines={1}>
                {pickupLocation.address}
              </Text>
            </View>
          </View>
        )}

        {/* Drop Point Indicator */}
        {dropLocation && (
          <View style={[styles.locationMarker, styles.dropMarker]}>
            <View style={[styles.markerIcon, styles.dropMarkerIcon]}>
              <Ionicons name="location" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.markerLabel}>
              <Text style={styles.markerText} numberOfLines={1}>
                {dropLocation.address}
              </Text>
            </View>
          </View>
        )}

        {/* Route visualization (simplified) */}
        {pickupLocation && dropLocation && (
          <View style={styles.routeVisualization}>
            <View style={styles.routeLine} />
            <Text style={styles.routeText}>Route calculated</Text>
          </View>
        )}

        {/* Map Center Logo */}
        {!pickupLocation && !dropLocation && (
          <View style={styles.centerContent}>
            <Ionicons
              name="map-outline"
              size={64}
              color={theme.colors.text.tertiary}
            />
            <Text style={styles.placeholderText}>Map View</Text>
            <Text style={styles.placeholderSubtext}>Select locations to view route</Text>
          </View>
        )}

        {/* Edit buttons overlay */}
        {pickupLocation && (
          <TouchableOpacity
            style={[styles.editButton, styles.editButtonPickup]}
            onPress={onPickupEdit}
          >
            <Ionicons name="pencil" size={16} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        )}

        {dropLocation && (
          <TouchableOpacity
            style={[styles.editButton, styles.editButtonDrop]}
            onPress={onDropEdit}
          >
            <Ionicons name="pencil" size={16} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        )}
      </View>

      {/* Distance and Time Info (if both locations available) */}
      {pickupLocation && dropLocation && (
        <View style={styles.infoBar}>
          <View style={styles.infoItem}>
            <Ionicons name="navigate" size={16} color={theme.colors.primary.main} />
            <Text style={styles.infoText}>5.2 km</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={theme.colors.success} />
            <Text style={styles.infoText}>18 min</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoItem}>
            <Ionicons name="cash-outline" size={16} color={theme.colors.secondary.main} />
            <Text style={styles.infoText}>Approx ₹180</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.base,
  },
  mapPlaceholder: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F0F4FF',
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.3,
  },
  gridCell: {
    width: '25%',
    height: '25%',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.secondary,
  },
  placeholderSubtext: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.tertiary,
  },
  locationMarker: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pickupMarker: {
    top: '30%',
    left: '25%',
    backgroundColor: theme.colors.success,
  },
  dropMarker: {
    top: '60%',
    right: '20%',
    left: 'auto',
  },
  markerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  dropMarkerIcon: {
    backgroundColor: theme.colors.error,
  },
  markerLabel: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    maxWidth: 140,
    ...theme.shadows.sm,
  },
  markerText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.semiBold,
  },
  routeVisualization: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeLine: {
    position: 'absolute',
    width: 2,
    height: '40%',
    backgroundColor: theme.colors.info,
    opacity: 0.6,
  },
  routeText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.info,
    fontWeight: theme.fontWeights.semiBold,
    marginTop: theme.spacing.md,
  },
  editButton: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.main,
    ...theme.shadows.md,
  },
  editButtonPickup: {
    top: '30%',
    left: '25%',
    marginLeft: -18,
    marginTop: -18,
  },
  editButtonDrop: {
    top: '60%',
    right: '20%',
    marginRight: -18,
    marginTop: -18,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  infoDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.colors.border.light,
  },
});

export default RideMapView;
