import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import theme from '../../theme';

const trips = [
  { id: 't1', route: 'Hyderabad → Vijayawada', date: 'Dec 21', seats: 2 },
  { id: 't2', route: 'Warangal → Visakhapatnam', date: 'Dec 24', seats: 3 },
];

const IntercityTripsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>My Trips</Text>
    <FlatList
      data={trips}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.route}>{item.route}</Text>
          <Text style={styles.meta}>{item.date} • {item.seats} seats</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  item: { backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.lg, padding: theme.spacing.md, ...theme.shadows.sm },
  route: { fontWeight: theme.fontWeights.semiBold, color: theme.colors.text.primary },
  meta: { color: theme.colors.text.secondary, marginTop: 2 },
});

export default IntercityTripsScreen;
