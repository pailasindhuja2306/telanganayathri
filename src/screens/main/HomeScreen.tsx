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
      title: 'Rental Vehicle',
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
            size={layout.isMobile ? 28 : layout.isDesktop ? 32 : 30}
            color={theme.colors.primary.main} />
          <Text style={[styles.logoText, layout.isDesktop && styles.desktopLogoText]}>
            Telangana Yatri
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.notificationButton, layout.isDesktop && styles.desktopNotificationButton]}>
            <Ionicons
              name="notifications-outline"
              size={layout.isMobile ? 24 : 26}
              color={theme.colors.text.primary} />
          </TouchableOpacity>
          {layout.isDesktop && (
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={28} color={theme.colors.primary.main} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Welcome Section */}
      <View style={[styles.welcomeSection, layout.page, layout.isDesktop && styles.desktopWelcomeSection]}>
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

      {/* Enhanced Primary CTA - Book a Ride */}
      <TouchableOpacity onPress={() => navigation.navigate('RideBooking')}>
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.primaryCTA,
            layout.page,
            layout.isDesktop && styles.desktopPrimaryCTA,
            isWeb && { marginTop: theme.spacing.lg }
          ]}
        >
          <View style={[styles.ctaContent, layout.isDesktop && styles.desktopCtaContent]}>
            <View style={styles.ctaTextContainer}>
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
            <View style={[styles.ctaIcon, layout.isDesktop && styles.desktopCtaIcon]}>
              <Ionicons
                name="arrow-forward"
                size={layout.isMobile ? 24 : 28}
                color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Enhanced Services Grid */}
      <View style={[
        styles.section,
        styles.servicesSection,
        layout.page,
        { paddingHorizontal: layout.sectionPadding },
        layout.isDesktop && styles.desktopServicesSection
      ]}>
        <Text style={[styles.sectionTitle, layout.isDesktop && styles.desktopSectionTitle]}>
          Our Services (Telangana)
        </Text>
        <Text style={[styles.sectionSubtitle, layout.isDesktop && styles.desktopSectionSubtitle]}>
          City default: Hyderabad · TS only
        </Text>

        <FlatList
          data={services.slice(0, layout.isLargeDesktop ? 10 : 8)}
          keyExtractor={(s) => s.key}
          numColumns={layout.serviceColumns}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: layout.serviceColumns === 2 ? 'space-between' : 'flex-start'
          }}
          ItemSeparatorComponent={() => <View style={{ height: layout.gap }} />}
          contentContainerStyle={{ paddingBottom: layout.gap }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width: layout.serviceCardWidth }}>
              <ServiceCard
                title={item.title}
                square
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

      {/* Tour Hyderabad */}
      <View style={[styles.section, layout.page]}>
        <Text style={styles.sectionTitle}>Tour Hyderabad</Text>
        <Text style={styles.sectionSubtitle}>Hyperlocal curation · Telugu & Urdu friendly guides</Text>
        <View style={styles.quickList}>
          {hyderabadTours.map((item, index) => (
            <QuickCard key={index} item={item} />
          ))}
        </View>
      </View>

      {/* Airport & Metro */}
      <View style={[styles.section, layout.page]}>
        <Text style={styles.sectionTitle}>Airport & Metro</Text>
        <Text style={styles.sectionSubtitle}>RGIA + TSRTC Pushpak · Metro feeder pickups</Text>
        <View style={styles.quickList}>
          {airportMetro.map((item, index) => (
            <QuickCard key={index} item={item} badge="HYD" />
          ))}
        </View>
      </View>

      {/* Safety Features */}
      <View style={[styles.section, layout.page]}>
        <Text style={styles.sectionTitle}>Safety Features</Text>
        <View
          style={[
            styles.safetyGrid,
            { columnGap: layout.gap, rowGap: layout.gap },
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
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    paddingTop: 0,
    flexGrow: 1,
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
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    ...theme.shadows.sm,
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
    fontSize: theme.fontSizes.xl,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  notificationButton: {
    padding: theme.spacing.sm,
  },
  desktopNotificationButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
  },
  profileButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.primary.main}10`,
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
    paddingHorizontal: theme.spacing['2xl'],
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  desktopWelcomeText: {
    fontSize: theme.fontSizes.lg,
    textAlign: 'center',
  },
  userNameText: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  desktopUserNameText: {
    fontSize: theme.fontSizes['3xl'],
    textAlign: 'center',
  },
  desktopWelcomeSubtitle: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    maxWidth: 600,
    alignSelf: 'center',
  },
  // Primary CTA Styles
  primaryCTA: {
    marginHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.md,
  },
  desktopPrimaryCTA: {
    marginHorizontal: theme.spacing['2xl'],
    marginTop: theme.spacing.xl,
    borderRadius: theme.borderRadius['2xl'],
    ...theme.shadows.lg,
  },
  ctaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  desktopCtaContent: {
    padding: theme.spacing['2xl'],
    alignItems: 'flex-start',
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  desktopCtaTitle: {
    fontSize: theme.fontSizes['2xl'],
    marginBottom: theme.spacing.sm,
  },
  ctaSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.md,
  },
  desktopCtaSubtitle: {
    fontSize: theme.fontSizes.base,
    marginBottom: theme.spacing.lg,
  },
  ctaFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  desktopCtaFeatures: {
    gap: theme.spacing.md,
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
    fontSize: theme.fontSizes.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  ctaIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopCtaIcon: {
    width: 56,
    height: 56,
    marginTop: theme.spacing.md,
  },
  // Section Styles
  section: {
    marginTop: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.xl,
    overflow: 'hidden' as any,
  },
  servicesSection: {
    paddingBottom: theme.spacing['3xl'],
    marginBottom: theme.spacing.lg,
  },
  desktopServicesSection: {
    marginTop: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing['2xl'],
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
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  },
  desktopSectionSubtitle: {
    fontSize: theme.fontSizes.base,
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  safetyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
