import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import theme from '../../theme';

const DriverEarningsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Earnings</Text>
      <View style={styles.card}>
        <Text style={styles.amount}>₹3,450</Text>
        <Text style={styles.caption}>This week</Text>
      </View>
      <View style={[styles.row, { marginTop: theme.spacing.md }]}>
        <View style={styles.stat}><Text style={styles.statLabel}>Trips</Text><Text style={styles.statValue}>22</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>Online</Text><Text style={styles.statValue}>16h</Text></View>
        <View style={styles.stat}><Text style={styles.statLabel}>Cancel</Text><Text style={styles.statValue}>2</Text></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  card: { backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.xl, padding: theme.spacing.xl, alignItems: 'center', ...theme.shadows.lg },
  amount: { fontSize: theme.fontSizes['3xl'], fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary },
  caption: { color: theme.colors.text.secondary, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { flex: 1, backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.lg, padding: theme.spacing.md, marginHorizontal: 4, alignItems: 'center', ...theme.shadows.sm },
  statLabel: { color: theme.colors.text.secondary, fontSize: theme.fontSizes.sm },
  statValue: { color: theme.colors.text.primary, fontWeight: theme.fontWeights.bold, marginTop: 4 },
});

export default DriverEarningsScreen;
