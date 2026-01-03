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

type TourPackagesNavigationProp = StackNavigationProp<RootStackParamList, 'TourPackages'>;

interface Props {
  navigation: TourPackagesNavigationProp;
}

interface TourPackage {
  id: string;
  title: string;
  duration: string;
  price: number;
  places: string[];
  icon: string;
  image?: string;
  popular?: boolean;
  highlights: string[];
}

const tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Hyderabad Heritage Tour',
    duration: '4 hours',
    price: 1299,
    places: ['Charminar', 'Golconda Fort', 'Qutub Shahi Tombs'],
    icon: 'castle',
    popular: true,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    highlights: ['Historic sites', 'Expert guide', 'Snacks included'],
  },
  {
    id: '2',
    title: 'Ramoji Film City',
    duration: '8 hours',
    price: 1899,
    places: ['Film City Tour', 'Shows', 'Lunch Included'],
    icon: 'film',
    popular: true,
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=400&h=300&fit=crop',
    highlights: ['Movie sets', 'Photo ops', 'Lunch included'],
  },
  {
    id: '3',
    title: 'Spiritual Telangana',
    duration: '6 hours',
    price: 1599,
    places: ['Birla Mandir', 'Mecca Masjid', 'Sanghi Temple'],
    icon: 'religion-hinduism',
    image: 'https://images.unsplash.com/photo-1549887534-7ebf59b11d82?w=400&h=300&fit=crop',
    highlights: ['Temple visits', 'Peaceful moments', 'Photos allowed'],
  },
  {
    id: '4',
    title: 'City Shopping Tour',
    duration: '5 hours',
    price: 999,
    places: ['Laad Bazaar', 'Begum Bazaar', 'Shilparamam'],
    icon: 'bag-handle-outline',
    highlights: ['Famous markets', 'Shopping tips', 'Snacks break'],
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
      padding: isMobile ? theme.spacing.lg : isTablet ? theme.spacing.xl : theme.spacing['2xl'],
      cardPadding: isMobile ? theme.spacing.base : theme.spacing.lg,
      columns: isDesktop ? 2 : 1,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
    };
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tour Packages</Text>
        <View style={{ width: 40 }} />
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Hero Banner with Gradient */}
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.accent.main, theme.colors.services.tour]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.heroBanner, { marginHorizontal: layout.padding }]}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 30],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <Ionicons name="map-sharp" size={56} color="#FFFFFF" />
          </Animated.View>
          <Text style={[styles.heroTitle, { fontSize: layout.titleSize }]}>Explore Telangana</Text>
          <Text style={styles.heroSubtitle}>
            Curated tours with expert drivers & unforgettable experiences
          </Text>
        </LinearGradient>

        {/* Packages */}
        <View style={[styles.section, { paddingHorizontal: layout.padding }]}>
          <Text style={[styles.sectionTitle, { fontSize: layout.titleSize }]}>Popular Packages</Text>
          <View style={layout.isDesktop ? styles.packagesGrid : {}}>
            {tourPackages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                index={index}
                isDesktop={layout.isDesktop}
              />
            ))}
          </View>
        </View>

        {/* Custom Tour Section */}
        <View style={[styles.customTourCard, { marginHorizontal: layout.padding }]}>
          <LinearGradient
            colors={['rgba(107, 33, 168, 0.1)', 'rgba(168, 85, 247, 0.05)']}
            style={styles.customTourGradient}
          >
            <View style={styles.customTourContent}>
              <View style={styles.customTourIconContainer}>
                <LinearGradient
                  colors={[theme.colors.primary.main, theme.colors.primary.light]}
                  style={styles.customTourIcon}
                >
                  <Ionicons name="add-circle" size={40} color="#FFFFFF" />
                </LinearGradient>
              </View>
              <Text style={styles.customTourTitle}>Create Custom Tour</Text>
              <Text style={styles.customTourText}>
                Want to visit specific places? Design your perfect tour
              </Text>
              <Button
                title="Get Started"
                onPress={() => { }}
                gradient
                size="base"
                style={{ marginTop: theme.spacing.lg }}
                fullWidth
              />
            </View>
          </LinearGradient>
        </View>

        {/* Features Section */}
        <View style={[styles.featuresSection, { paddingHorizontal: layout.padding }]}>
          <Text style={styles.featuresSectionTitle}>Why Choose Our Tours?</Text>
          <View style={layout.isDesktop ? styles.featuresGrid : styles.featuresList}>
            <FeatureCard
              icon="checkmark-circle"
              title="Expert Guides"
              description="Experienced & knowledgeable drivers"
            />
            <FeatureCard
              icon="shield-checkmark"
              title="Safe & Secure"
              description="Verified drivers & safe routes"
            />
            <FeatureCard
              icon="time"
              title="Flexible Timing"
              description="Start anytime, tour at your pace"
            />
            <FeatureCard
              icon="star"
              title="Top Rated"
              description="4.8+ rating from 10K+ tours"
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

interface PackageCardProps {
  package: TourPackage;
  index: number;
  isDesktop: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index, isDesktop }) => {
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      damping: 8,
      mass: 1,
      stiffness: 100,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.packageCard,
        isDesktop && styles.packageCardDesktop,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {pkg.popular && (
        <LinearGradient
          colors={[theme.colors.accent.main, theme.colors.primary.main]}
          style={styles.popularBadge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="star" size={14} color="#FFFFFF" />
          <Text style={styles.popularText}>POPULAR</Text>
        </LinearGradient>
      )}

      {pkg.image ? (
        <Image
          source={{ uri: pkg.image }}
          style={styles.packageImage}
        />
      ) : (
        <LinearGradient
          colors={[
            `${theme.colors.primary.main}15`,
            `${theme.colors.accent.main}10`,
          ]}
          style={styles.packageImagePlaceholder}
        >
          <View style={styles.packageIconCircle}>
            <LinearGradient
              colors={[theme.colors.primary.main, theme.colors.primary.light]}
              style={styles.packageIcon}
            >
              <Ionicons
                name={pkg.icon as any}
                size={40}
                color="#FFFFFF"
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      )}

      <View style={styles.packageContent}>
        <Text style={styles.packageTitle}>{pkg.title}</Text>

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

        <View style={styles.highlightsContainer}>
          {pkg.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightTag}>
              <Ionicons name="checkmark-sharp" size={12} color={theme.colors.primary.main} />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.placesContainer}>
          {pkg.places.map((place, index) => (
            <View key={index} style={styles.placeTag}>
              <Text style={styles.placeTagText}>{place}</Text>
            </View>
          ))}
        </View>

        <View style={styles.packageFooter}>
          <View>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.priceValue}>₹{pkg.price}</Text>
          </View>
          <Button
            title="Book Now"
            onPress={() => { }}
            gradient
            size="sm"
          />
        </View>
      </View>
    </Animated.View>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <View style={styles.featureIconContainer}>
      <LinearGradient
        colors={[theme.colors.primary.main, theme.colors.primary.light]}
        style={styles.featureIcon}
      >
        <Ionicons name={icon as any} size={32} color="#FFFFFF" />
      </LinearGradient>
    </View>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  scrollView: {
    flex: 1,
    width: '100%',
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  heroBanner: {
    padding: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  heroTitle: {
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: theme.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  packagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  packageCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
    flex: 1,
    minWidth: 280,
    marginBottom: theme.spacing.base,
  },
  packageCardDesktop: {
    maxWidth: '48%',
  },
  popularBadge: {
    position: 'absolute',
    top: theme.spacing.base,
    right: theme.spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.base,
    zIndex: 10,
  },
  popularText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
  },
  packageImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  packageImagePlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageContent: {
    padding: theme.spacing.lg,
  },
  packageTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  packageMeta: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  metaText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.base,
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: `${theme.colors.primary.main}15`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.base,
  },
  highlightText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },
  placesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.base,
  },
  placeTag: {
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}30`,
  },
  placeTagText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  packageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  priceLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  priceValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  customTourCard: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  customTourGradient: {
    padding: theme.spacing['2xl'],
  },
  customTourContent: {
    alignItems: 'center',
  },
  customTourIconContainer: {
    marginBottom: theme.spacing.lg,
  },
  customTourIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTourTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  customTourText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  featuresSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  featuresSectionTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  featuresList: {
    gap: theme.spacing.lg,
  },
  featureCard: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
    flex: 1,
    minWidth: 150,
  },
  featureIconContainer: {
    marginBottom: theme.spacing.md,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default TourPackagesScreen;
