import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type Nav = StackNavigationProp<RootStackParamList, 'LogisticsOnboarding'>;

const LogisticsOnboardingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { verifyRole } = useAppState();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Logistics Partner Onboarding</Text>
        <Text style={styles.subtitle}>Choose service, upload ID, vehicle & bank details</Text>
        <Button title="Submit & Continue" onPress={() => { verifyRole('logistics'); navigation.replace('LogisticsApp'); }} fullWidth gradient style={{ marginTop: 16 }} />
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

export default LogisticsOnboardingScreen;
