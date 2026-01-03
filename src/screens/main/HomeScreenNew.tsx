import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { SafetyBar } from '../../components';
import theme from '../../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - theme.spacing.xl * 3) / 2;

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedSection, setSelectedSection] = useState<'local' | 'interstate'>('local');

  // LOCAL SERVICES (Telangana Only)
  const localServices: ServiceTile[] = [
    {
      id: 'ride-now',
      title: 'Ride Now',
      subtitle: 'Bike, Auto, Cab instantly',
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
      subtitle: 'Hyderabad city & nearby',
      icon: 'map',
      color: '#FF6B35',
      route: 'TourPackages',
    },
    {
      id: 'bus-bulk',
      title: 'Bus / Bulk',
      subtitle: 'Marriages, events, groups',
      icon: 'bus',
      color: theme.colors.services.bus,
    },
  ];

  // INTERSTATE SERVICES (From Telangana)
  const interstateServices: ServiceTile[] = [
    {
      id: 'intercity-share',
      title: 'Intercity Share',
      subtitle: 'Share rides to other states',
      icon: 'git-network',
      color: '#3B82F6',
      badge: 'BLABLA STYLE',
    },
    {
      id: 'parcel-logistics',
      title: 'Parcel & Logistics',
      subtitle: 'Parcels, movers, transport',
      icon: 'cube',
      color: '#8B5A00',
    },
  ];

  const handleServicePress = (service: ServiceTile) => {
    if (service.route) {
      navigation.navigate(service.route as any);
    }
  };

  const renderServiceTile = (service: ServiceTile) => (
    <TouchableOpacity
      key={service.id}
      style={[styles.serviceTile, { backgroundColor: service.color }]}
      onPress={() => handleServicePress(service)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[service.color, `${service.color}CC`]}
        style={styles.tileGradient}
      >
        {service.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{service.badge}</Text>
          </View>
        )}
        
        <View style={styles.tileIcon}>
          <Ionicons name={service.icon} size={32} color="#FFFFFF" />
        </View>
        
        <Text style={styles.tileTitle}>{service.title}</Text>
        <Text style={styles.tileSubtitle}>{service.subtitle}</Text>
        
        <View style={styles.tileArrow}>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SafetyBar />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Mana Telangana, Mana Yatri</Text>
            <Text style={styles.userName}>తెలుగు • اردو • English</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={theme.colors.text.primary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Safety Banner */}
        <TouchableOpacity style={styles.safetyBanner}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.safetyGradient}
          >
            <View style={styles.safetyContent}>
              <Ionicons name="shield-checkmark" size={24} color="#FFFFFF" />
              <View style={styles.safetyTextContainer}>
                <Text style={styles.safetyTitle}>100% Verified Drivers</Text>
                <Text style={styles.safetySubtitle}>24×7 SOS • Women-Safe Rides • Live Tracking</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Section Tabs */}
        <View style={styles.sectionTabs}>
          <TouchableOpacity
            style={[styles.tab, selectedSection === 'local' && styles.tabActive]}
            onPress={() => setSelectedSection('local')}
          >
            <Text style={[styles.tabText, selectedSection === 'local' && styles.tabTextActive]}>
              LOCAL (Telangana)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedSection === 'interstate' && styles.tabActive]}
            onPress={() => setSelectedSection('interstate')}
          >
            <Text style={[styles.tabText, selectedSection === 'interstate' && styles.tabTextActive]}>
              INTERSTATE
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Tiles Grid */}
        <View style={styles.servicesGrid}>
          {selectedSection === 'local'
            ? localServices.map(renderServiceTile)
            : interstateServices.map(renderServiceTile)}
        </View>

        {/* Trust Badges */}
        <View style={styles.trustBadges}>
          <View style={styles.trustBadge}>
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
            <Text style={styles.trustText}>Govt Verified</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="people" size={20} color={theme.colors.success} />
            <Text style={styles.trustText}>Driver-Friendly</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="shield" size={20} color={theme.colors.success} />
            <Text style={styles.trustText}>Women-Safe</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
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
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  userName: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  safetyBanner: {
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
  },
  safetyGradient: {
    padding: theme.spacing.md,
  },
  safetyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safetyTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  safetyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  safetySubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: theme.colors.primary.main,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  servicesGrid: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  serviceTile: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  tileGradient: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tileIcon: {
    marginTop: 8,
  },
  tileTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  tileSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  tileArrow: {
    position: 'absolute',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  trustBadge: {
    alignItems: 'center',
  },
  trustText: {
    fontSize: 11,
    color: theme.colors.text.secondary,
    marginTop: 4,
  },
});

export default HomeScreen;
