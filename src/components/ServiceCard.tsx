import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onPress: () => void;
  color?: string;
  gradient?: [string, string];
  badge?: string;
  featured?: boolean;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  square?: boolean;
  hideSubtitle?: boolean;
  centerContent?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  color = theme.colors.primary.main,
  gradient,
  badge,
  featured = false,
  style,
  compact = false,
  square = false,
  hideSubtitle = false,
  centerContent = false,
}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const elevationValue = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      Animated.timing(elevationValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(elevationValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const content = (
    <>
      {badge && (
        <View style={gradient ? styles.badge : [styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <View style={[
        styles.iconContainer,
        compact && styles.iconContainerCompact,
        Platform.OS === 'web' && styles.iconContainerWeb,
        { backgroundColor: gradient ? 'rgba(255, 255, 255, 0.2)' : `${color}15` }
      ]}>
        {icon}
      </View>
      <Text
        style={gradient ? styles.titleWhite : styles.title}
        allowFontScaling={false}
        numberOfLines={2}
      >
        {title}
      </Text>
      {!hideSubtitle && subtitle && (
        <Text
          style={gradient ? styles.subtitleWhite : styles.subtitle}
          allowFontScaling={false}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      )}
    </>
  );

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    ...Platform.select({
      web: {
        boxShadow: elevationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0px 2px 4px rgba(0,0,0,0.1)', '0px 8px 24px rgba(0,0,0,0.15)'],
        }),
      },
      default: {},
    }),
  };

  return (
    <Animated.View
      style={[
        styles.container,
        featured && styles.featured,
        square && styles.square,
        animatedStyle,
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        {gradient ? (
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.content,
              compact && styles.contentCompact,
              centerContent && styles.contentCentered,
            ]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.content,
              compact && styles.contentCompact,
              centerContent && styles.contentCentered,
            ]}
          >
            {content}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
    overflow: 'hidden',
    minHeight: 148,
    ...Platform.select({
      web: {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      },
    }),
  },
  featured: {
    borderColor: theme.colors.accent.women,
    borderWidth: 2,
    ...theme.shadows.md,
  },
  touchable: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 140,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  contentCompact: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    minHeight: 140,
  },
  contentCentered: {
    justifyContent: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    marginTop: theme.spacing.xs,
  },
  iconContainerCompact: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing.sm,
    marginTop: 0,
  },
  iconContainerWeb: {
    width: 64,
    height: 64,
    marginBottom: theme.spacing.md,
  },
  badge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.base,
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: theme.fontWeights.bold,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    lineHeight: theme.fontSizes.base * 1.25,
    flexShrink: 1,
  },
  titleWhite: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    lineHeight: theme.fontSizes.base * 1.25,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: theme.fontSizes.xs * 1.35,
  },
  subtitleWhite: {
    fontSize: theme.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: theme.fontSizes.xs * 1.35,
  },
  square: {
    aspectRatio: 1,
  },
});