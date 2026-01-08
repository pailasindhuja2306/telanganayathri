import React, { useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  useWindowDimensions,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { ServiceCard, LocationPicker, ComingSoonModal } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { profile } = useAppState();
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [comingSoonModalVisible, setComingSoonModalVisible] = useState(false);
  const [comingSoonData, setComingSoonData] = useState({ title: '', subtitle: '' });
  const [showAllServices, setShowAllServices] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const showComingSoon = (title: string, subtitle: string) => {
    setComingSoonData({ title, subtitle });
    setComingSoonModalVisible(true);
  };

  type ServiceDefinition = {
    key: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    onPress: () => void;
    color?: string;
    gradient?: [string, string];
    badge?: string;
    featured?: boolean;
    description?: string;
  };

  const layout = useMemo(() => {
    const isMobile = winWidth < 640;
    const isTablet = winWidth >= 640 && winWidth < 1024;
    const isDesktop = winWidth >= 1024;
    const isLargeDesktop = winWidth >= 1400;

    const contentPadding = isMobile ? theme.spacing.lg : isDesktop ? theme.spacing['2xl'] : theme.spacing.xl;
    const availableWidth = Math.max(winWidth - contentPadding * 2, 320);
    const maxContentWidth = Math.min(1800, availableWidth);
    const gap = isMobile ? theme.spacing.md : theme.spacing.lg;
    const sectionPadding = isMobile ? theme.spacing.lg : theme.spacing.xl;

    // Enhanced responsive columns
    let serviceColumns = 2;
    if (isLargeDesktop) serviceColumns = 5;
    else if (isDesktop) serviceColumns = 4;
    else if (isTablet) serviceColumns = 3;

    // Account for section padding when calculating card width
    const serviceContentWidth = Math.max(0, maxContentWidth - sectionPadding * 2);
    const serviceCardWidth = Math.max(120, (serviceContentWidth - gap * (serviceColumns - 1)) / serviceColumns);

    const featureColumns = isLargeDesktop ? 5 : isDesktop ? 4 : isTablet ? 3 : 2;
    const featureWidth = Math.max(160, (maxContentWidth - gap * (featureColumns - 1)) / featureColumns);

    return {
      serviceCardWidth,
      serviceColumns,
      gap,
      maxContentWidth,
      contentPadding,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      sectionPadding,
      compact: isWeb && maxContentWidth >= 900,
      featureWidth: Math.max(160, (maxContentWidth - gap * (featureColumns - 1)) / featureColumns),
      page: {
        maxWidth: maxContentWidth,
        alignSelf: 'center' as const,
        width: availableWidth
      },
    };
  }, [winWidth]);

  const services: ServiceDefinition[] = [
    {
      key: 'ride',
      title: 'Ride Now',
      subtitle: 'Hyderabad lo instant',
      icon: <Ionicons name="car" size={32} color={theme.colors.services.ride} />,
      onPress: () => navigation.navigate('RideBooking'),
      color: theme.colors.services.ride,
    },
    {
      key: 'women',
      title: 'She-Yatri',
      subtitle: 'Hyd women-only · Safe',
      icon: <Ionicons name="woman" size={32} color="#FFFFFF" />,
      onPress: () => {
        if (profile?.gender === 'female') {
          navigation.navigate('WomenMode');
          return;
        }
        Alert.alert(
          'Women-only feature',
          'She-Yatri is available only for female riders. Update your gender to Female in profile to access.',
          [{ text: 'OK' }]
        );
      },
      gradient: [theme.colors.accent.women, theme.colors.accent.womenLight],
      badge: 'SAFE',
      featured: true,
    },
    {
      key: 'tour',
      title: 'Tour Hyderabad',
      subtitle: 'Old City · Golconda',
      icon: <Ionicons name="map" size={32} color={theme.colors.services.tour} />,
      onPress: () => navigation.navigate('TourPackages'),
      color: theme.colors.services.tour,
    },
    {
      key: 'driver',
      title: 'Book Driver',
      subtitle: 'Hyd by the hour',
      icon: <Ionicons name="time" size={32} color={theme.colors.services.driver} />,
      onPress: () => navigation.navigate('DriverBooking'),
      color: theme.colors.services.driver,
    },
    {
      key: 'vehicle',
      title: 'Self-Driving',
      subtitle: 'Rent by hour/day',
      icon: <Ionicons name="car-sport" size={32} color={theme.colors.services.vehicle} />,
      onPress: () => navigation.navigate('VehicleRental'),
      color: theme.colors.services.vehicle,
    },
    {
      key: 'intercity',
      title: 'Intercity',
      subtitle: 'Start in Telangana',
      icon: <Ionicons name="navigate" size={32} color={theme.colors.services.intercity} />,
      onPress: () => showComingSoon('Intercity Bookings', 'Book trips across Telangana and neighboring states'),
      color: theme.colors.services.intercity,
    },
    {
      key: 'parcel',
      title: 'Parcel',
      subtitle: 'Hyderabad same-day',
      icon: <Ionicons name="cube" size={32} color={theme.colors.services.parcel} />,
      onPress: () => showComingSoon('Parcel Delivery', 'Fast and reliable parcel delivery service'),
      color: theme.colors.services.parcel,
    },
    {
      key: 'bus',
      title: 'Bus Booking',
      subtitle: 'TSRTC partners',
      icon: <Ionicons name="bus" size={32} color={theme.colors.services.bus} />,
      onPress: () => showComingSoon('Bus Bookings', 'Book TSRTC and partner buses easily'),
      color: theme.colors.services.bus,
    },
  ];
  const quickPicks: Array<{ title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap }> = [
    {
      title: 'Charminar → HITEC City',
      subtitle: 'Peak 25-35 mins · ₹260-320',
      icon: 'navigate',
    },
    {
      title: 'Kukatpally → Financial Dist.',
      subtitle: 'Fastest via ORR · Safe ga, sure ga',
      icon: 'trending-up',
    },
    {
      title: 'Secunderabad → Banjara Hills',
      subtitle: '15-20 mins · Verified cabs',
      icon: 'compass',
    },
  ];

  const hyderabadTours: Array<{ title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap }> = [
    {
      title: 'Old City Heritage',
      subtitle: 'Charminar, Chowmahalla, Laad Bazaar',
      icon: 'walk',
    },
    {
      title: 'Golconda Sunset',
      subtitle: 'Golconda Fort, Qutb Shahi Tombs',
      icon: 'sunny',
    },
    {
      title: 'Night Drive Hyd',
      subtitle: 'Necklace Rd, Tank Bund, Jubilee Hills',
      icon: 'moon',
    },
  ];

  const airportMetro: Array<{ title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap }> = [
    {
      title: 'RGIA Airport Pickup',
      subtitle: 'Fixed fare · She-Yatri & cabs',
      icon: 'airplane',
    },
    {
      title: 'Pushpak Airport Bus',
      subtitle: 'TSRTC Volvo timings & tickets',
      icon: 'bus',
    },
    {
      title: 'Metro Feeder',
      subtitle: 'Hitec, Raidurg, Secunderabad hubs',
      icon: 'train',
    },
  ];

  const safetyFeatures = [
    { icon: 'shield-checkmark' as const, title: 'Verified Drivers', color: theme.colors.success },
    { icon: 'location' as const, title: 'Live Tracking', color: theme.colors.info },
    { icon: 'call' as const, title: '24/7 Support', color: theme.colors.primary.main },
    { icon: 'people' as const, title: 'Share Trip', color: theme.colors.secondary.dark },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={Platform.OS !== 'web'}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + theme.spacing['2xl'] },
        ]}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        overScrollMode={isWeb ? 'auto' : 'always'}
      >
        {/* Enhanced Header with better mobile/desktop layout */}
      <View style={[styles.header, layout.page, layout.isDesktop && styles.desktopHeader]}>
        <View style={styles.logoContainer}>
          <Ionicons
            name="car-sport"
            size={layout.isMobile ? 28 : layout.isDesktop ? 36 : 30}
            color={theme.colors.primary.main} />
          <Text style={[styles.logoText, layout.isDesktop && styles.desktopLogoText]}>
            Telangana Yatri
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.notificationButton, layout.isDesktop && styles.desktopNotificationButton]}>
            <Ionicons
              name="notifications-outline"
              size={layout.isMobile ? 24 : 28}
              color={theme.colors.text.primary} />
          </TouchableOpacity>
          {layout.isDesktop && (
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={32} color={theme.colors.primary.main} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Welcome Section - Two Column Layout for Desktop */}
      <View style={[styles.welcomeSection, layout.page, layout.isDesktop && styles.desktopWelcomeSection]}>
        <View style={layout.isDesktop ? styles.desktopWelcomeContent : undefined}>
          <View style={layout.isDesktop ? styles.desktopWelcomeLeft : undefined}>
            <Text style={[styles.welcomeText, layout.isDesktop && styles.desktopWelcomeText]}>
              Welcome back
            </Text>
            <Text style={[styles.userNameText, layout.isDesktop && styles.desktopUserNameText]}>
              {profile?.name || 'Guest'}
            </Text>
            {layout.isDesktop && (
              <Text style={styles.desktopWelcomeSubtitle}>
                Ready to explore Telangana? Book your ride now.
              </Text>
            )}
          </View>
          
          {/* Desktop Quick Stats */}
          {layout.isDesktop && (
            <View style={styles.desktopQuickStats}>
              <View style={styles.statCard}>
                <Ionicons name="time-outline" size={24} color={theme.colors.primary.main} />
                <Text style={styles.statValue}>24/7</Text>
                <Text style={styles.statLabel}>Available</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="shield-checkmark-outline" size={24} color={theme.colors.success} />
                <Text style={styles.statValue}>100%</Text>
                <Text style={styles.statLabel}>Verified</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="star" size={24} color="#FFD700" />
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Enhanced Primary CTA - Book a Ride */}
      <TouchableOpacity onPress={() => navigation.navigate('RideBooking')}>
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.primaryCTA,
            layout.page,
            layout.isDesktop && styles.desktopPrimaryCTA,
            isWeb && { marginTop: theme.spacing.lg }
          ]}
        >
          <View style={[styles.ctaContent, layout.isDesktop && styles.desktopCtaContent]}>
            <View style={[styles.ctaTextContainer, layout.isDesktop && styles.desktopCtaTextContainer]}>
              <Text style={[styles.ctaTitle, layout.isDesktop && styles.desktopCtaTitle]}>
                Book a Hyderabad ride
              </Text>
              <Text style={[styles.ctaSubtitle, layout.isDesktop && styles.desktopCtaSubtitle]}>
                Telangana-only · City default: Hyderabad
              </Text>
              <View style={[styles.ctaFeatures, layout.isDesktop && styles.desktopCtaFeatures]}>
                <Text style={[styles.ctaFeature, layout.isDesktop && styles.desktopCtaFeature]}>🚗 Instant pickup</Text>
                <Text style={[styles.ctaFeature, layout.isDesktop && styles.desktopCtaFeature]}>🛡️ Verified drivers</Text>
                <Text style={[styles.ctaFeature, layout.isDesktop && styles.desktopCtaFeature]}>📍 Live tracking</Text>
              </View>
            </View>
            {layout.isDesktop && (
              <View style={styles.desktopCtaIconContainer}>
                <View style={[styles.ctaIcon, styles.desktopCtaIcon]}>
                  <Ionicons
                    name="arrow-forward"
                    size={32}
                    color="#FFFFFF" />
                </View>
              </View>
            )}
            {!layout.isDesktop && (
              <View style={styles.ctaIcon}>
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color="#FFFFFF" />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Enhanced Services Section with Premium Desktop Layout */}
      <View style={[
        styles.section,
        styles.servicesSection,
        layout.page,
        { paddingHorizontal: layout.sectionPadding },
        layout.isDesktop && styles.desktopServicesSection
      ]}>
        <View style={layout.isDesktop && styles.desktopServicesHeader}>
          <View>
            <Text style={[styles.sectionTitle, layout.isDesktop && styles.desktopSectionTitle]}>
              Our Services (Telangana)
            </Text>
            <Text style={[styles.sectionSubtitle, layout.isDesktop && styles.desktopSectionSubtitle]}>
              City default: Hyderabad · TS only
            </Text>
          </View>
          {layout.isDesktop && (
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => setShowAllServices(!showAllServices)}
            >
              <Text style={styles.viewAllText}>{showAllServices ? 'Show Less' : 'View All'}</Text>
              <Ionicons 
                name={showAllServices ? "chevron-up" : "arrow-forward"} 
                size={16} 
                color={theme.colors.primary.main} 
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Desktop: Featured Services in Horizontal Row */}
        {layout.isDesktop && (
          <View style={styles.featuredServicesRow}>
            {services.slice(0, 3).map((item, index) => (
              <TouchableOpacity
                key={item.key}
                onPress={item.onPress}
                style={styles.featuredServiceCard}
              >
                {item.gradient ? (
                  <LinearGradient
                    colors={item.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.featuredCardGradient}
                  >
                    {item.badge && (
                      <View style={styles.featuredBadge}>
                        <Text style={styles.featuredBadgeText}>{item.badge}</Text>
                      </View>
                    )}
                    <View style={styles.featuredIconContainer}>
                      <Ionicons name="woman" size={48} color="#FFFFFF" />
                    </View>
                    <Text style={styles.featuredTitle}>{item.title}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.featuredCardContent}>
                    <View style={[styles.featuredIconContainer, { backgroundColor: `${item.color}15` }]}>
                      {index === 0 ? (
                        <Ionicons name="car" size={48} color={theme.colors.services.ride} />
                      ) : index === 2 ? (
                        <Ionicons name="map" size={48} color={theme.colors.services.tour} />
                      ) : item.icon}
                    </View>
                    <Text style={styles.featuredTitleDark}>{item.title}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Services Grid */}
        <View style={layout.isDesktop && styles.desktopServicesGrid}>
          {layout.isDesktop && (
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLine} />
              <Text style={styles.categoryLabel}>More Services</Text>
              <View style={styles.categoryLine} />
            </View>
          )}
          <FlatList
            data={layout.isDesktop ? (showAllServices ? services.slice(3) : services.slice(3, 8)) : services.slice(0, layout.isLargeDesktop ? 10 : 8)}
            keyExtractor={(s) => s.key}
            numColumns={layout.serviceColumns}
            scrollEnabled={false}
            key={layout.serviceColumns}
            columnWrapperStyle={{
              justifyContent: layout.serviceColumns === 2 ? 'space-between' : 'flex-start',
              gap: layout.gap,
            }}
            ItemSeparatorComponent={() => <View style={{ height: layout.gap }} />}
            contentContainerStyle={{ paddingBottom: layout.gap }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: layout.serviceCardWidth }}>
                <ServiceCard
                  title={item.title}
                  square={!layout.isDesktop}
                  centerContent
                  hideSubtitle
                  icon={item.icon}
                  onPress={item.onPress}
                  color={item.color}
                  gradient={item.gradient}
                  badge={item.badge}
                  featured={item.featured}
                  compact={layout.compact} />
              </View>
            )} />
        </View>
      </View>

      {/* Tour Hyderabad - Enhanced Desktop Grid */}
      <View style={[styles.section, layout.page, layout.isDesktop && styles.desktopSection]}>
        <Text style={[styles.sectionTitle, layout.isDesktop && styles.desktopSectionTitle]}>Tour Hyderabad</Text>
        <Text style={[styles.sectionSubtitle, layout.isDesktop && styles.desktopSectionSubtitle]}>Hyperlocal curation · Telugu & Urdu friendly guides</Text>
        <View style={[styles.quickList, layout.isDesktop && styles.desktopQuickList]}>
          {hyderabadTours.map((item, index) => (
            <View key={index} style={layout.isDesktop ? styles.desktopQuickCardWrapper : undefined}>
              <QuickCard item={item} />
            </View>
          ))}
        </View>
      </View>

      {/* Airport & Metro - Enhanced Desktop Grid */}
      <View style={[styles.section, layout.page, layout.isDesktop && styles.desktopSection]}>
        <Text style={[styles.sectionTitle, layout.isDesktop && styles.desktopSectionTitle]}>Airport & Metro</Text>
        <Text style={[styles.sectionSubtitle, layout.isDesktop && styles.desktopSectionSubtitle]}>RGIA + TSRTC Pushpak · Metro feeder pickups</Text>
        <View style={[styles.quickList, layout.isDesktop && styles.desktopQuickList]}>
          {airportMetro.map((item, index) => (
            <View key={index} style={layout.isDesktop ? styles.desktopQuickCardWrapper : undefined}>
              <QuickCard item={item} badge="HYD" />
            </View>
          ))}
        </View>
      </View>

      {/* Safety Features - Enhanced Desktop Grid */}
      <View style={[styles.section, layout.page, layout.isDesktop && styles.desktopSection]}>
        <Text style={[styles.sectionTitle, layout.isDesktop && styles.desktopSectionTitle]}>Safety Features</Text>
        <View
          style={[
            styles.safetyGrid,
            { columnGap: layout.gap, rowGap: layout.gap },
            layout.isDesktop && styles.desktopSafetyGrid,
          ]}
        >
          {safetyFeatures.map((feature) => (
            <SafetyFeature
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              color={feature.color}
              width={layout.featureWidth} />
          ))}
        </View>
      </View>

      {/* Location Picker Section */}
      <View style={[styles.locationSection, layout.page]}>
        <LocationPicker
          onLocationSelect={(location) => {
            setSelectedLocation(location);
            console.log('Location selected:', location);
          } }
          showMap={true} />
      </View>

      {/* Bottom padding handled via SafeArea insets above */}
      <ComingSoonModal
        visible={comingSoonModalVisible}
        title={comingSoonData.title}
        subtitle={comingSoonData.subtitle}
        onClose={() => setComingSoonModalVisible(false)}
      />
      </ScrollView>
    </SafeAreaView>
  );
};

interface SafetyFeatureProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  width: number;
}

const SafetyFeature: React.FC<SafetyFeatureProps> = ({ icon, title, color, width }) => (
  <View style={[styles.safetyFeature, { width }]}>
    <View style={[styles.safetyIcon, { backgroundColor: `${color}15` }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <Text style={styles.safetyFeatureText}>{title}</Text>
  </View>
);

interface QuickCardProps {
  item: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
  };
  badge?: string;
}

const QuickCard: React.FC<QuickCardProps> = ({ item, badge }) => (
  <View style={styles.quickCard}>
    <View style={styles.quickIcon}>
      <Ionicons name={item.icon} size={20} color={theme.colors.primary.main} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.quickTitle}>{item.title}</Text>
      <Text style={styles.quickSubtitle}>{item.subtitle}</Text>
    </View>
    {badge ? (
      <View style={styles.badgePill}>
        <Text style={styles.badgePillText}>{badge}</Text>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    width: '100%',
    display: 'flex' as any,
    height: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.colors.background.secondary,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    paddingTop: 0,
    flexGrow: 1,
    backgroundColor: theme.colors.background.secondary,
  } as any,
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  desktopHeader: {
    paddingHorizontal: theme.spacing['3xl'],
    paddingVertical: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing['2xl'],
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
    borderBottomWidth: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  logoText: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  desktopLogoText: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  notificationButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  desktopNotificationButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    ...theme.shadows.sm,
  },
  profileButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${theme.colors.primary.main}10`,
    ...theme.shadows.sm,
  },
  // Welcome Section Styles
  servicesContainer: {
    marginTop: theme.spacing['3xl'],
    marginHorizontal: theme.spacing.xl,
  },
  servicesHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
  },
  // Quick Actions Styles
  quickActionsContainer: {
    marginTop: theme.spacing.xl,
  },
  quickActionsTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  quickActionsGrid: {
    gap: theme.spacing.md,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  // Welcome Section Styles
  welcomeSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  },
  desktopWelcomeSection: {
    paddingHorizontal: theme.spacing['3xl'],
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing['2xl'],
    marginHorizontal: theme.spacing['2xl'],
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  desktopWelcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing['3xl'],
  },
  desktopWelcomeLeft: {
    flex: 1,
  },
  welcomeText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  desktopWelcomeText: {
    fontSize: theme.fontSizes.xl,
  },
  userNameText: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  desktopUserNameText: {
    fontSize: theme.fontSizes['4xl'],
  },
  desktopWelcomeSubtitle: {
    fontSize: theme.fontSizes.lg,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
    maxWidth: 600,
  },
  // Desktop Quick Stats
  desktopQuickStats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  statCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    minWidth: 120,
    ...theme.shadows.sm,
  },
  statValue: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.sm,
  },
  statLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  // Primary CTA Styles
  primaryCTA: {
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  desktopPrimaryCTA: {
    marginHorizontal: theme.spacing['2xl'],
    marginTop: theme.spacing['2xl'],
    borderRadius: theme.borderRadius['2xl'],
    ...theme.shadows.xl,
  },
  ctaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  desktopCtaContent: {
    padding: theme.spacing['3xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing['2xl'],
  },
  ctaTextContainer: {
    flex: 1,
  },
  desktopCtaTextContainer: {
    flex: 1,
    maxWidth: '70%',
  },
  ctaTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  desktopCtaTitle: {
    fontSize: theme.fontSizes['3xl'],
    marginBottom: theme.spacing.md,
  },
  ctaSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.md,
  },
  desktopCtaSubtitle: {
    fontSize: theme.fontSizes.lg,
    marginBottom: theme.spacing.xl,
  },
  ctaFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  desktopCtaFeatures: {
    gap: theme.spacing.lg,
  },
  ctaFeature: {
    fontSize: theme.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  desktopCtaFeature: {
    fontSize: theme.fontSizes.base,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  ctaIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopCtaIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  desktopCtaIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  // Section Styles
  section: {
    marginTop: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.xl,
    overflow: 'hidden' as any,
  },
  desktopSection: {
    marginTop: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing['3xl'],
  },
  servicesSection: {
    paddingBottom: theme.spacing['3xl'],
    marginBottom: theme.spacing.lg,
  },
  desktopServicesSection: {
    marginTop: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing['3xl'],
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['4xl'],
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius['2xl'],
    marginHorizontal: theme.spacing['2xl'],
    ...theme.shadows.lg,
  },
  desktopServicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing['2xl'],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: `${theme.colors.primary.main}10`,
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}20`,
  },
  viewAllText: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.primary.main,
  },
  // Featured Services Row (Desktop)
  featuredServicesRow: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing['3xl'],
  },
  featuredServiceCard: {
    flex: 1,
    borderRadius: theme.borderRadius['2xl'],
    overflow: 'hidden',
    ...theme.shadows.lg,
    minHeight: 220,
  },
  featuredCardGradient: {
    flex: 1,
    padding: theme.spacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  featuredCardContent: {
    flex: 1,
    padding: theme.spacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
  },
  featuredBadge: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.xs,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 1,
  },
  featuredIconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius['2xl'],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  featuredTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  featuredTitleDark: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  featuredSubtitle: {
    fontSize: theme.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  featuredSubtitleDark: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  desktopServicesGrid: {
    marginTop: theme.spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.lg,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.light,
  },
  categoryLabel: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  locationSection: {
    marginTop: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  desktopSectionTitle: {
    fontSize: theme.fontSizes['3xl'],
    marginBottom: theme.spacing.md,
  },
  sectionSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  desktopSectionSubtitle: {
    fontSize: theme.fontSizes.lg,
    marginBottom: theme.spacing['2xl'],
  },
  safetyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  desktopSafetyGrid: {
    justifyContent: 'space-between',
    gap: theme.spacing.xl,
  },
  safetyFeature: {
    flexGrow: 1,
    minWidth: 160,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.base,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  safetyIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  safetyFeatureText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
  },
  quickList: {
    gap: theme.spacing.sm,
  },
  desktopQuickList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  desktopQuickCardWrapper: {
    flex: 1,
    minWidth: 320,
    maxWidth: '48%',
  },
  quickCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    ...theme.shadows.sm,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.base,
  },
  quickTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  quickSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  badgePill: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`,
    borderWidth: 1,
    borderColor: `${theme.colors.primary.main}40`,
    marginLeft: theme.spacing.sm,
  },
  badgePillText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default HomeScreen;
