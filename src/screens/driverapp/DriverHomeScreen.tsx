import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

const DriverHomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Driver Home</Text>
        <Text style={styles.subtitle}>You are currently: <Text style={{ color: theme.colors.success }}>Online</Text></Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.metric}>
            <Ionicons name="timer" size={24} color={theme.colors.primary.main} />
            <Text style={styles.metricLabel}>Online</Text>
            <Text style={styles.metricValue}>2h 15m</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="navigate" size={24} color={theme.colors.primary.main} />
            <Text style={styles.metricLabel}>Trips</Text>
            <Text style={styles.metricValue}>5</Text>
          </View>
          <View style={styles.metric}>
            <Ionicons name="cash" size={24} color={theme.colors.primary.main} />
            <Text style={styles.metricLabel}>Earnings</Text>
            <Text style={styles.metricValue}>₹760</Text>
          </View>
        </View>
      </View>

      <View style={styles.banner}>
        <Ionicons name="information-circle" size={18} color={theme.colors.primary.contrast} />
        <Text style={styles.bannerText}>New bookings will appear here when assigned.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  header: { marginBottom: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary },
  subtitle: { fontSize: theme.fontSizes.sm, color: theme.colors.text.secondary, marginTop: 4 },
  card: { backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.xl, padding: theme.spacing.lg, ...theme.shadows.lg },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  metric: { alignItems: 'center', flex: 1 },
  metricLabel: { marginTop: theme.spacing.xs, color: theme.colors.text.secondary, fontSize: theme.fontSizes.xs },
  metricValue: { marginTop: 2, color: theme.colors.text.primary, fontWeight: theme.fontWeights.bold },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: theme.colors.primary.main, padding: theme.spacing.md, borderRadius: theme.borderRadius.lg, marginTop: theme.spacing.lg },
  bannerText: { color: theme.colors.primary.contrast, fontWeight: theme.fontWeights.semiBold },
});

export default DriverHomeScreen;
