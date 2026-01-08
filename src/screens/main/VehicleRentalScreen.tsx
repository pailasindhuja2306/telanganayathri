import React, { useState, useMemo } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { DatePicker } from '../../components/DatePicker';

type Props = {
    navigation: StackNavigationProp<any>;
};

type CategoryType = 'vehicle' | 'bike' | null;

interface VehicleOption {
    id: string;
    name: string;
    price: number;
    icon: keyof typeof Ionicons.glyphMap;
    capacity: number;
    features: string[];
}

const vehicleOptions: VehicleOption[] = [
    {
        id: '1',
        name: 'Economy Sedan',
        price: 350,
        icon: 'car-outline',
        capacity: 4,
        features: ['Air Conditioning', 'Power Steering', 'ABS'],
    },
    {
        id: '2',
        name: 'SUV',
        price: 480,
        icon: 'car-outline',
        capacity: 5,
        features: ['Air Conditioning', 'Sunroof', 'Climate Control'],
    },
    {
        id: '3',
        name: 'Hatchback',
        price: 300,
        icon: 'car-outline',
        capacity: 4,
        features: ['Air Conditioning', 'Power Windows', 'Audio System'],
    },
    {
        id: '4',
        name: 'Premium Sedan',
        price: 550,
        icon: 'car-outline',
        capacity: 5,
        features: ['Leather Seats', 'Panoramic Sunroof', 'Premium Sound'],
    },
];

const bikeOptions: VehicleOption[] = [
    {
        id: 'b1',
        name: 'Standard Bike',
        price: 150,
        icon: 'bicycle-outline',
        capacity: 1,
        features: ['Lightweight', 'Manual Gear', 'Helmet Included'],
    },
    {
        id: 'b2',
        name: 'Mountain Bike',
        price: 200,
        icon: 'bicycle-outline',
        capacity: 1,
        features: ['All-Terrain', '21 Gears', 'Suspension'],
    },
    {
        id: 'b3',
        name: 'Electric Bike',
        price: 300,
        icon: 'bicycle-outline',
        capacity: 1,
        features: ['Electric Motor', '50km Range', 'Fast Charging'],
    },
    {
        id: 'b4',
        name: 'Scooter',
        price: 250,
        icon: 'bicycle-outline',
        capacity: 2,
        features: ['Fuel Efficient', 'Easy Parking', 'Storage'],
    },
];

const VehicleRentalScreen: React.FC<Props> = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const [category, setCategory] = useState<CategoryType>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [rentalType, setRentalType] = useState<'hourly' | 'daily' | 'weekly'>('daily');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [hours, setHours] = useState(1);
    const [pickupLocation, setPickupLocation] = useState('');

    const layout = useMemo(() => ({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
    }), [width]);

    const allOptions = category === 'vehicle' ? vehicleOptions : category === 'bike' ? bikeOptions : [];

    const getSelectedData = () => {
        return allOptions.find((v) => v.id === selectedOption);
    };

    const getHourlyPrice = (): number => {
        const selected = getSelectedData();
        return selected?.price || 0;
    };

    const getDailyPrice = (): number => {
        return getHourlyPrice() * 24;
    };

    const getWeeklyPrice = (): number => {
        return getDailyPrice() * 6;
    };

    const calculateTotal = (): number => {
        const selected = getSelectedData();
        if (!selected) return 0;

        if (rentalType === 'hourly') {
            return getHourlyPrice() * hours;
        } else if (rentalType === 'daily') {
            return getDailyPrice();
        } else {
            return getWeeklyPrice();
        }
    };

    const handleBooking = () => {
        if (!selectedOption) {
            Alert.alert('Error', 'Please select a vehicle/bike');
            return;
        }
        if (!pickupLocation.trim()) {
            Alert.alert('Error', 'Please enter pickup location');
            return;
        }
        Alert.alert('Success', `Booking ${getSelectedData()?.name} for ${rentalType}`);
    };

    // Show category selection
    if (!category) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Rent</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Hero Banner */}
                    <LinearGradient
                        colors={[theme.colors.primary.main, theme.colors.primary.dark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroBanner}
                    >
                        <Ionicons name="key-outline" size={56} color="#FFFFFF" />
                        <Text style={styles.heroTitle}>Choose Your Rental</Text>
                        <Text style={styles.heroSubtitle}>Select a vehicle or bike to get started</Text>
                    </LinearGradient>

                    {/* Category Cards */}
                    <View style={styles.categoryContainer}>
                        <CategoryCard
                            icon="car-outline"
                            title="4-Wheel Vehicles"
                            subtitle="Cars & SUVs"
                            description="4-5 seater vehicles for comfortable travel"
                            color={theme.colors.primary.main}
                            onPress={() => setCategory('vehicle')}
                        />
                        <CategoryCard
                            icon="bicycle-outline"
                            title="2-Wheel Vehicles"
                            subtitle="Bikes & Scooters"
                            description="Fast and eco-friendly options"
                            color={theme.colors.accent.main}
                            onPress={() => setCategory('bike')}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    // Show options selection
    const selectedData = getSelectedData();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        setCategory(null);
                        setSelectedOption(null);
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {category === 'vehicle' ? 'Rent a Vehicle' : 'Rent a Bike'}
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Step 2 Header */}
                <View style={styles.stepContainer}>
                    <View style={styles.stepBadge}>
                        <Text style={styles.stepText}>Step 2</Text>
                    </View>
                    <Text style={styles.stepTitle}>Choose Your {category === 'vehicle' ? 'Vehicle' : 'Bike'}</Text>
                </View>

                {/* Vehicle/Bike Options Grid */}
                <View style={[
                    styles.optionsGrid,
                    layout.isMobile && styles.optionsGridMobile,
                    layout.isTablet && styles.optionsGridTablet,
                ]}>
                    {allOptions.map((option) => (
                        <VehicleCard
                            key={option.id}
                            option={option}
                            isSelected={selectedOption === option.id}
                            onPress={() => setSelectedOption(option.id)}
                            layout={layout}
                        />
                    ))}
                </View>

                {selectedData && (
                    <>
                        {/* Rental Type Selection */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Rental Duration</Text>
                            <View style={styles.rentalTypeContainer}>
                                {(['hourly', 'daily', 'weekly'] as const).map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[
                                            styles.rentalTypeButton,
                                            rentalType === type && styles.rentalTypeButtonActive,
                                        ]}
                                        onPress={() => setRentalType(type)}
                                    >
                                        <Text
                                            style={[
                                                styles.rentalTypeText,
                                                rentalType === type && styles.rentalTypeTextActive,
                                            ]}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </Text>
                                        <Text style={[
                                            styles.rentalTypePrice,
                                            rentalType === type && styles.rentalTypePriceActive,
                                        ]}>
                                            ₹{type === 'hourly' ? getHourlyPrice() : type === 'daily' ? getDailyPrice() : getWeeklyPrice()}/
                                            {type === 'hourly' ? 'hr' : type === 'daily' ? 'day' : 'week'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Rental Details Form */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Booking Details</Text>

                            <Input
                                placeholder="Pickup Location"
                                value={pickupLocation}
                                onChangeText={setPickupLocation}
                            />

                            {rentalType === 'hourly' ? (
                                <View style={styles.formRow}>
                                    <View style={[styles.formField, { flex: 1 }]}>
                                        <Text style={styles.label}>Start Time</Text>
                                        <Input
                                            placeholder="HH:MM"
                                            value={startTime}
                                            onChangeText={setStartTime}
                                        />
                                    </View>
                                    <View style={[styles.formField, { flex: 1, marginLeft: theme.spacing.md }]}>
                                        <Text style={styles.label}>Duration (Hours)</Text>
                                        <Input
                                            placeholder="1"
                                            value={hours.toString()}
                                            onChangeText={(val) => setHours(parseInt(val) || 1)}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.formRow}>
                                    <View style={[styles.formField, { flex: 1 }]}>
                                        <Text style={styles.label}>Start Date</Text>
                                        <DatePicker
                                            value={startDate}
                                            onChange={setStartDate}
                                            placeholder="Select start date"
                                        />
                                    </View>
                                    <View style={[styles.formField, { flex: 1, marginLeft: theme.spacing.md }]}>
                                        <Text style={styles.label}>End Date</Text>
                                        <DatePicker
                                            value={endDate}
                                            onChange={setEndDate}
                                            placeholder="Select end date"
                                        />
                                    </View>
                                </View>
                            )}
                        </View>

                        {/* Price Breakdown */}
                        <View style={styles.priceBreakdown}>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Subtotal</Text>
                                <Text style={styles.priceValue}>₹{calculateTotal()}</Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.priceLabel}>Taxes & Fees</Text>
                                <Text style={styles.priceValue}>₹{Math.round(calculateTotal() * 0.05)}</Text>
                            </View>
                            <View style={[styles.priceRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalPrice}>₹{Math.round(calculateTotal() * 1.05)}</Text>
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Proceed to Payment"
                                onPress={handleBooking}
                                variant="primary"
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

// Category Card Component
interface CategoryCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    icon,
    title,
    subtitle,
    description,
    color,
    onPress,
}) => (
    <TouchableOpacity style={styles.categoryCard} onPress={onPress}>
        <LinearGradient
            colors={[color + '20', color + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.categoryCardGradient}
        >
            <View style={[styles.categoryCardIcon, { backgroundColor: color + '30' }]}>
                <Ionicons name={icon} size={32} color={color} />
            </View>
            <View style={styles.categoryCardContent}>
                <Text style={styles.categoryCardTitle}>{title}</Text>
                <Text style={styles.categoryCardSubtitle}>{subtitle}</Text>
                <Text style={styles.categoryCardDescription}>{description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={color} />
        </LinearGradient>
    </TouchableOpacity>
);

// Vehicle Card Component
interface VehicleCardProps {
    option: VehicleOption;
    isSelected: boolean;
    onPress: () => void;
    layout: { isMobile: boolean; isTablet: boolean };
}

const VehicleCard: React.FC<VehicleCardProps> = ({
    option,
    isSelected,
    onPress,
    layout,
}) => {
    const cardWidth = layout.isMobile ? '47%' : layout.isTablet ? '32%' : '24%';
    
    return (
        <TouchableOpacity
            style={[
                styles.vehicleCardNew,
                { width: cardWidth },
                isSelected && styles.vehicleCardNewActive,
            ]}
            onPress={onPress}
        >
            <LinearGradient
                colors={isSelected ? [theme.colors.primary.main, theme.colors.primary.dark] : ['#F8F9FA', '#FFFFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.vehicleCardContent}
            >
                {/* Icon */}
                <View
                    style={[
                        styles.vehicleCardIcon,
                        { backgroundColor: isSelected ? theme.colors.primary.light + '40' : theme.colors.primary.main + '15' },
                    ]}
                >
                    <Ionicons
                        name={option.icon}
                        size={32}
                        color={isSelected ? '#FFFFFF' : theme.colors.primary.main}
                    />
                </View>

                {/* Badge */}
                {option.name.includes('Premium') && (
                    <View style={styles.vehicleCardBadge}>
                        <Text style={styles.vehicleCardBadgeText}>Premium</Text>
                    </View>
                )}

                {/* Content */}
                <Text style={[styles.vehicleCardName, isSelected && styles.vehicleCardNameActive]}>
                    {option.name}
                </Text>

                {/* Features */}
                <View style={styles.vehicleCardFeatures}>
                    <Text style={[styles.vehicleCardFeatureText, isSelected && styles.vehicleCardFeatureTextActive]}>
                        {option.capacity} Seater
                    </Text>
                    <Text style={[styles.vehicleCardFeatureText, isSelected && styles.vehicleCardFeatureTextActive]}>
                        •
                    </Text>
                    <Text style={[styles.vehicleCardFeatureText, isSelected && styles.vehicleCardFeatureTextActive]}>
                        ₹{option.price}
                    </Text>
                </View>

                {/* Checkmark */}
                {isSelected && (
                    <View style={styles.vehicleCardCheckmark}>
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
    },
    backButton: {
        padding: theme.spacing.sm,
        marginLeft: -theme.spacing.sm,
    },
    headerTitle: {
        fontSize: theme.fontSizes.lg,
        fontWeight: '700',
        color: theme.colors.text.primary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl * 2,
    },

    // Hero Banner
    heroBanner: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xl * 2,
        marginHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
    },
    heroTitle: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '700',
        color: '#FFFFFF',
        marginTop: theme.spacing.md,
    },
    heroSubtitle: {
        fontSize: theme.fontSizes.sm,
        color: '#FFFFFF',
        marginTop: theme.spacing.xs,
        opacity: 0.9,
    },

    // Category Cards
    categoryContainer: {
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    categoryCard: {
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
    },
    categoryCardGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    categoryCardIcon: {
        width: 56,
        height: 56,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryCardContent: {
        flex: 1,
    },
    categoryCardTitle: {
        fontSize: theme.fontSizes.base,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    categoryCardSubtitle: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
    },
    categoryCardDescription: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.text.secondary,
    },

    // Step Container
    stepContainer: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        backgroundColor: '#F8F9FA',
        marginBottom: theme.spacing.md,
    },
    stepBadge: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.primary.light,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
        marginBottom: theme.spacing.md,
    },
    stepText: {
        fontSize: theme.fontSizes.xs,
        fontWeight: '700',
        color: theme.colors.primary.main,
    },
    stepTitle: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '700',
        color: theme.colors.text.primary,
        letterSpacing: -0.5,
    },

    // Options Grid
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    optionsGridMobile: {
        paddingHorizontal: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    optionsGridTablet: {
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    vehicleCardNew: {
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        ...theme.shadows.md,
    },
    vehicleCardNewActive: {
        ...theme.shadows.lg,
    },
    vehicleCardContent: {
        alignItems: 'center',
        padding: theme.spacing.lg,
        minHeight: 240,
        justifyContent: 'space-between',
    },
    vehicleCardIcon: {
        width: 72,
        height: 72,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
    },
    vehicleCardBadge: {
        position: 'absolute',
        top: theme.spacing.md,
        right: theme.spacing.md,
        backgroundColor: theme.colors.warning,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.full,
    },
    vehicleCardBadgeText: {
        fontSize: theme.fontSizes.xs,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    vehicleCardName: {
        fontSize: theme.fontSizes.base,
        fontWeight: '700',
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    vehicleCardNameActive: {
        color: '#FFFFFF',
    },
    vehicleCardFeatures: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    vehicleCardFeatureText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colors.text.secondary,
    },
    vehicleCardFeatureTextActive: {
        color: '#FFFFFF',
        opacity: 0.95,
    },
    vehicleCardCheckmark: {
        position: 'absolute',
        bottom: theme.spacing.md,
        right: theme.spacing.md,
        backgroundColor: theme.colors.success,
        width: 32,
        height: 32,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.md,
    },

    // Section
    section: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.fontSizes.base,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
    },

    // Rental Type
    rentalTypeContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    rentalTypeButton: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        backgroundColor: '#F8F9FA',
        borderWidth: 2,
        borderColor: 'transparent',
        alignItems: 'center',
    },
    rentalTypeButtonActive: {
        backgroundColor: theme.colors.primary.main,
        borderColor: theme.colors.primary.main,
    },
    rentalTypeText: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    rentalTypeTextActive: {
        color: '#FFFFFF',
    },
    rentalTypePrice: {
        fontSize: theme.fontSizes.xs,
        color: theme.colors.text.secondary,
    },
    rentalTypePriceActive: {
        color: '#FFFFFF',
        opacity: 0.9,
    },

    // Form
    formRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
    },
    formField: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },

    // Price Breakdown
    priceBreakdown: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,
        backgroundColor: '#F8F9FA',
        borderRadius: theme.borderRadius.lg,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    priceLabel: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text.secondary,
    },
    priceValue: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    totalRow: {
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border.light,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: theme.fontSizes.base,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    totalPrice: {
        fontSize: theme.fontSizes.xl,
        fontWeight: '700',
        color: theme.colors.primary.main,
    },

    // Button Container
    buttonContainer: {
        paddingHorizontal: theme.spacing.lg,
        gap: theme.spacing.md,
    },
});

export default VehicleRentalScreen;
