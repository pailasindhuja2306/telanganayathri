import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useAppState } from '../../state/AppState';
import { Button } from '../../components';
import theme from '../../theme';

type RoleSelectorNavigationProp = StackNavigationProp<RootStackParamList, 'RoleSelector'>;

interface Props {
  navigation: RoleSelectorNavigationProp;
}

const RoleSelectorScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'cityDriver' | 'intercityDriver' | 'logistics' | null>(null);
  const { verified } = useAppState();
  const { width } = Dimensions.get('window');
  const compact = Platform.OS === 'web' && width >= 900; // tighter layout on web

  const handleContinue = () => {
    if (!selectedRole) return;
    const map: Record<string, { verified: boolean; app: keyof RootStackParamList; onboarding: keyof RootStackParamList }> = {
      customer: { verified: verified.customer, app: 'MainApp', onboarding: 'CustomerOnboarding' },
      cityDriver: { verified: verified.cityDriver, app: 'DriverApp', onboarding: 'CityDriverOnboarding' },
      intercityDriver: { verified: verified.intercityDriver, app: 'IntercityApp', onboarding: 'IntercityOnboarding' },
      logistics: { verified: verified.logistics, app: 'LogisticsApp', onboarding: 'LogisticsOnboarding' },
    };
    const target = map[selectedRole];
    const route = target.verified ? target.app : target.onboarding;
    console.log('RoleSelector navigating to:', route, 'verified:', target.verified);
    navigation.replace(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content} 
        style={{flex:1}}
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>I want to use Telangana Yatri as</Text>
          <Text style={styles.subtitle}>Select your role to continue</Text>
        </View>

        <View style={[styles.cardsContainer, compact && styles.cardsGrid]}>
          <RoleCard
            icon="person"
            title="Customer"
            description="Book rides, tours & services"
            features={['Quick Bookings', 'Safety First', 'Best Prices']}
            selected={selectedRole === 'customer'}
            onPress={() => setSelectedRole('customer')}
            compact={compact}
            gradient={[theme.colors.primary.main, theme.colors.primary.light]}
          />

          <RoleCard
            icon="car"
            title="City Driver"
            description="Bike/Auto/Cab for local rides"
            features={['Go Online', 'Ride Requests', 'Navigation']}
            selected={selectedRole === 'cityDriver'}
            onPress={() => setSelectedRole('cityDriver')}
            compact={compact}
            gradient={[theme.colors.secondary.dark, theme.colors.secondary.main]}
          />

          <RoleCard
            icon="git-network"
            title="Intercity Driver"
            description="Post long trips & share seats"
            features={['Create Trip', 'Seat Requests', 'Earnings']}
            selected={selectedRole === 'intercityDriver'}
            onPress={() => setSelectedRole('intercityDriver')}
            compact={compact}
            gradient={[theme.colors.warning, '#FBBF24'] as any}
          />

          <RoleCard
            icon="cube"
            title="Logistics Partner"
            description="Parcels, movers, trucks & tempos"
            features={['Requests', 'Navigation', 'Delivery Status']}
            selected={selectedRole === 'logistics'}
            onPress={() => setSelectedRole('logistics')}
            compact={compact}
            gradient={[theme.colors.text.primary, theme.colors.text.secondary] as any}
          />
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedRole}
          fullWidth
          gradient
          size={compact ? 'base' : 'lg'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

interface RoleCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  features: string[];
  selected: boolean;
  onPress: () => void;
  gradient: [string, string];
  compact?: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({
  icon,
  title,
  description,
  features,
  selected,
  onPress,
  gradient,
  compact,
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        compact && styles.cardWrapperCompact,
        { transform: [{ scale: scaleValue }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            selected && styles.cardSelected,
            compact && { padding: theme.spacing.lg, minHeight: 180 },
          ]}
        >
          {selected && (
            <View style={styles.checkmark}>
              <Ionicons name="checkmark-circle" size={28} color="#FFFFFF" />
            </View>
          )}

          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={compact ? 40 : 48} color="#FFFFFF" />
          </View>

          <Text style={[styles.cardTitle, compact && { fontSize: theme.fontSizes.xl }]}>{title}</Text>
          <Text style={[styles.cardDescription, compact && { fontSize: theme.fontSizes.sm }]}>{description}</Text>

          <View style={[styles.features, compact && { gap: theme.spacing.sm }]}>
            {features.map((feature, index) => (
              <View key={index} style={styles.feature}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing['4xl'],
    paddingBottom: theme.spacing['4xl'],
    flexGrow: 1,
  },
  contentCompact: {
    maxWidth: 960,
    alignSelf: 'center',
    paddingTop: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSizes.base,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xl,
  },
  cardWrapper: {
    flex: 1,
  },
  cardWrapperCompact: {
    width: '48%',
  },
  card: {
    flex: 1,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
    position: 'relative',
  },
  cardSelected: {
    transform: [{ scale: 1.02 }],
    ...theme.shadows.xl,
  },
  checkmark: {
    position: 'absolute',
    top: theme.spacing.base,
    right: theme.spacing.base,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  cardTitle: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.sm,
  },
  cardDescription: {
    fontSize: theme.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.xl,
  },
  features: {
    gap: theme.spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.fontSizes.sm,
    color: '#FFFFFF',
  },
});

export default RoleSelectorScreen;
