import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'women' | 'ev';
  size?: 'sm' | 'base' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  gradient = false,
  ...props
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${size}`],
    styles[`button_${variant}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${size}`],
    styles[`text_${variant}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary.main : '#FFFFFF'}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </>
  );

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.8} {...props}>
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={buttonStyles}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  
  // Sizes
  button_sm: {
    height: theme.sizes.button.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  button_base: {
    height: theme.sizes.button.base,
    paddingHorizontal: theme.spacing.xl,
  },
  button_lg: {
    height: theme.sizes.button.lg,
    paddingHorizontal: theme.spacing['2xl'],
  },
  
  // Variants
  button_primary: {
    backgroundColor: theme.colors.primary.main,
    ...theme.shadows.base,
  },
  button_secondary: {
    backgroundColor: theme.colors.secondary.main,
    ...theme.shadows.base,
  },
  button_women: {
    backgroundColor: theme.colors.accent.women,
    ...theme.shadows.base,
  },
  button_ev: {
    backgroundColor: theme.colors.accent.ev,
    ...theme.shadows.base,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  
  // Text Styles
  text: {
    ...theme.typography.button,
    fontWeight: theme.fontWeights.semiBold,
  },
  text_sm: {
    fontSize: theme.fontSizes.sm,
  },
  text_base: {
    fontSize: theme.fontSizes.base,
  },
  text_lg: {
    fontSize: theme.fontSizes.lg,
  },
  text_primary: {
    color: '#FFFFFF',
  },
  text_secondary: {
    color: theme.colors.primary.main,
  },
  text_women: {
    color: '#FFFFFF',
  },
  text_ev: {
    color: theme.colors.primary.main,
  },
  text_outline: {
    color: theme.colors.primary.main,
  },
  text_ghost: {
    color: theme.colors.primary.main,
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  textDisabled: {
    opacity: 0.7,
  },
});
