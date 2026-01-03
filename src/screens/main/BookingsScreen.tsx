import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../theme';

const BookingsScreen: React.FC = () => {
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isMobile = width < 640;
    return {
      isMobile,
      padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
    };
  }, [width]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, { padding: layout.padding }]}>
        <Text style={[styles.title, { fontSize: layout.titleSize }]}>Bookings Screen</Text>
        <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>Your trip history will appear here</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    width: '100%',
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default BookingsScreen;
