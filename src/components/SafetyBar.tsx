import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

interface SafetyBarProps {
  visible?: boolean;
  onSOSPress?: () => void;
  onShareLocationPress?: () => void;
  tripActive?: boolean;
}

export const SafetyBar: React.FC<SafetyBarProps> = ({
  visible = true,
  onSOSPress,
  onShareLocationPress,
  tripActive = false,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
        <Text style={styles.text}>
          {tripActive ? 'You are safe • Trip Active' : 'Your safety matters'}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.button} onPress={onShareLocationPress}>
          <Ionicons name="share-social-outline" size={18} color={theme.colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.sosButton]}
          onPress={onSOSPress}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  text: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.medium,
  },
  rightSection: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  button: {
    padding: theme.spacing.sm,
  },
  sosButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.base,
    borderRadius: theme.borderRadius.base,
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.bold,
  },
});
