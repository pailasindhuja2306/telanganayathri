import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.3)).current;
  const { width } = useWindowDimensions();

  const { token, isProfileComplete } = useAppState();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      // If we have a token, decide where to go
      if (token) {
        if (isProfileComplete) {
          navigation.replace('MainApp');
        } else {
          // send to onboarding to complete profile
          navigation.replace('CustomerOnboarding');
        }
      } else {
        navigation.replace('Language');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const cornerSize = isMobile ? 100 : isTablet ? 140 : 180;
  const cornerTop = isMobile ? theme.spacing['4xl'] : isTablet ? theme.spacing['5xl'] : theme.spacing['6xl'];

  return (
    <LinearGradient
      colors={[theme.colors.primary.dark, theme.colors.primary.main, theme.colors.primary.light]}
      style={styles.container}
    >
      <Image
        source={require('../../../assets/cm.png')}
        style={[
          styles.cornerImage,
          styles.cornerLeft,
          { width: cornerSize, height: cornerSize, borderRadius: Math.round(cornerSize / 2), top: cornerTop },
        ]}
        resizeMode="cover"
      />
      <Image
        source={require('../../../assets/dpcm.png')}
        style={[
          styles.cornerImage,
          styles.cornerRight,
          { width: cornerSize, height: cornerSize, borderRadius: Math.round(cornerSize / 2), top: cornerTop },
        ]}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="car-sport" size={64} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Telangana Yatri</Text>
        <Text style={styles.subtitle}>Your Safe Journey Partner</Text>

        <View style={styles.safetyBadge}>
          <Ionicons name="shield-checkmark" size={20} color={theme.colors.secondary.main} />
          <Text style={styles.safetyText}>Safe • Secure • Trusted</Text>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Empowering Telangana's Mobility</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing['3xl'],
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: theme.fontSizes['4xl'],
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing['3xl'],
  },
  safetyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.sm,
  },
  safetyText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
  },
  footer: {
    position: 'absolute',
    bottom: theme.spacing['4xl'],
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: theme.fontSizes.sm,
  },
  cornerImage: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cornerLeft: {
    left: theme.spacing.xl,
  },
  cornerRight: {
    right: theme.spacing.xl,
  },
});

export default SplashScreen;
