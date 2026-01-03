import React, { useState } from 'react';
import { View, Text, StyleSheet,  KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, Input } from '../../components';
import theme from '../../theme';


type ForgotPasswordNav = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

interface Props { navigation: ForgotPasswordNav; }

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSend = email.includes('@');

  const handleSend = () => {
    if (!canSend) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="key" size={40} color={theme.colors.primary.main} />
            </View>
            <Text style={styles.title}>{sent ? 'Check your email' : 'Reset your password'}</Text>
            <Text style={styles.subtitle}>
              {sent ? 'We sent a reset link. Please follow the instructions.' : 'Enter the email associated with your account.'}
            </Text>
          </View>

          {!sent ? (
            <View style={styles.form}>
              <Input
                label="Email"
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />}
              />

              <Button title="Send reset link" onPress={handleSend} loading={loading} disabled={!canSend} fullWidth gradient />
            </View>
          ) : (
            <View style={styles.form}>
              <Button title="Back to Login" onPress={() => navigation.replace('Login')} fullWidth />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background.primary },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: theme.spacing.xl, paddingTop: theme.spacing['4xl'] },
  header: { alignItems: 'center', marginBottom: theme.spacing['3xl'] },
  iconContainer: {
    width: 72, height: 72, borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`, justifyContent: 'center', alignItems: 'center', marginBottom: theme.spacing.lg,
  },
  title: { fontSize: theme.fontSizes['2xl'], fontWeight: theme.fontWeights.bold, color: theme.colors.text.primary, marginBottom: theme.spacing.xs, textAlign: 'center' },
  subtitle: { fontSize: theme.fontSizes.base, color: theme.colors.text.secondary, textAlign: 'center' },
  form: { marginBottom: theme.spacing['3xl'] },
});

export default ForgotPasswordScreen;
