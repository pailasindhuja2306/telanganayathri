import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
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
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.accent.women, theme.colors.accent.womenLight]}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>She-Yatri</Text>
          <Text style={styles.headerSubtitle}>Women-Only Safe Rides</Text>
        </View>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Safety Banner */}
        <View style={styles.safetyBanner}>
          <View style={styles.safetyIcon}>
            <Ionicons name="shield-checkmark" size={32} color={theme.colors.accent.women} />
          </View>
          <Text style={styles.safetyTitle}>Your Safety is Our Priority</Text>
          <Text style={styles.safetyText}>
            All drivers are verified women professionals with background checks and safety training
          </Text>
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          <View style={styles.featuresList}>
            <SafetyFeature
              icon="woman"
              title="Women Drivers Only"
              description="Verified female drivers"
            />
            <SafetyFeature
              icon="shield-checkmark"
              title="Background Verified"
              description="Complete police verification"
            />
            <SafetyFeature
              icon="location"
              title="Live Tracking"
              description="Share trip with family"
            />
            <SafetyFeature
              icon="call"
              title="Emergency SOS"
              description="One-tap emergency alert"
            />
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.servicesGrid}>
            <ServiceCard
              title="Instant Ride"
              subtitle="Book now"
              icon={<Ionicons name="car" size={28} color={theme.colors.accent.women} />}
              onPress={() => navigation.navigate('RideBooking')}
              color={theme.colors.accent.women}
              style={styles.serviceCard}
            />
            <ServiceCard
              title="Hourly Driver"
              subtitle="4hrs, 8hrs"
              icon={<Ionicons name="time" size={28} color={theme.colors.accent.women} />}
              onPress={() => {}}
              color={theme.colors.accent.women}
              style={styles.serviceCard}
            />
            <ServiceCard
              title="Airport Transfer"
              subtitle="Fixed price"
              icon={<Ionicons name="airplane" size={28} color={theme.colors.accent.women} />}
              onPress={() => {}}
              color={theme.colors.accent.women}
              style={styles.serviceCard}
            />
            <ServiceCard
              title="Tour Package"
              subtitle="Explore safely"
              icon={<Ionicons name="map" size={28} color={theme.colors.accent.women} />}
              onPress={() => navigation.navigate('TourPackages')}
              color={theme.colors.accent.women}
              style={styles.serviceCard}
            />
          </View>
        </View>

        {/* Sample Driver */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Drivers</Text>
          <DriverCard
            name="Priya Sharma"
            rating={4.9}
            totalTrips={845}
            vehicleNumber="TS 09 CD 5678"
            vehicleModel="Honda City"
            verified
            womenDriver
          />
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <Button
            title="Book a Safe Ride Now"
            onPress={() => navigation.navigate('RideBooking')}
            variant="women"
            fullWidth
            size="lg"
            leftIcon={<Ionicons name="woman" size={20} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface SafetyFeatureProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

const SafetyFeature: React.FC<SafetyFeatureProps> = ({ icon, title, description }) => (
  <View style={styles.feature}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={24} color={theme.colors.accent.women} />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
    <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    ...(Platform.OS === 'web' ? {
      height: '100%',
      display: 'flex' as any,
    } : {}),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.xl,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    ...(Platform.OS === 'web' ? {
      height: '100%',
    } : {}),
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  safetyBanner: {
    backgroundColor: theme.colors.background.primary,
    margin: theme.spacing.xl,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  safetyIcon: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.accent.women}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  safetyTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  safetyText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.base,
  },
  featuresList: {
    gap: theme.spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: `${theme.colors.accent.women}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.base,
  },
  serviceCard: {
    width: '48%',
  },
  ctaContainer: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing['2xl'],
  },
});

export default WomenModeScreen;
