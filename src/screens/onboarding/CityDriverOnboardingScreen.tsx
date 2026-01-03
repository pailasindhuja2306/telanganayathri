import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type Nav = StackNavigationProp<RootStackParamList, 'CityDriverOnboarding'>;

const CityDriverOnboardingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { verifyRole } = useAppState();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>City Driver Onboarding</Text>
        <Text style={styles.subtitle}>Upload DL, RC, Vehicle & Bank details</Text>
        <Button title="Submit & Continue" onPress={() => { verifyRole('cityDriver'); navigation.replace('DriverApp'); }} fullWidth gradient style={{ marginTop: 16 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary },
  subtitle: { marginTop: 8, color: theme.colors.text.secondary, textAlign: 'center' },
});

export default CityDriverOnboardingScreen;
