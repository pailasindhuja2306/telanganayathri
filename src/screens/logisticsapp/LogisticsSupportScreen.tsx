import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const LogisticsSupportScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Support</Text>
    <Text style={styles.text}>Contact us for any help with shipments.</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.md },
  text: { color: theme.colors.text.secondary },
});

export default LogisticsSupportScreen;
