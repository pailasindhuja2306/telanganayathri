import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components';
import theme from '../../theme';
import { RootStackParamList } from '../../types';

 type RideTrackingNavigationProp = StackNavigationProp<RootStackParamList, 'RideTracking'>;
 type RideTrackingRouteProp = RouteProp<RootStackParamList, 'RideTracking'>;

interface Props {
  navigation: RideTrackingNavigationProp;
  route: RideTrackingRouteProp;
}

const RideTrackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const rideId = route.params?.rideId;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="car" size={56} color={theme.colors.primary.main} />
        </View>
        <Text style={styles.title}>Ride booked!</Text>
        <Text style={styles.subtitle}>
          {rideId ? `Tracking ride ${rideId}. We will update you shortly.` : 'Tracking your driver. We will update you shortly.'}
        </Text>

        <View style={styles.actions}>
          <Button
            title="Back to Home"
            fullWidth
            onPress={() => navigation.navigate('MainApp')}
          />
          <Button
            title="View Bookings"
            variant="secondary"
            fullWidth
            onPress={() => navigation.navigate('MainApp', { screen: 'Bookings' } as any)}
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    ...(Platform.OS === 'web' ? { height: '100%' as any } : {}),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: `${theme.colors.primary.main}12`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizes['2xl'],
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginHorizontal: theme.spacing.base,
  },
  actions: {
    width: '100%',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  secondaryButton: {
    marginTop: theme.spacing.sm,
  },
});

export default RideTrackingScreen;
