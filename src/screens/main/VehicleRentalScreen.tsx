import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Platform,
    Alert,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, Input } from '../../components';
import theme from '../../theme';

type VehicleRentalNavigationProp = StackNavigationProp<RootStackParamList, 'VehicleRental'>;

interface Props {
    navigation: VehicleRentalNavigationProp;
}

type RentalType = 'hourly' | 'daily' | 'weekly';

const VehicleRentalScreen: React.FC<Props> = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const [rentalType, setRentalType] = useState<RentalType>('daily');
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');

    const layout = useMemo(() => {
        const isMobile = width < 640;
        const isTablet = width >= 640 && width < 1024;

        return {
            isMobile,
            isTablet,
            padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
            sectionTitleSize: isMobile ? theme.fontSizes.lg : theme.fontSizes.lg,
            vehicleGridColumns: isMobile ? 2 : isTablet ? 3 : 4,
            vehicleCardPadding: isMobile ? theme.spacing.md : theme.spacing.lg,
        };
    }, [width]);
    // Hourly rental inputs
    const [hourlyStartDate, setHourlyStartDate] = useState('');
    const [hourlyStartTime, setHourlyStartTime] = useState('');
    const [hours, setHours] = useState<number>(4);

    // Daily/Weekly rental inputs
    const [rentalStartDate, setRentalStartDate] = useState('');
    const [rentalEndDate, setRentalEndDate] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');

    const vehicleOptions = [
        { id: 'sedan', name: 'Sedan (Honda City)', price: 599, icon: 'car' },
        { id: 'suv', name: 'SUV (Mahindra Scorpio)', price: 899, icon: 'car-sport' },
        { id: 'hatchback', name: 'Hatchback (Swift)', price: 449, icon: 'car-outline' },
        { id: 'premium', name: 'Premium (Toyota Camry)', price: 1299, icon: 'car-sport-outline' },
    ];

    const hourlyRate = selectedVehicle ? vehicleOptions.find(v => v.id === selectedVehicle)?.price || 0 : 0;
    const dailyRate = selectedVehicle ? vehicleOptions.find(v => v.id === selectedVehicle)?.price || 0 : 0;
    const weeklyRate = selectedVehicle ? (vehicleOptions.find(v => v.id === selectedVehicle)?.price || 0) * 6 : 0; // 10% discount for weekly

    const totalHours = hours;
    const totalDays = useMemo(() => {
        if (rentalStartDate && rentalEndDate) {
            const d1 = new Date(rentalStartDate);
            const d2 = new Date(rentalEndDate);
            const diff = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
            return diff;
        }
        return 1;
    }, [rentalStartDate, rentalEndDate]);

    const totalWeeks = Math.ceil(totalDays / 7);

    const calculateTotal = () => {
        if (!selectedVehicle) return 0;

        switch (rentalType) {
            case 'hourly':
                return hourlyRate * totalHours;
            case 'daily':
                return dailyRate * totalDays;
            case 'weekly':
                return weeklyRate * totalWeeks;
            default:
                return 0;
        }
    };

    const handleBooking = () => {
        if (!selectedVehicle) {
            Alert.alert('Select Vehicle', 'Please select a vehicle type to continue.');
            return;
        }

        if (rentalType === 'hourly' && (!hourlyStartDate || !hourlyStartTime)) {
            Alert.alert('Missing Information', 'Please fill in start date and time for hourly rental.');
            return;
        }

        if ((rentalType === 'daily' || rentalType === 'weekly') && (!rentalStartDate || !rentalEndDate || !pickupLocation)) {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }

        Alert.alert(
            'Booking Confirmed',
            `Vehicle rental booked successfully!\nTotal: ₹${calculateTotal()}\n\nOur team will contact you shortly.`,
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { paddingHorizontal: layout.padding }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={layout.isMobile ? 20 : 24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { fontSize: layout.isMobile ? theme.fontSizes.lg : theme.fontSizes.xl }]}>Book Vehicle</Text>
                    <View style={{ width: layout.isMobile ? 20 : 24 }} />
                    <Text style={styles.sectionTitle}>Rental Type</Text>
                    <View style={styles.typeSelector}>
                        {[
                            { key: 'hourly', label: 'Hourly', icon: 'time-outline' },
                            { key: 'daily', label: 'Daily', icon: 'calendar-outline' },
                            { key: 'weekly', label: 'Weekly', icon: 'calendar' },
                        ].map((type) => (
                            <TouchableOpacity
                                key={type.key}
                                style={[
                                    styles.typeButton,
                                    rentalType === type.key && styles.typeButtonActive,
                                ]}
                                onPress={() => setRentalType(type.key as RentalType)}
                            >
                                <Ionicons
                                    name={type.icon as any}
                                    size={20}
                                    color={rentalType === type.key ? '#FFFFFF' : theme.colors.primary.main}
                                />
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

                {/* Vehicle Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Vehicle</Text>
                    <View style={styles.vehicleGrid}>
                        {vehicleOptions.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.id}
                                style={[
                                    styles.vehicleCard,
                                    selectedVehicle === vehicle.id && styles.vehicleCardSelected,
                                ]}
                                onPress={() => setSelectedVehicle(vehicle.id)}
                            >
                                <Ionicons
                                    name={vehicle.icon as any}
                                    size={32}
                                    color={selectedVehicle === vehicle.id ? '#FFFFFF' : theme.colors.primary.main}
                                />
                                <Text
                                    style={[
                                        styles.vehicleName,
                                        selectedVehicle === vehicle.id && styles.vehicleNameSelected,
                                    ]}
                                >
                                    {vehicle.name}
                                </Text>
                                <Text
                                    style={[
                                        styles.vehiclePrice,
                                        selectedVehicle === vehicle.id && styles.vehiclePriceSelected,
                                    ]}
                                >
                                    ₹{vehicle.price}/{rentalType === 'hourly' ? 'hr' : 'day'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Booking Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Booking Details</Text>

                    {rentalType === 'hourly' ? (
                        <View style={styles.inputGroup}>
                            <Input
                                placeholder="Start Date (DD/MM/YYYY)"
                                value={hourlyStartDate}
                                onChangeText={setHourlyStartDate}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Start Time (HH:MM)"
                                value={hourlyStartTime}
                                onChangeText={setHourlyStartTime}
                                style={styles.input}
                            />
                            <View style={styles.hourSelector}>
                                <Text style={styles.hourLabel}>Hours: {hours}</Text>
                                <View style={styles.hourControls}>
                                    <TouchableOpacity
                                        style={styles.hourButton}
                                        onPress={() => setHours(Math.max(1, hours - 1))}
                                    >
                                        <Ionicons name="remove" size={20} color={theme.colors.primary.main} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.hourButton}
                                        onPress={() => setHours(Math.min(24, hours + 1))}
                                    >
                                        <Ionicons name="add" size={20} color={theme.colors.primary.main} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.inputGroup}>
                            <Input
                                placeholder="Pickup Date (DD/MM/YYYY)"
                                value={rentalStartDate}
                                onChangeText={setRentalStartDate}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Return Date (DD/MM/YYYY)"
                                value={rentalEndDate}
                                onChangeText={setRentalEndDate}
                                style={styles.input}
                            />
                            <Input
                                placeholder="Pickup Location"
                                value={pickupLocation}
                                onChangeText={setPickupLocation}
                                style={styles.input}
                            />
                        </View>
                    )}
                </View>

                {/* Pricing Summary */}
                {selectedVehicle && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pricing Summary</Text>
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    {rentalType === 'hourly' ? `Rate per hour:` : rentalType === 'daily' ? `Rate per day:` : `Rate per week:`}
                                </Text>
                                <Text style={styles.summaryValue}>
                                    ₹{rentalType === 'hourly' ? hourlyRate : rentalType === 'weekly' ? Math.round(weeklyRate / totalWeeks) : dailyRate}
                                </Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>
                                    {rentalType === 'hourly' ? `Total hours:` : rentalType === 'daily' ? `Total days:` : `Total weeks:`}
                                </Text>
                                <Text style={styles.summaryValue}>
                                    {rentalType === 'hourly' ? totalHours : rentalType === 'weekly' ? totalWeeks : totalDays}
                                </Text>
                            </View>
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total Amount:</Text>
                                <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Book Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Book Vehicle"
                        onPress={handleBooking}
                        disabled={!selectedVehicle}
                        style={styles.bookButton}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.secondary,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    headerTitle: {
        fontSize: theme.fontSizes.xl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text.primary,
    },
    section: {
        marginTop: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.semiBold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.primary.main,
        backgroundColor: '#FFFFFF',
        gap: theme.spacing.sm,
    },
    typeButtonActive: {
        backgroundColor: theme.colors.primary.main,
    },
    typeButtonText: {
        fontSize: theme.fontSizes.base,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.primary.main,
    },
    typeButtonTextActive: {
        color: '#FFFFFF',
    },
    vehicleGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
    },
    vehicleCard: {
        flex: 1,
        minWidth: 140,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        ...theme.shadows.sm,
    },
    vehicleCardSelected: {
        borderColor: theme.colors.primary.main,
        backgroundColor: theme.colors.primary.main,
    },
    vehicleName: {
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginTop: theme.spacing.sm,
    },
    vehicleNameSelected: {
        color: '#FFFFFF',
    },
    vehiclePrice: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.xs,
    },
    vehiclePriceSelected: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    inputGroup: {
        gap: theme.spacing.md,
    },
    input: {
        marginBottom: 0,
    },
    hourSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
    },
    hourLabel: {
        fontSize: theme.fontSizes.base,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.text.primary,
    },
    hourControls: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    hourButton: {
        width: 32,
        height: 32,
        borderRadius: theme.borderRadius.full,
        backgroundColor: `${theme.colors.primary.main}15`,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingVertical: theme.spacing.sm,
    },
    summaryLabel: {
        fontSize: theme.fontSizes.base,
        color: theme.colors.text.secondary,
    },
    summaryValue: {
        fontSize: theme.fontSizes.base,
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.text.primary,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.md,
    },
    totalLabel: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text.primary,
    },
    totalValue: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.primary.main,
    },
    buttonContainer: {
        padding: theme.spacing.xl,
        paddingBottom: theme.spacing['2xl'],
    },
    bookButton: {
        marginBottom: 0,
    },
});

export default VehicleRentalScreen;