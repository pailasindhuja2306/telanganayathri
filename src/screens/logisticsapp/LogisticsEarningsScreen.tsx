import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import theme from '../../theme';

const LogisticsEarningsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Earnings</Text>
    <View style={styles.card}><Text style={styles.cardText}>₹0 this week</Text></View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  card: { backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.lg, padding: theme.spacing.lg, ...theme.shadows.sm },
  cardText: { color: theme.colors.text.secondary },
});

export default LogisticsEarningsScreen;
