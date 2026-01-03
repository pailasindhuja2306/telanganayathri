import React from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

const LogisticsHomeScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Logistics Dashboard</Text>
    <View style={styles.card}><Text style={styles.cardText}>Shipment Requests will appear here</Text></View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg, ...(Platform.OS === 'web' ? { height: '100%' as any } : {}) },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  card: { backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg, ...theme.shadows.sm },
  cardText: { color: theme.colors.text.secondary },
});

export default LogisticsHomeScreen;
