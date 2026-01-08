import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { ServiceCard, Button, DriverCard } from '../../components';
import theme from '../../theme';

type WomenModeNavigationProp = StackNavigationProp<RootStackParamList, 'WomenMode'>;

interface Props {
  navigation: WomenModeNavigationProp;
}

const WomenModeScreen: React.FC<Props> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<'features' | 'drivers'>('features');
  
  const isDesktop = width >= 1024;
  const isTablet = width >= 640 && width < 1024;
  const isMobile = width < 640;
  
  const maxContentWidth = Math.min(1400, width);
  const contentPadding = isMobile ? theme.spacing.lg : isDesktop ? theme.spacing['3xl'] : theme.spacing.xl;

  const safetyFeatures = [
    { icon: 'woman' as const, title: 'Women Drivers Only', description: 'Verified female drivers', color: '#E91E63' },
    { icon: 'shield-checkmark' as const, title: 'Background Verified', description: 'Complete police verification', color: '#4CAF50' },
    { icon: 'location' as const, title: 'Live Tracking', description: 'Share trip with family', color: '#2196F3' },
    { icon: 'call' as const, title: 'Emergency SOS', description: 'One-tap emergency alert', color: '#FF5722' },
    { icon: 'star' as const, title: 'Rated Drivers', description: '4.8+ average rating', color: '#FFD700' },
    { icon: 'time' as const, title: '24/7 Available', description: 'Round the clock service', color: '#9C27B0' },
  ];

  const services = [
    { key: 'instant', title: 'Instant Ride', subtitle: 'Book now', icon: 'car' as const },
    { key: 'hourly', title: 'Hourly Driver', subtitle: '4hrs, 8hrs', icon: 'time' as const },
    { key: 'airport', title: 'Airport Transfer', subtitle: 'Fixed price', icon: 'airplane' as const },
    { key: 'tour', title: 'Tour Package', subtitle: 'Explore safely', icon: 'map' as const },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={[theme.colors.accent.women, theme.colors.accent.womenLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, isDesktop && styles.desktopHeader]}
      >
        <View style={[styles.headerContainer, { maxWidth: maxContentWidth, width: '100%' }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={isDesktop ? 28 : 24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, isDesktop && styles.desktopHeaderTitle]}>She-Yatri</Text>
              <Text style={[styles.headerSubtitle, isDesktop && styles.desktopHeaderSubtitle]}>
                Women-Only Safe Rides
              </Text>
            </View>
            {isDesktop && (
              <View style={styles.headerStats}>
                <View style={styles.statBadge}>
                  <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
                  <Text style={styles.statText}>100% Safe</Text>
                </View>
                <View style={styles.statBadge}>
                  <Ionicons name="star" size={20} color="#FFD700" />
                  <Text style={styles.statText}>4.9 Rating</Text>
                </View>
                <View style={styles.statBadge}>
                  <Ionicons name="people" size={20} color="#FFFFFF" />
                  <Text style={styles.statText}>50K+ Riders</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
      >
        <View style={[styles.contentWrapper, { maxWidth: maxContentWidth, alignSelf: 'center', width: '100%' }]}>
          
          {/* Hero Banner with CTA */}
          <View style={[styles.heroBanner, { marginHorizontal: contentPadding }, isDesktop && styles.desktopHeroBanner]}>
            <LinearGradient
              colors={['rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.05)']}
              style={styles.heroBannerGradient}
            >
              <View style={isDesktop ? styles.desktopHeroContent : styles.heroContent}>
                <View style={isDesktop ? styles.desktopHeroLeft : undefined}>
                  <View style={styles.safetyBadge}>
                    <Ionicons name="shield-checkmark" size={isDesktop ? 48 : 40} color={theme.colors.accent.women} />
                  </View>
                  <Text style={[styles.heroTitle, isDesktop && styles.desktopHeroTitle]}>
                    Your Safety is Our Priority
                  </Text>
                  <Text style={[styles.heroSubtitle, isDesktop && styles.desktopHeroSubtitle]}>
                    All drivers are verified women professionals with background checks and safety training
                  </Text>
                  {!isDesktop && (
                    <Button
                      title="Book a Safe Ride Now"
                      onPress={() => navigation.navigate('RideBooking')}
                      variant="women"
                      fullWidth
                      size={isMobile ? 'sm' : 'lg'}
                      leftIcon={<Ionicons name="woman" size={20} color="#FFFFFF" />}
                    />
                  )}
                </View>
                {isDesktop && (
                  <View style={styles.desktopHeroRight}>
                    <View style={styles.heroStatsCard}>
                      <View style={styles.heroStatItem}>
                        <Text style={styles.heroStatValue}>100%</Text>
                        <Text style={styles.heroStatLabel}>Verified</Text>
                      </View>
                      <View style={styles.heroStatDivider} />
                      <View style={styles.heroStatItem}>
                        <Text style={styles.heroStatValue}>24/7</Text>
                        <Text style={styles.heroStatLabel}>Available</Text>
                      </View>
                      <View style={styles.heroStatDivider} />
                      <View style={styles.heroStatItem}>
                        <Text style={styles.heroStatValue}>50K+</Text>
                        <Text style={styles.heroStatLabel}>Happy Riders</Text>
                      </View>
                    </View>
                    <Button
                      title="Book a Safe Ride Now"
                      onPress={() => navigation.navigate('RideBooking')}
                      variant="women"
                      fullWidth
                      size="lg"
                      leftIcon={<Ionicons name="woman" size={20} color="#FFFFFF" />}
                    />
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>

          {/* Ride Type Quick Actions */}
          <View style={[styles.bottomCTA, { marginHorizontal: contentPadding, marginTop: 0 }]}
          >
            <LinearGradient
              colors={[theme.colors.accent.women, theme.colors.accent.womenLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bottomCTAGradient}
            >
              <Ionicons name="woman" size={isDesktop ? 56 : 48} color="#FFFFFF" />
              <Text style={[styles.bottomCTATitle, isDesktop && styles.desktopBottomCTATitle]}>
                Book a Safe Ride
              </Text>
              <Text style={[styles.bottomCTASubtitle, isDesktop && styles.desktopBottomCTASubtitle]}>
                Choose your ride type below
              </Text>
              <View style={[styles.rideOptions, isDesktop && styles.desktopRideOptions]}>
                <Button
                  title="Book Auto"
                  onPress={() => navigation.navigate('RideBooking')}
                  variant="secondary"
                  size={isDesktop ? 'lg' : 'base'}
                  leftIcon={<Ionicons name="car" size={18} color="#FFFFFF" />}
                  style={styles.rideOptionButton}
                />
                <Button
                  title="Book Bike"
                  onPress={() => navigation.navigate('RideBooking')}
                  variant="women"
                  size={isDesktop ? 'lg' : 'base'}
                  leftIcon={<Ionicons name="bicycle" size={18} color="#FFFFFF" />}
                  style={styles.rideOptionButton}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Safety Features Section */}
          <View style={[styles.section, { paddingHorizontal: contentPadding }]}>
            <Text style={[styles.sectionTitle, isDesktop && styles.desktopSectionTitle]}>
              Safety Features
            </Text>
            <Text style={[styles.sectionSubtitle, isDesktop && styles.desktopSectionSubtitle]}>
              Comprehensive safety measures for your peace of mind
            </Text>
            
            <View style={[
              styles.featuresGrid,
              isDesktop && styles.desktopFeaturesGrid,
              isTablet && styles.tabletFeaturesGrid
            ]}>
              {safetyFeatures.map((feature, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.featureCard,
                    isDesktop && styles.desktopFeatureCard,
                    isTablet && styles.tabletFeatureCard
                  ]}
                >
                  <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}15` }]}>
                    <Ionicons name={feature.icon} size={isDesktop ? 32 : 28} color={feature.color} />
                  </View>
                  <Text style={[styles.featureTitle, isDesktop && styles.desktopFeatureTitle]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, isDesktop && styles.desktopFeatureDescription]}>
                    {feature.description}
                  </Text>
                  <View style={styles.featureCheckmark}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Testimonials Section (Desktop/Tablet) */}
          {!isMobile && (
            <View style={[styles.section, { paddingHorizontal: contentPadding }]}>
              <Text style={[styles.sectionTitle, isDesktop && styles.desktopSectionTitle]}>
                What Riders Say
              </Text>
              <View style={[styles.testimonialsGrid, isDesktop && styles.desktopTestimonialsGrid]}>
                <TestimonialCard
                  name="Sneha Reddy"
                  rating={5}
                  text="Felt completely safe throughout my journey. The driver was professional and friendly."
                  isDesktop={isDesktop}
                />
                <TestimonialCard
                  name="Divya Krishna"
                  rating={5}
                  text="Best service for women! I can travel late at night without any worries now."
                  isDesktop={isDesktop}
                />
                {isDesktop && (
                  <TestimonialCard
                    name="Kavya Rao"
                    rating={5}
                    text="Excellent experience! All drivers are well-trained and the tracking feature is great."
                    isDesktop={isDesktop}
                  />
                )}
              </View>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Testimonial Component
interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  isDesktop: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, rating, text, isDesktop }) => (
  <View style={[styles.testimonialCard, isDesktop && styles.desktopTestimonialCard]}>
    <View style={styles.testimonialHeader}>
      <View style={styles.testimonialAvatar}>
        <Ionicons name="person" size={24} color={theme.colors.accent.women} />
      </View>
      <View style={styles.testimonialInfo}>
        <Text style={styles.testimonialName}>{name}</Text>
        <View style={styles.testimonialRating}>
          {[...Array(rating)].map((_, i) => (
            <Ionicons key={i} name="star" size={14} color="#FFD700" />
          ))}
        </View>
      </View>
    </View>
    <Text style={styles.testimonialText}>"{text}"</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  // Header Styles
  header: {
    paddingBottom: theme.spacing.xl,
  },
  desktopHeader: {
    paddingBottom: theme.spacing['2xl'],
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    alignSelf: 'center',
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.md,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  desktopHeaderTitle: {
    fontSize: theme.fontSizes['3xl'],
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  desktopHeaderSubtitle: {
    fontSize: theme.fontSizes.lg,
  },
  headerStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
  },
  // Scroll and Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['3xl'],
  },
  contentWrapper: {
    flex: 1,
  },
  // Hero Banner
  heroBanner: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  desktopHeroBanner: {
    borderRadius: theme.borderRadius['2xl'],
    marginTop: theme.spacing['2xl'],
  },
  heroBannerGradient: {
    padding: theme.spacing.xl,
  },
  heroContent: {
    alignItems: 'center',
  },
  desktopHeroContent: {
    flexDirection: 'row',
    gap: theme.spacing['3xl'],
    padding: theme.spacing.xl,
  },
  desktopHeroLeft: {
    flex: 1,
  },
  desktopHeroRight: {
    flex: 1,
    gap: theme.spacing.xl,
  },
  safetyBadge: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
    alignSelf: 'center',
  },
  heroTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  desktopHeroTitle: {
    fontSize: theme.fontSizes['3xl'],
    textAlign: 'left',
  },
  heroSubtitle: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  desktopHeroSubtitle: {
    fontSize: theme.fontSizes.lg,
    textAlign: 'left',
    lineHeight: 26,
  },
  heroStatsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
    justifyContent: 'space-around',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.accent.women,
    marginBottom: theme.spacing.xs,
  },
  heroStatLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: theme.colors.border.light,
  },
  // Sections
  section: {
    marginTop: theme.spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  desktopSectionTitle: {
    fontSize: theme.fontSizes['2xl'],
  },
  sectionSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  desktopSectionSubtitle: {
    fontSize: theme.fontSizes.base,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.accent.women,
  },
  viewAllText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.accent.women,
  },
  // Features Grid
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  tabletFeaturesGrid: {
    gap: theme.spacing.lg,
  },
  desktopFeaturesGrid: {
    gap: theme.spacing.xl,
  },
  featureCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
    position: 'relative',
  },
  tabletFeatureCard: {
    minWidth: '30%',
    padding: theme.spacing.xl,
  },
  desktopFeatureCard: {
    minWidth: '30%',
    padding: theme.spacing['2xl'],
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  featureTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  desktopFeatureTitle: {
    fontSize: theme.fontSizes.lg,
  },
  featureDescription: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  desktopFeatureDescription: {
    fontSize: theme.fontSizes.base,
  },
  featureCheckmark: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
  // Services Grid
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  tabletServicesGrid: {
    gap: theme.spacing.lg,
  },
  desktopServicesGrid: {
    gap: theme.spacing.xl,
  },
  serviceCardWrapper: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
    position: 'relative',
  },
  tabletServiceCard: {
    minWidth: '47%',
    padding: theme.spacing.xl,
  },
  desktopServiceCard: {
    minWidth: '22%',
    padding: theme.spacing.xl,
  },
  serviceIconBg: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: `${theme.colors.accent.women}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  serviceTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  desktopServiceTitle: {
    fontSize: theme.fontSizes.lg,
  },
  serviceSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  serviceArrow: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
  },
  // Drivers
  driversContainer: {
    gap: theme.spacing.md,
  },
  desktopDriversGrid: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
  },
  // Testimonials
  testimonialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  desktopTestimonialsGrid: {
    gap: theme.spacing.xl,
  },
  testimonialCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  desktopTestimonialCard: {
    minWidth: '30%',
    padding: theme.spacing.xl,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.accent.women}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  testimonialInfo: {
    flex: 1,
  },
  testimonialName: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  // Bottom CTA
  bottomCTA: {
    marginTop: theme.spacing['3xl'],
    marginBottom: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  bottomCTAGradient: {
    padding: theme.spacing['2xl'],
    alignItems: 'center',
  },
  bottomCTATitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  desktopBottomCTATitle: {
    fontSize: theme.fontSizes['2xl'],
  },
  bottomCTASubtitle: {
    fontSize: theme.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  desktopBottomCTASubtitle: {
    fontSize: theme.fontSizes.lg,
  },
  rideOptions: {
    width: '100%',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  desktopRideOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xl,
  },
  rideOptionButton: {
    flex: 1,
  },
});

export default WomenModeScreen;
