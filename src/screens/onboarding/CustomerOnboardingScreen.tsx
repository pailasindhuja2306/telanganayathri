import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type Nav = StackNavigationProp<RootStackParamList, 'CustomerOnboarding'>;

const CustomerOnboardingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { verifyRole, setProfile } = useAppState();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [email, setEmail] = useState('');
  const [emergency, setEmergency] = useState('');

  const canContinue = name.trim().length >= 2 && !!gender;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Set up your profile</Text>
        <Input label="Full Name" value={name} onChangeText={setName} placeholder="Your name" />
        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.genderRow}>
          <Chip label="Male" active={gender==='male'} onPress={() => setGender('male')} />
          <Chip label="Female" active={gender==='female'} onPress={() => setGender('female')} />
          <Chip label="Other" active={gender==='other'} onPress={() => setGender('other')} />
        </View>
        <Input label="Email (optional)" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <Input label="Emergency Contact (optional)" value={emergency} onChangeText={setEmergency} placeholder="+91 xxxxx xxxxx" />

        <Button
          title="Complete"
          disabled={!canContinue}
          onPress={() => {
            setProfile({ name, gender: gender || undefined });
            verifyRole('customer');
            navigation.replace('MainApp');
          }}
          fullWidth
          gradient
          style={{ marginTop: theme.spacing.lg }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  content: { padding: theme.spacing.xl },
  title: { fontSize: theme.fontSizes.xl, fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.lg },
  sectionLabel: { fontSize: theme.fontSizes.sm, color: theme.colors.text.secondary, marginTop: theme.spacing.sm, marginBottom: 6 },
  genderRow: { flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.sm },
});

export default CustomerOnboardingScreen;

const Chip: React.FC<{ label: string; active?: boolean; onPress: () => void }> = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 999,
      backgroundColor: active ? theme.colors.primary.main : theme.colors.background.secondary,
      borderWidth: active ? 0 : 1,
      borderColor: theme.colors.border.light,
    }}
  >
    <Text style={{ color: active ? '#fff' : theme.colors.text.secondary, fontWeight: theme.fontWeights.medium }}>{label}</Text>
  </TouchableOpacity>
);
