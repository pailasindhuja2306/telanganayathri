import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

interface SOSButtonProps {
  onPress?: () => void;
  style?: any;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onPress, style }) => {
  const handleSOS = () => {
    if (onPress) {
      onPress();
    } else {
      // Default SOS action
      console.log('SOS ACTIVATED');
      // In production: trigger emergency alert, share location, notify authorities
    }
  };

  return (
    <TouchableOpacity
      style={[styles.sosButton, style]}
      onPress={handleSOS}
      activeOpacity={0.8}
    >
      <View style={styles.sosInner}>
        <Ionicons name="alert-circle" size={24} color="#FFFFFF" />
        <Text style={styles.sosText}>SOS</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sosButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
      },
    }),
  },
  sosInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
});
