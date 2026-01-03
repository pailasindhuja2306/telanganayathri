import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafetyBar, SOSButton } from '../../components';
import { AnimatedServiceCard } from '../../components/AnimatedServiceCard';
import theme from '../../theme';

const { width, height } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface ServiceTile {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  badge?: string;
  route?: keyof RootStackParamList;
}

const PremiumHomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState<'local' | 'interstate'>('local');
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > 50) {
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(headerOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    });

    return () => scrollY.removeAllListeners();
  }, []);

  const localServices: ServiceTile[] = [
    {
      id: 'ride-now',
      title: 'Ride Now',
      subtitle: 'Instant bike, auto & cab',
      icon: 'car-sport',
      color: theme.colors.primary.main,
      route: 'RideBooking',
    },
    {
      id: 'she-yatri',
      title: 'She-Yatri',
      subtitle: 'Women-only safe rides',
      icon: 'shield-checkmark',
      color: theme.colors.accent.women,
      badge: 'WOMEN ONLY',
      route: 'WomenMode',
    },
    {
      id: 'ev-rides',
      title: 'EV Rides',
      subtitle: 'Eco-friendly electric',
      icon: 'leaf',
      color: theme.colors.accent.ev,
      badge: 'ECO',
      route: 'RideBooking',
    },
    {
      id: 'book-driver',
      title: 'Book Driver',
      subtitle: '2hr, 4hr, 8hr packages',
      icon: 'time',
      color: '#FF6B35',
      route: 'DriverBooking',
    },
    {
      id: 'tour-packages',
      title: 'Tour Packages',
      subtitle: 'Explore Hyderabad',
      icon: 'map',
      color: '#F4C430',
      route: 'TourPackages',
    },
    {
      id: 'bus-bulk',
      title: 'Bus / Bulk',
      subtitle: 'Events & group travel',
      icon: 'bus',
      color: theme.colors.services.bus,
    },
  ];

  const interstateServices: ServiceTile[] = [
    {
      id: 'intercity-share',
      title: 'Intercity Share',
      subtitle: 'Share rides to other states',
      icon: 'git-network',
      color: '#3B82F6',
      badge: 'SHARE',
    },
    {
      id: 'parcel-logistics',
      title: 'Logistics',
      subtitle: 'Parcels & transport',
      icon: 'cube',
      color: '#8B5A00',
    },
  ];

  const quickPicks = [
    { name: 'Hitech City', icon: 'business', gradient: ['#667eea', '#764ba2'] as const },
    { name: 'Gachibowli', icon: 'desktop', gradient: ['#f093fb', '#f5576c'] as const },
    { name: 'Charminar', icon: 'location', gradient: ['#4facfe', '#00f2fe'] as const },
    { name: 'Secunderabad', icon: 'train', gradient: ['#43e97b', '#38f9d7'] as const },
    { name: 'LB Nagar', icon: 'home', gradient: ['#fa709a', '#fee140'] as const },
    { name: 'Airport', icon: 'airplane', gradient: ['#30cfd0', '#330867'] as const },
  ];

  const handleServicePress = (service: ServiceTile) => {
    if (service.route) {
      navigation.navigate(service.route as any);
    }
  };

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Floating Header */}
      <Animated.View
        style={[
          styles.floatingHeader,
          {
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={[styles.blurHeader, { backgroundColor: 'rgba(255, 255, 255, 0.95)' }]}>
          <Text style={styles.floatingHeaderText}>Telangana Yatri</Text>
        </View>
      </Animated.View>

      <SafetyBar />

      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Premium Header */}
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslateY }],
            },
          ]}
        >
          <View>
            <Text style={styles.greeting}>Mana Telangana 🌟</Text>
            <Text style={styles.userName}>Mana Yatri</Text>
            <View style={styles.languageBadges}>
              <View style={styles.langBadge}>
                <Text style={styles.langText}>తెలుగు</Text>
              </View>
              <View style={styles.langBadge}>
                <Text style={styles.langText}>اردو</Text>
              </View>
              <View style={styles.langBadge}>
                <Text style={styles.langText}>English</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <LinearGradient
              colors={[theme.colors.primary.main, theme.colors.primary.light]}
              style={styles.profileGradient}
            >
              <Ionicons name="person" size={24} color="#FFFFFF" />
              <View style={styles.profileDot} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Premium Safety Banner */}
        <TouchableOpacity style={styles.safetyBanner} activeOpacity={0.9}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.safetyGradient}
          >
            <View style={styles.safetyGlow} />
            <View style={styles.safetyContent}>
              <View style={styles.safetyIconContainer}>
                <Ionicons name="shield-checkmark" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyTitle}>💯 Verified Drivers</Text>
                <Text style={styles.safetySubtitle}>
                  24×7 SOS • Live Tracking • Women-Safe
                </Text>
              </View>
              <View style={styles.safetyBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.safetyBadgeText}>4.8</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Premium Section Tabs */}
        <View style={styles.sectionTabs}>
          <TouchableOpacity
            style={[styles.tab, selectedSection === 'local' && styles.tabActive]}
            onPress={() => setSelectedSection('local')}
            activeOpacity={0.8}
          >
            {selectedSection === 'local' && (
              <LinearGradient
                colors={[theme.colors.primary.main, theme.colors.primary.light]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name="location"
              size={18}
              color={selectedSection === 'local' ? '#FFFFFF' : theme.colors.text.secondary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabText, selectedSection === 'local' && styles.tabTextActive]}>
              LOCAL
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedSection === 'interstate' && styles.tabActive]}
            onPress={() => setSelectedSection('interstate')}
            activeOpacity={0.8}
          >
            {selectedSection === 'interstate' && (
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name="airplane"
              size={18}
              color={selectedSection === 'interstate' ? '#FFFFFF' : theme.colors.text.secondary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabText, selectedSection === 'interstate' && styles.tabTextActive]}>
              INTERSTATE
            </Text>
          </TouchableOpacity>
        </View>

        {/* Animated Service Tiles Grid */}
        <View style={styles.servicesGrid}>
          {(selectedSection === 'local' ? localServices : interstateServices).map((service, index) => (
            <AnimatedServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              icon={service.icon}
              color={service.color}
              badge={service.badge}
              onPress={() => handleServicePress(service)}
              delay={index * 50}
            />
          ))}
        </View>

        {/* Hyderabad Quick Picks with Premium Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>🏙️ Quick Picks</Text>
              <Text style={styles.sectionSubtitle}>Popular destinations</Text>
            </View>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAll}>See All</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary.main} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickPicksScroll}
            decelerationRate="fast"
            snapToInterval={90}
          >
            {quickPicks.map((pick, index) => (
              <TouchableOpacity key={index} style={styles.quickPick} activeOpacity={0.8}>
                <LinearGradient
                  colors={pick.gradient}
                  style={styles.quickPickGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={pick.icon as any} size={28} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.quickPickText}>{pick.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Premium Trust Badges */}
        <View style={styles.trustSection}>
          <Text style={styles.trustTitle}>Why Choose Us</Text>
          <View style={styles.trustBadges}>
            <View style={styles.trustBadge}>
              <View style={[styles.trustIcon, { backgroundColor: '#10B98120' }]}>
                <Ionicons name="checkmark-done-circle" size={24} color={theme.colors.success} />
              </View>
              <Text style={styles.trustText}>Govt Verified</Text>
              <Text style={styles.trustSubtext}>100% Licensed</Text>
            </View>
            <View style={styles.trustBadge}>
              <View style={[styles.trustIcon, { backgroundColor: '#8B5CF620' }]}>
                <Ionicons name="shield-checkmark" size={24} color={theme.colors.accent.women} />
              </View>
              <Text style={styles.trustText}>Women-Safe</Text>
              <Text style={styles.trustSubtext}>24×7 Protected</Text>
            </View>
            <View style={styles.trustBadge}>
              <View style={[styles.trustIcon, { backgroundColor: '#F59E0B20' }]}>
                <Ionicons name="cash" size={24} color={theme.colors.warning} />
              </View>
              <Text style={styles.trustText}>Fair Pricing</Text>
              <Text style={styles.trustSubtext}>No Hidden Fees</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* Floating SOS Button */}
      <SOSButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  blurHeader: {
    padding: theme.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  floatingHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.text.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  languageBadges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  langBadge: {
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  langText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  profileButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary.main,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  profileDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  safetyBanner: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
  },
  safetyGradient: {
    padding: theme.spacing.md,
    position: 'relative',
  },
  safetyGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  safetyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safetyTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  safetyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  safetySubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.95)',
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  safetyBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabActive: {
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.primary.main,
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text.secondary,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  servicesGrid: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  section: {
    marginTop: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAll: {
    fontSize: 14,
    color: theme.colors.primary.main,
    fontWeight: '600',
  },
  quickPicksScroll: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  quickPick: {
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  quickPickGradient: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  quickPickText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    maxWidth: 72,
  },
  trustSection: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  trustTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    letterSpacing: 0.3,
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  trustBadge: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  trustIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  trustText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 2,
  },
  trustSubtext: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default PremiumHomeScreen;
