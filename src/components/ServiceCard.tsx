import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Animated,
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

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
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
        { backgroundColor: gradient ? 'rgba(255, 255, 255, 0.2)' : `${color}15` }
      ]}>
        {icon}
      </View>
      <Text
        style={gradient ? styles.titleWhite : styles.title}
        allowFontScaling={false}
      >
        {title}
      </Text>
      {!hideSubtitle && subtitle && (
        <Text
          style={gradient ? styles.subtitleWhite : styles.subtitle}
          allowFontScaling={false}
        >
          {subtitle}
        </Text>
      )}
    </>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        featured && styles.featured,
        square && styles.square,
        { transform: [{ scale: scaleValue }] },
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
  },
  featured: {
    borderColor: theme.colors.accent.women,
    borderWidth: 1,
    ...theme.shadows.sm,
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