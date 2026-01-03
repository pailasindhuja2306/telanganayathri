import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

const IntercityHomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Intercity Driver</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="add-circle" size={28} color={theme.colors.primary.main} />
          <Text style={styles.cardText}>Create Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="list" size={28} color={theme.colors.primary.main} />
          <Text style={styles.cardText}>My Trips</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg, ...(Platform.OS === 'web' ? { height: '100%' as any } : {}) },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  row: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, backgroundColor: theme.colors.background.secondary, padding: theme.spacing.lg, borderRadius: theme.borderRadius.lg, alignItems: 'center', ...theme.shadows.sm },
  cardText: { marginTop: 6, fontWeight: theme.fontWeights.semiBold, color: theme.colors.text.primary },
});

export default IntercityHomeScreen;
