import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';
import theme from '../../theme';

const requests = [
  { id: 'r1', name: 'A. Singh', seats: 1, status: 'Pending' },
  { id: 'r2', name: 'S. Khan', seats: 2, status: 'Accepted' },
];

const IntercityRequestsScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Seat Requests</Text>
    <FlatList
      data={requests}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.meta}>{item.seats} seats • {item.status}</Text>
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
  name: { fontWeight: theme.fontWeights.semiBold, color: theme.colors.text.primary },
  meta: { color: theme.colors.text.secondary, marginTop: 2 },
});

export default IntercityRequestsScreen;
