import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button } from '../../components';

type Nav = StackNavigationProp<RootStackParamList, 'Language'>;

const LanguageButton = ({
  label,
  onPress,
  active,
  width,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
  width: number;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const isMobile = width < 640;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <TouchableOpacity
        style={[styles.languageBtn, active && styles.languageBtnActive]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={active ? [theme.colors.primary.main, theme.colors.primary.light] : ['#F8FAFC', '#F1F5F9']}
          style={styles.languageBtnGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[styles.languageBtnText, active && styles.languageBtnTextActive, { fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base }]}>
            {label}
          </Text>
          {active && (
            <View style={styles.checkIcon}>
              <Ionicons name="checkmark-circle" size={isMobile ? 18 : 24} color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const LanguageScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { language, setLanguage } = useAppState();
  const { width } = useWindowDimensions();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const layout = useMemo(() => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      isMobile,
      isTablet,
      isDesktop,
      padding: isMobile ? theme.spacing.lg : isTablet ? theme.spacing.xl : theme.spacing['2xl'],
      cardPadding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
      iconSize: isMobile ? 40 : isTablet ? 48 : 56,
    };
  }, [width]);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={[theme.colors.primary.main, theme.colors.accent.main, theme.colors.background.secondary]}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim, padding: layout.padding }]}>
          <View style={[styles.card, layout.isDesktop && { maxWidth: 500, alignSelf: 'center' }]}>
            <LinearGradient
              colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0.95)']}
              style={[styles.cardGradient, { padding: layout.cardPadding }]}
            >
              <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary.main}10` }]}>
                  <Ionicons name="language" size={layout.iconSize} color={theme.colors.primary.main} />
                </View>
                <Text style={[styles.title, { fontSize: layout.titleSize }]}>Choose Your Language</Text>
                <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>
                  Select your preferred language to continue
                </Text>
              </View>

              <View style={[styles.languageGrid, { gap: layout.isMobile ? theme.spacing.md : theme.spacing.lg }]}>
                <LanguageButton
                  label="English"
                  active={language === 'en'}
                  onPress={() => setLanguage('en')}
                  width={width}
                />
                <LanguageButton
                  label="తెలుగు"
                  active={language === 'te'}
                  onPress={() => setLanguage('te')}
                  width={width}
                />
                <LanguageButton
                  label="اردو"
                  active={language === 'ur'}
                  onPress={() => setLanguage('ur')}
                  width={width}
                />
              </View>

              <View style={[styles.divider, { marginVertical: layout.isMobile ? theme.spacing.lg : theme.spacing.xl }]} />

              <View style={[styles.buttonContainer, { gap: layout.isMobile ? theme.spacing.md : theme.spacing.lg }]}>
                <Button
                  title="Continue with Phone"
                  onPress={() => navigation.replace('Login')}
                  fullWidth
                  gradient
                  size={layout.isMobile ? 'base' : 'lg'}
                  leftIcon={<Ionicons name="phone-portrait" size={20} color="#FFFFFF" />}
                />
                <Button
                  title="Create New Account"
                  onPress={() => navigation.replace('Signup')}
                  fullWidth
                  variant="outline"
                  size={layout.isMobile ? 'base' : 'lg'}
                  leftIcon={<Ionicons name="person-add" size={20} color={theme.colors.primary.main} />}
                />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );

};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 520,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  cardGradient: {
    borderRadius: theme.borderRadius.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    backgroundColor: `rgba(107, 33, 168, 0.1)`,
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  languageGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  languageBtn: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
    flex: 1,
    minWidth: 100,
  },
  languageBtnActive: {
    ...theme.shadows.md,
  },
  languageBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.base,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  languageBtnText: {
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.secondary,
  },
  languageBtnTextActive: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginLeft: theme.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.lg,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
});

export default LanguageScreen;
