import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button } from '../../components';
import theme from '../../theme';

// Import local images
const pic1 = require('./pic1.jpeg');
const pic2 = require('./pic2.jpeg');
const pic3 = require('./pic3.jpeg');    
const pic4 = require('./pic4.jpeg');

type TourPackagesNavigationProp = StackNavigationProp<RootStackParamList, 'TourPackages'>;

interface Props {
  navigation: TourPackagesNavigationProp;
}

interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  originalPrice?: number;
  places: string[];
  icon: keyof typeof Ionicons.glyphMap;
  image?: string;
  popular?: boolean;
  highlights: string[];
  rating: number;
  reviews: number;
}

const tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Hyderabad Heritage Tour',
    duration: '4 hours',
    price: 1299,
    originalPrice: 1599,
    places: ['Charminar', 'Golconda Fort', 'Qutub Shahi Tombs'],
    icon: 'business-outline',
    image: pic1,
    popular: true,
    highlights: ['Historic sites', 'Expert guide', 'Snacks included'],
    rating: 4.8,
    reviews: 1250,
  },
  {
    id: '2',
    title: 'Ramoji Film City',
    duration: '8 hours',
    price: 1899,
    originalPrice: 2299,
    places: ['Film City Tour', 'Shows', 'Lunch Included'],
    icon: 'film-outline',
    image: pic2,
    popular: true,
    highlights: ['Movie sets', 'Photo ops', 'Lunch included'],
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: '3',
    title: 'Spiritual Telangana',
    duration: '6 hours',
    price: 1599,
    places: ['Birla Mandir', 'Mecca Masjid', 'Sanghi Temple'],
    icon: 'moon-outline',
    image: pic3,
    highlights: ['Temple visits', 'Peaceful moments', 'Photos allowed'],
    rating: 4.7,
    reviews: 890,
  },
  {
    id: '4',
    title: 'City Shopping Tour',
    duration: '5 hours',
    price: 999,
    places: ['Laad Bazaar', 'Begum Bazaar', 'Shilparamam'],
    icon: 'bag-handle-outline',
    image: pic4,
    highlights: ['Famous markets', 'Shopping tips', 'Snacks break'],
    rating: 4.6,
    reviews: 650,
  },
  {
    id: '5',
    title: 'Food Trail Hyderabad',
    duration: '5 hours',
    price: 1199,
    originalPrice: 1499,
    places: ['Paradise Biryani', 'Irani Chai', 'Charminar Street Food'],
    icon: 'restaurant-outline',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop&q=80',
    highlights: ['Authentic food', 'Multiple stops', 'Local favorites'],
    rating: 4.9,
    reviews: 1560,
  },
  {
    id: '6',
    title: 'Lakes & Parks Tour',
    duration: '4 hours',
    price: 899,
    places: ['Hussain Sagar', 'Lumbini Park', 'NTR Gardens'],
    icon: 'water-outline',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&q=80',
    highlights: ['Scenic views', 'Relaxing', 'Photo spots'],
    rating: 4.5,
    reviews: 420,
  },
];

const TourPackagesScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;

  const layout = useMemo(() => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      isMobile,
      isTablet,
      isDesktop,
      padding: isMobile ? theme.spacing.base : isTablet ? theme.spacing.lg : theme.spacing.xl,
      cardPadding: isMobile ? theme.spacing.base : theme.spacing.lg,
      columns: isDesktop ? 2 : 1,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
    };
  }, [width]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tour Packages</Text>
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
          <Ionicons name="search" size={22} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: layout.padding }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Hero Banner with Gradient */}
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="map" size={layout.isMobile ? 44 : 56} color="#FFFFFF" />
          </View>
          <Text style={[styles.heroTitle, { fontSize: layout.titleSize }]}>
            Explore Telangana
          </Text>
          <Text style={styles.heroSubtitle}>
            Curated tours with expert drivers & unforgettable experiences
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>50+</Text>
              <Text style={styles.heroStatLabel}>Tours</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>10K+</Text>
              <Text style={styles.heroStatLabel}>Happy Tourists</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>4.8★</Text>
              <Text style={styles.heroStatLabel}>Rating</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          <FilterChip label="All Tours" active />
          <FilterChip label="Popular" icon="star" />
          <FilterChip label="Heritage" icon="business-outline" />
          <FilterChip label="Food" icon="restaurant-outline" />
          <FilterChip label="Nature" icon="leaf-outline" />
        </ScrollView>

        {/* Popular Packages Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontSize: layout.isMobile ? theme.fontSizes.lg : theme.fontSizes.xl }]}>
              Popular Packages
            </Text>
            <Text style={styles.sectionCount}>{tourPackages.filter(p => p.popular).length} tours</Text>
          </View>
          
          <View style={layout.isDesktop ? styles.packagesGrid : styles.packagesList}>
            {tourPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                index={index}
                isDesktop={layout.isDesktop}
                isMobile={layout.isMobile}
              />
            ))}
          </View>
        </View>

        {/* Custom Tour Section */}
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={[theme.colors.accent.main + '20', theme.colors.primary.main + '10']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.customTourCard}
          >
            <View style={styles.customTourContent}>
              <LinearGradient
                colors={[theme.colors.primary.main, theme.colors.accent.main]}
                style={styles.customTourIcon}
              >
                <Ionicons name="create-outline" size={32} color="#FFFFFF" />
              </LinearGradient>
              <View style={styles.customTourText}>
                <Text style={styles.customTourTitle}>Create Custom Tour</Text>
                <Text style={styles.customTourSubtitle}>
                  Design your perfect tour package with places you love
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary.main} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresSectionTitle}>Why Choose Our Tours?</Text>
          <View style={layout.isDesktop ? styles.featuresGrid : styles.featuresList}>
            <FeatureCard
              icon="shield-checkmark-outline"
              title="Safe & Verified"
              description="All drivers are verified and routes are secure"
              color={theme.colors.success}
            />
            <FeatureCard
              icon="star-outline"
              title="Top Rated"
              description="4.8+ rating from 10,000+ satisfied tourists"
              color={theme.colors.warning}
            />
            <FeatureCard
              icon="time-outline"
              title="Flexible Timing"
              description="Choose your start time and tour at your pace"
              color={theme.colors.primary.main}
            />
            <FeatureCard
              icon="cash-outline"
              title="Best Prices"
              description="Competitive pricing with no hidden charges"
              color={theme.colors.accent.main}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// Filter Chip Component
interface FilterChipProps {
  label: string;
  active?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, icon }) => (
  <TouchableOpacity
    style={[styles.filterChip, active && styles.filterChipActive]}
    activeOpacity={0.7}
  >
    {icon && (
      <Ionicons 
        name={icon} 
        size={16} 
        color={active ? '#FFFFFF' : theme.colors.text.secondary} 
      />
    )}
    <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Package Card Component
interface PackageCardProps {
  package: TourPackage;
  index: number;
  isDesktop: boolean;
  isMobile: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index, isDesktop, isMobile }) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: 12,
      mass: 1,
      stiffness: 100,
      useNativeDriver: true,
      delay: index * 80,
    }).start();
  }, []);

  const renderImageContent = () => {
    if (pkg.image && !imageError) {
      // Handle both URL strings and local image objects
      const imageSource = typeof pkg.image === 'string' 
        ? { uri: pkg.image } 
        : pkg.image;
      
      return (
        <Image
          source={imageSource}
          style={styles.packageImage}
          onError={() => setImageError(true)}
          resizeMode="cover"
        />
      );
    }

    return (
      <LinearGradient
        colors={[theme.colors.primary.main + '20', theme.colors.accent.main + '15']}
        style={styles.packageImagePlaceholder}
      >
        <View style={styles.packageIconCircle}>
          <LinearGradient
            colors={[theme.colors.primary.main, theme.colors.primary.light]}
            style={styles.packageIconGradient}
          >
            <Ionicons name={pkg.icon} size={isMobile ? 36 : 44} color="#FFFFFF" />
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  };

  return (
    <Animated.View
      style={[
        styles.packageCard,
        isDesktop && styles.packageCardDesktop,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity activeOpacity={0.9}>
        {/* Image/Icon Header */}
        <View style={styles.packageHeader}>
          {renderImageContent()}

          {/* Badges */}
          {pkg.popular && (
            <LinearGradient
              colors={[theme.colors.accent.main, theme.colors.primary.main]}
              style={styles.popularBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="star" size={12} color="#FFFFFF" />
              <Text style={styles.popularText}>POPULAR</Text>
            </LinearGradient>
          )}

          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={theme.colors.warning} />
            <Text style={styles.ratingText}>{pkg.rating}</Text>
            <Text style={styles.reviewsText}>({pkg.reviews})</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.packageContent}>
          <Text style={styles.packageTitle} numberOfLines={2}>{pkg.title}</Text>

          {/* Meta Info */}
          <View style={styles.packageMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.primary.main} />
              <Text style={styles.metaText}>{pkg.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={16} color={theme.colors.primary.main} />
              <Text style={styles.metaText}>{pkg.places.length} places</Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsContainer}>
            {pkg.highlights.map((highlight, idx) => (
              <View key={idx} style={styles.highlightTag}>
                <Ionicons name="checkmark-circle" size={12} color={theme.colors.success} />
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>

          {/* Places Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.placesContainer}
          >
            {pkg.places.map((place, idx) => (
              <View key={idx} style={styles.placeTag}>
                <Text style={styles.placeTagText}>{place}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.packageFooter}>
            <View style={styles.priceContainer}>
              {pkg.originalPrice && (
                <Text style={styles.originalPrice}>₹{pkg.originalPrice}</Text>
              )}
              <View style={styles.priceRow}>
                <Text style={styles.priceValue}>₹{pkg.price}</Text>
                <Text style={styles.priceLabel}>/person</Text>
              </View>
            </View>
            <Button
              title="Book Now"
              onPress={() => {}}
              gradient
              size="sm"
            />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <View style={styles.featureCard}>
    <View style={[styles.featureIconContainer, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['4xl'],
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  backButton: {
    padding: theme.spacing.sm,
    width: 40,
  },
  searchButton: {
    padding: theme.spacing.sm,
    width: 40,
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },

  // Hero Banner
  heroBanner: {
    padding: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  heroIcon: {
    marginBottom: theme.spacing.base,
  },
  heroTitle: {
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.base,
    gap: theme.spacing.base,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
  },
  heroStatLabel: {
    fontSize: theme.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  // Filters
  filterContainer: {
    paddingVertical: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  filterChipActive: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  filterChipText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.medium,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },

  // Section
  section: {
    marginTop: theme.spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  sectionCount: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },

  // Packages
  packagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.base,
    justifyContent: 'space-between',
  },
  packagesList: {
    gap: theme.spacing.base,
  },
  packageCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  packageCardDesktop: {
    width: '48%',
  },
  packageHeader: {
    position: 'relative',
  },
  packageImage: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.background.tertiary,
  },
  packageImagePlaceholder: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularBadge: {
    position: 'absolute',
    top: theme.spacing.base,
    right: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
  },
  popularText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  ratingBadge: {
    position: 'absolute',
    top: theme.spacing.base,
    left: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    ...theme.shadows.sm,
  },
  ratingText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  reviewsText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  packageContent: {
    padding: theme.spacing.base,
  },
  packageTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    lineHeight: 22,
  },
  packageMeta: {
    flexDirection: 'row',
    gap: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.success + '10',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  highlightText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.success,
    fontWeight: theme.fontWeights.medium,
  },
  placesContainer: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.base,
  },
  placeTag: {
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  placeTagText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  priceContainer: {
    gap: 2,
  },
  originalPrice: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  priceLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },

  // Custom Tour Card
  customTourCard: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.lg,
    ...theme.shadows.md,
  },
  customTourContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.base,
  },
  customTourIcon: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTourText: {
    flex: 1,
  },
  customTourTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  customTourSubtitle: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },

  // Features Section
  featuresSection: {
    marginTop: theme.spacing.xl,
  },
  featuresSectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.base,
    justifyContent: 'space-between',
  },
  featuresList: {
    gap: theme.spacing.base,
  },
  featureCard: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    flex: 1,
    minWidth: 150,
    ...theme.shadows.sm,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  featureTitle: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default TourPackagesScreen;
