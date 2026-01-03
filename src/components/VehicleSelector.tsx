import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';
export interface Vehicle {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  capacity: string;
  eta: string;
  basePrice: number;
  pricePerKm: number;
  description: string;
  color: string;
}

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  onSelectVehicle: (vehicleId: string, price: number) => void;
  distance?: number;
  disabled?: boolean;
  estimatedFare?: number;
  scrollEnabled?: boolean;
  showHeader?: boolean;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicleId,
  onSelectVehicle,
  distance = 5,
  disabled = false,
  estimatedFare,
  scrollEnabled = false,
  showHeader = true,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const isWide = screenWidth > 900;

  const calculatePrice = (vehicle: Vehicle) => {
    return estimatedFare || Math.round(vehicle.basePrice + vehicle.pricePerKm * distance);
  };

  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Ionicons name="car" size={20} color={theme.colors.primary.main} />
          <Text style={styles.title}>Choose a Vehicle</Text>
        </View>
      )}

      {scrollEnabled ? (
        <ScrollView
          showsVerticalScrollIndicator
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle.id;
            const price = calculatePrice(vehicle);

            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  isWide ? styles.vehicleCardWide : styles.vehicleCardNarrow,
                  isSelected && styles.vehicleCardSelected,
                ]}
                onPress={() => onSelectVehicle(vehicle.id, price)}
                disabled={disabled}
                activeOpacity={0.9}
              >
                {isSelected && (
                  <View style={styles.selectionBadge}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                  </View>
                )}

                <View style={styles.cardRow}>
                  <View style={styles.cardLeft}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${vehicle.color}15` },
                      ]}
                    >
                      <Ionicons name={vehicle.icon} size={40} color={vehicle.color} />
                    </View>

                    <View style={styles.cardInfo}>
                      <Text style={styles.vehicleName}>{vehicle.name}</Text>
                      <View style={styles.badgeRow}>
                        <View style={styles.capacityBadge}>
                          <Ionicons name="people" size={14} color={theme.colors.text.secondary} />
                          <Text style={styles.capacityText}>{vehicle.capacity}</Text>
                        </View>
                        <View style={styles.etaContainer}>
                          <Ionicons name="time-outline" size={14} color={theme.colors.success} />
                          <Text style={styles.etaText}>{vehicle.eta}</Text>
                        </View>
                      </View>
                      <Text style={styles.description} numberOfLines={2}>
                        {vehicle.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.price}>₹{price}</Text>
                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        isSelected && styles.selectButtonActive,
                      ]}
                      onPress={() => onSelectVehicle(vehicle.id, price)}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          isSelected && styles.selectButtonTextActive,
                        ]}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.scrollContent}>
          {vehicles.map((vehicle) => {
            const isSelected = selectedVehicleId === vehicle.id;
            const price = calculatePrice(vehicle);

            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  isWide ? styles.vehicleCardWide : styles.vehicleCardNarrow,
                  isSelected && styles.vehicleCardSelected,
                ]}
                onPress={() => onSelectVehicle(vehicle.id, price)}
                disabled={disabled}
                activeOpacity={0.9}
              >
                {isSelected && (
                  <View style={styles.selectionBadge}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                  </View>
                )}

                <View style={styles.cardRow}>
                  <View style={styles.cardLeft}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${vehicle.color}15` },
                      ]}
                    >
                      <Ionicons name={vehicle.icon} size={40} color={vehicle.color} />
                    </View>

                    <View style={styles.cardInfo}>
                      <Text style={styles.vehicleName}>{vehicle.name}</Text>
                      <View style={styles.badgeRow}>
                        <View style={styles.capacityBadge}>
                          <Ionicons name="people" size={14} color={theme.colors.text.secondary} />
                          <Text style={styles.capacityText}>{vehicle.capacity}</Text>
                        </View>
                        <View style={styles.etaContainer}>
                          <Ionicons name="time-outline" size={14} color={theme.colors.success} />
                          <Text style={styles.etaText}>{vehicle.eta}</Text>
                        </View>
                      </View>
                      <Text style={styles.description} numberOfLines={2}>
                        {vehicle.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.price}>₹{price}</Text>
                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        isSelected && styles.selectButtonActive,
                      ]}
                      onPress={() => onSelectVehicle(vehicle.id, price)}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          isSelected && styles.selectButtonTextActive,
                        ]}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {selectedVehicleId && (
        <View style={styles.selectedDetails}>
          {(() => {
            const selected = vehicles.find((v) => v.id === selectedVehicleId);
            if (!selected) return null;

            return (
              <View style={styles.detailsContent}>
                <View style={styles.detailsHeader}>
                  <Text style={styles.detailsTitle}>{selected.name} - Details</Text>
                  <Ionicons name="information-circle-outline" size={18} color={theme.colors.info} />
                </View>

                <Text style={styles.detailsDescription}>{selected.description}</Text>

                {typeof distance === 'number' && (
                  <View style={styles.priceBreakdown}>
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Distance</Text>
                      <Text style={styles.breakdownValue}>{distance} km</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Base Fare</Text>
                      <Text style={styles.breakdownValue}>₹{selected.basePrice}</Text>
                    </View>
                    <View style={styles.breakdownRow}>
                      <Text style={styles.breakdownLabel}>Distance Charge</Text>
                      <Text style={styles.breakdownValue}>₹{Math.round(selected.pricePerKm * distance)}</Text>
                    </View>
                    <View style={[styles.breakdownRow, styles.breakdownDivider]} />
                    <View style={[styles.breakdownRow, styles.breakdownTotal]}>
                      <Text style={styles.breakdownTotalLabel}>Total Fare</Text>
                      <Text style={styles.breakdownTotalValue}>₹{calculatePrice(selected)}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  vehicleCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    minHeight: 100,
    marginBottom: theme.spacing.md,
    width: '100%',
    ...theme.shadows.sm,
  },
  vehicleCardNarrow: {
    width: '100%',
  },
  vehicleCardWide: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: theme.spacing.md,
    minWidth: 0,
  },
  cardInfo: {
    flex: 1,
    gap: 8,
    justifyContent: 'flex-start',
    minWidth: 0,
  },
  cardRight: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    justifyContent: 'center',
    minWidth: 95,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  vehicleCardSelected: {
    borderColor: theme.colors.primary.main,
    borderWidth: 2,
    backgroundColor: `${theme.colors.primary.main}12`,
    ...theme.shadows.md,
  },
  selectionBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.background.primary,
    borderRadius: 12,
    padding: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  vehicleName: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  capacityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    gap: 3,
  },
  capacityText: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  etaText: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: theme.fontSizes['2xs'],
    color: theme.colors.text.secondary,
    lineHeight: 14,
  },
  price: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  selectButton: {
    minWidth: 85,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonActive: {
    backgroundColor: theme.colors.primary.main,
  },
  selectButtonText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
    textAlign: 'center',
  },
  selectButtonTextActive: {
    color: theme.colors.primary.contrast,
  },
  selectedDetails: {
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary.main,
  },
  detailsContent: {
    gap: theme.spacing.md,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  detailsTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  detailsDescription: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  priceBreakdown: {
    gap: theme.spacing.xs,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  breakdownValue: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeights.semiBold,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.xs,
  },
  breakdownTotal: {
    marginTop: theme.spacing.xs,
  },
  breakdownTotalLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
    fontWeight: theme.fontWeights.semiBold,
  },
  breakdownTotalValue: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.bold,
  },
});

export default VehicleSelector;
