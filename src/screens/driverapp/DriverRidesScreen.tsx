import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

const mockRides = [
  { id: '1', from: 'Hitech City', to: 'Gachibowli', fare: 120, status: 'Completed' },
  { id: '2', from: 'LB Nagar', to: 'Charminar', fare: 240, status: 'Completed' },
  { id: '3', from: 'Airport', to: 'Madhapur', fare: 620, status: 'Cancelled' },
];

const DriverRidesScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rides</Text>
      <FlatList
        data={mockRides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemRoute}>{item.from} → {item.to}</Text>
              <Text style={styles.itemMeta}>₹{item.fare} • {item.status}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.text.tertiary} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.lg, padding: theme.spacing.md, ...theme.shadows.sm },
  itemRoute: { fontWeight: theme.fontWeights.semiBold, color: theme.colors.text.primary },
  itemMeta: { color: theme.colors.text.secondary, marginTop: 2, fontSize: theme.fontSizes.sm },
});

export default DriverRidesScreen;
