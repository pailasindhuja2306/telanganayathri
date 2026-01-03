import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

type Props = {
    navigation: StackNavigationProp<any>;
};

interface VehicleOption {
    id: string;
    name: string;
    price: number;
    icon: string;
    capacity: number;
    features: string[];
}

const vehicleOptions: VehicleOption[] = [
    {
        id: '1',
        name: 'Economy Sedan',
        price: 350,
        icon: 'car',
        capacity: 4,
        features: ['Air Conditioning', 'Power Steering', 'ABS'],
    },
    {
        id: '2',
        name: 'SUV',
        price: 380,
        icon: 'car',
        capacity: 5,
        features: ['Air Conditioning', 'Sunroof', 'Climate Control'],
    },
    {
        id: '3',
        name: 'Hatchback',
        price: 300,
        icon: 'car',
        capacity: 4,
        features: ['Air Conditioning', 'Power Windows', 'Audio System'],
    },
    {
        id: '4',
        name: 'Premium Sedan',
        price: 400,
        icon: 'car',
        capacity: 5,
        features: ['Leather Seats', 'Panoramic Sunroof', 'Premium Sound'],
    },
];

const VehicleRentalScreen: React.FC<Props> = ({ navigation }) => {
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [rentalType, setRentalType] = useState<'hourly' | 'daily' | 'weekly'>('daily');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [hours, setHours] = useState(1);
    const [pickupLocation, setPickupLocation] = useState('');

    const getSelectedVehicleData = () => {
        return vehicleOptions.find((v) => v.id === selectedVehicle);
    };

    // Calculate prices based on hourly rate
    const getHourlyPrice = (): number => {
        const vehicle = getSelectedVehicleData();
        return vehicle?.price || 0;
    };

    const getDailyPrice = (): number => {
        return getHourlyPrice() * 24; // 24 hours
    };

    const getWeeklyPrice = (): number => {
        return getDailyPrice() * 6; // 6 days (1 day discount per week)
    };

    const calculateTotal = (): number => {
        const vehicle = getSelectedVehicleData();
        if (!vehicle) return 0;

        if (rentalType === 'hourly') {
            return getHourlyPrice() * hours;
        } else if (rentalType === 'daily') {
            return getDailyPrice();
        } else {
            return getWeeklyPrice();
        }
    };

    const handleBooking = () => {
        if (!selectedVehicle) return;
        console.log('Booking:', { selectedVehicle, rentalType, startDate, endDate });
        // Navigate to confirmation or payment screen
    };

    const selectedVehicleData = getSelectedVehicleData();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={theme.colors.primary.main}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rent a Vehicle</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Rental Type Selector */}
                <View style={styles.typeContainer}>
                    <Text style={styles.containerLabel}>Rental Type</Text>
                    <View style={styles.typeButtonGroup}>
                        {[
                            { key: 'hourly', label: '⏱ Hourly', icon: 'time' },
                            { key: 'daily', label: '📅 Daily', icon: 'calendar' },
                            { key: 'weekly', label: '📦 Weekly', icon: 'calendar-outline' },
                        ].map((type) => (
                            <TouchableOpacity
                                key={type.key}
                                style={[
                                    styles.typeButton,
                                    rentalType === type.key && styles.typeButtonActive,
                                ]}
                                onPress={() => setRentalType(type.key as any)}
                            >
                                <Text
                                    style={[
                                        styles.typeButtonText,
                                        rentalType === type.key && styles.typeButtonTextActive,
                                    ]}
                                >
                                    {type.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Rental Details Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.containerLabel}>When & Where</Text>
                    {rentalType === 'hourly' ? (
                        <>
                            <View style={styles.inputRow}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>Start Date</Text>
                                    <Input
                                        placeholder="DD/MM/YYYY"
                                        value={startDate}
                                        onChangeText={setStartDate}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>Start Time</Text>
                                    <Input
                                        placeholder="HH:MM"
                                        value={startTime}
                                        onChangeText={setStartTime}
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                            <View style={styles.hourSelectorContainer}>
                                <View style={styles.hourSelectorLabel}>
                                    <Text style={styles.inputLabel}>Duration</Text>
                                    <Text style={styles.hourValue}>{hours}h</Text>
                                </View>
                                <View style={styles.hourButtons}>
                                    <TouchableOpacity
                                        style={styles.hourBtn}
                                        onPress={() => setHours(Math.max(1, hours - 1))}
                                    >
                                        <Ionicons name="remove" size={18} color={theme.colors.primary.main} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.hourBtn}
                                        onPress={() => setHours(Math.min(24, hours + 1))}
                                    >
                                        <Ionicons name="add" size={18} color={theme.colors.primary.main} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.inputRow}>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>Start Date</Text>
                                    <Input
                                        placeholder="DD/MM/YYYY"
                                        value={startDate}
                                        onChangeText={setStartDate}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.inputHalf}>
                                    <Text style={styles.inputLabel}>End Date</Text>
                                    <Input
                                        placeholder="DD/MM/YYYY"
                                        value={endDate}
                                        onChangeText={setEndDate}
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                    <Text style={styles.inputLabel}>Pickup Location</Text>
                    <Input
                        placeholder="Enter pickup location"
                        value={pickupLocation}
                        onChangeText={setPickupLocation}
                        style={styles.input}
                    />
                </View>

                {/* Vehicle Selection */}
                <View style={styles.vehicleContainer}>
                    <Text style={styles.containerLabel}>Select Vehicle</Text>
                    <View style={styles.vehicleStack}>
                        {vehicleOptions.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.id}
                                style={[
                                    styles.vehicleCard,
                                    selectedVehicle === vehicle.id && styles.vehicleCardSelected,
                                ]}
                                onPress={() => setSelectedVehicle(vehicle.id)}
                            >
                                {/* Vehicle Image Placeholder */}
                                <View style={styles.vehicleImagePlaceholder}>
                                    <Ionicons name="car" size={48} color={theme.colors.primary.main} />
                                </View>

                                {/* Vehicle Info */}
                                <View style={styles.vehicleInfo}>
                                    <View style={styles.vehicleHeader}>
                                        <Text style={styles.vehicleName}>{vehicle.name}</Text>
                                        <View style={styles.capacityBadge}>
                                            <Ionicons name="people" size={14} color="#666" />
                                            <Text style={styles.capacityText}>{vehicle.capacity}</Text>
                                        </View>
                                    </View>

                                    {/* Features */}
                                    <View style={styles.featuresList}>
                                        {vehicle.features.map((feature, idx) => (
                                            <View key={idx} style={styles.featureItem}>
                                                <Ionicons name="checkmark-circle" size={12} color={theme.colors.primary.main} />
                                                <Text style={styles.featureText}>{feature}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    {/* Price */}
                                    <View style={styles.priceRow}>
                                        <Text style={styles.priceLabel}>
                                            ₹{vehicle.price}
                                            <Text style={styles.priceUnit}>
                                                /{rentalType === 'hourly' ? 'hr' : rentalType === 'daily' ? '/day' : '/week'}
                                            </Text>
                                        </Text>
                                        <View
                                            style={[
                                                styles.selectCheckmark,
                                                selectedVehicle === vehicle.id && styles.selectCheckmarkActive,
                                            ]}
                                        >
                                            {selectedVehicle === vehicle.id && (
                                                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Pricing Summary */}
                {selectedVehicle && selectedVehicleData && (
                    <View style={styles.summaryContainer}>
                        <Text style={styles.containerLabel}>Pricing Summary</Text>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    {rentalType === 'hourly'
                                        ? 'Rate per hour'
                                        : rentalType === 'daily'
                                            ? 'Rate per day'
                                            : 'Rate per week'}
                                </Text>
                                <Text style={styles.summaryValue}>
                                    ₹{rentalType === 'hourly' ? getHourlyPrice() : rentalType === 'daily' ? getDailyPrice() : getWeeklyPrice()}
                                </Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    {rentalType === 'hourly' ? 'Hours' : rentalType === 'daily' ? 'Days' : 'Weeks'}
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {rentalType === 'hourly' ? hours : 1}
                                </Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Spacing for fixed button */}
                <View style={{ height: 80 }} />
            </ScrollView>

            {/* Fixed Footer Button */}
            {selectedVehicle && selectedVehicleData && (
                <View style={styles.footerButtonContainer}>
                    <View style={styles.footerContent}>
                        <View>
                            <Text style={styles.footerLabel}>Total</Text>
                            <Text style={styles.footerPrice}>₹{calculateTotal()}</Text>
                        </View>
                        <Button
                            title="Confirm Rental"
                            onPress={handleBooking}
                            style={styles.confirmButton}
                        />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    headerTitle: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },

    // Type Container Styles
    typeContainer: {
        marginBottom: theme.spacing.xl,
    },
    containerLabel: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },
    typeButtonGroup: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    typeButton: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.base,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1.5,
        borderColor: theme.colors.border.light,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    typeButtonActive: {
        borderColor: theme.colors.primary.main,
        backgroundColor: `${theme.colors.primary.main}10`,
    },
    typeButtonText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '500',
        color: theme.colors.text.primary,
    },
    typeButtonTextActive: {
        color: theme.colors.primary.main,
        fontWeight: '600',
    },

    // Input Container Styles
    inputContainer: {
        marginBottom: theme.spacing.xl,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
    },
    inputLabel: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '500',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    input: {
        marginBottom: 0,
    },
    inputRow: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    inputHalf: {
        flex: 1,
    },
    hourSelectorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
        marginTop: theme.spacing.md,
    },
    hourSelectorLabel: {
        flex: 1,
    },
    hourValue: {
        fontSize: theme.fontSizes.lg,
        fontWeight: '600',
        color: theme.colors.primary.main,
        marginTop: theme.spacing.xs,
    },
    hourButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    hourBtn: {
        width: 40,
        height: 40,
        borderRadius: theme.borderRadius.full,
        backgroundColor: `${theme.colors.primary.main}15`,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Vehicle Container Styles
    vehicleContainer: {
        marginBottom: theme.spacing.xl,
    },
    vehicleStack: {
        gap: theme.spacing.md,
    },
    vehicleCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: theme.colors.border.light,
        ...theme.shadows.md,
    },
    vehicleCardSelected: {
        borderColor: theme.colors.primary.main,
        backgroundColor: `${theme.colors.primary.main}05`,
    },
    vehicleImagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: `${theme.colors.primary.main}15`,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: theme.colors.border.light,
    },
    vehicleInfo: {
        flex: 1,
        padding: theme.spacing.md,
        justifyContent: 'space-between',
    },
    vehicleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    vehicleName: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
        flex: 1,
    },
    capacityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        backgroundColor: '#F5F5F5',
        borderRadius: theme.borderRadius.full,
    },
    capacityText: {
        fontSize: theme.fontSizes.xs,
        color: '#666',
        fontWeight: '500',
    },
    featuresList: {
        marginBottom: theme.spacing.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    featureText: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.text.secondary,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.primary.main,
    },
    priceUnit: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '400',
    },
    selectCheckmark: {
        width: 24,
        height: 24,
        borderRadius: theme.borderRadius.full,
        borderWidth: 2,
        borderColor: theme.colors.border.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectCheckmarkActive: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },

    // Summary Container Styles
    summaryContainer: {
        marginBottom: theme.spacing.xl,
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        ...theme.shadows.sm,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border.light,
        marginVertical: theme.spacing.sm,
    },
    summaryLabel: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text.secondary,
    },
    summaryValue: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    totalRow: {
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
    },
    totalLabel: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    totalValue: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '700',
        color: theme.colors.primary.main,
    },

    // Footer Button Styles
    footerButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
        ...theme.shadows.lg,
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: theme.spacing.md,
    },
    footerLabel: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text.secondary,
    },
    footerPrice: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '700',
        color: theme.colors.primary.main,
    },
    confirmButton: {
        minWidth: 160,
        marginBottom: 0,
    },
});

export default VehicleRentalScreen;
