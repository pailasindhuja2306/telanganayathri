import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Nav = StackNavigationProp<RootStackParamList, 'CustomerOnboarding'>;

const CustomerOnboardingScreen: React.FC<{ navigation: Nav }> = ({ navigation }) => {
  const { verifyRole, setProfile } = useAppState();
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [email, setEmail] = useState('');
  const [emergency, setEmergency] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 640;

  const canContinue = name.trim().length >= 2 && !!gender;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Welcome Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={[theme.colors.primary.main, theme.colors.primary.dark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconContainer}
            >
              <Ionicons name="person-add" size={isMobile ? 36 : 48} color="#FFFFFF" />
            </LinearGradient>
            
            <Text style={[styles.title, { fontSize: isMobile ? theme.fontSizes['2xl'] : theme.fontSizes['3xl'] }]}>
              Create Your Profile
            </Text>
            <Text style={[styles.subtitle, { fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base }]}>
              Let's get to know you better! Complete your profile to get started.
            </Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: canContinue ? '100%' : '50%' }]} />
            </View>
            <Text style={styles.progressText}>
              {canContinue ? 'Almost there!' : 'Just a few details'}
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Name Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Ionicons name="person-outline" size={20} color={theme.colors.primary.main} />
                <Text style={styles.fieldLabel}>Full Name *</Text>
              </View>
              <Input 
                value={name} 
                onChangeText={setName} 
                placeholder="Enter your full name" 
                autoCapitalize="words"
              />
            </View>

            {/* Gender Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Ionicons name="male-female-outline" size={20} color={theme.colors.primary.main} />
                <Text style={styles.fieldLabel}>Gender *</Text>
              </View>
              <View style={styles.genderRow}>
                <GenderChip 
                  icon="male" 
                  label="Male" 
                  active={gender==='male'} 
                  onPress={() => setGender('male')} 
                />
                <GenderChip 
                  icon="female" 
                  label="Female" 
                  active={gender==='female'} 
                  onPress={() => setGender('female')} 
                />
                <GenderChip 
                  icon="male-female" 
                  label="Other" 
                  active={gender==='other'} 
                  onPress={() => setGender('other')} 
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />
                <Text style={[styles.fieldLabel, styles.optionalLabel]}>Email</Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
              <Input 
                value={email} 
                onChangeText={setEmail} 
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Emergency Contact Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Ionicons name="call-outline" size={20} color={theme.colors.text.secondary} />
                <Text style={[styles.fieldLabel, styles.optionalLabel]}>Emergency Contact</Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
              <Input 
                value={emergency} 
                onChangeText={setEmergency} 
                placeholder="+91 xxxxx xxxxx"
                keyboardType="phone-pad"
              />
              <Text style={styles.helperText}>
                This number will be contacted in case of emergency
              </Text>
            </View>
          </View>

          {/* Safety Note */}
          <View style={styles.safetyNote}>
            <Ionicons name="shield-checkmark" size={20} color={theme.colors.success} />
            <Text style={styles.safetyText}>
              Your information is secure and will never be shared without your consent.
            </Text>
          </View>

          {/* Continue Button */}
          <Button
            title="Complete Profile"
            disabled={!canContinue}
            onPress={() => {
              setProfile({ name, gender: gender || undefined });
              verifyRole('customer');
              navigation.replace('MainApp');
            }}
            fullWidth
            gradient
            style={styles.continueButton}
          />

          {/* Skip Option */}
          {canContinue && (
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => {
                setProfile({ name, gender: gender || undefined });
                verifyRole('customer');
                navigation.replace('MainApp');
              }}
            >
              <Text style={styles.skipText}>Skip optional fields</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary.main} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


// Gender Chip Component
interface GenderChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress: () => void;
}

const GenderChip: React.FC<GenderChipProps> = ({ icon, label, active, onPress }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.genderChip,
        active && styles.genderChipActive,
      ]}
    >
      <View style={[styles.genderIconContainer, active && styles.genderIconActive]}>
        <Ionicons 
          name={icon} 
          size={isMobile ? 20 : 24} 
          color={active ? '#FFFFFF' : theme.colors.primary.main} 
        />
      </View>
      <Text style={[
        styles.genderLabel,
        active && styles.genderLabelActive,
        { fontSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background.secondary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: { 
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing['4xl'],
  },
  
  // Header Styles
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
    marginTop: theme.spacing.base,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  title: { 
    fontWeight: theme.fontWeights.bold, 
    color: theme.colors.text.primary, 
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.base,
  },

  // Progress Styles
  progressContainer: {
    marginBottom: theme.spacing['2xl'],
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.borderRadius.full,
  },
  progressText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    fontWeight: theme.fontWeights.medium,
  },

  // Form Styles
  form: {
    gap: theme.spacing.xl,
  },
  fieldContainer: {
    gap: theme.spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  fieldLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  optionalLabel: {
    color: theme.colors.text.secondary,
  },
  optionalTag: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.tertiary,
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.xs,
  },
  helperText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
    lineHeight: 16,
  },

  // Gender Selection Styles
  genderRow: { 
    flexDirection: 'row', 
    gap: theme.spacing.sm,
  },
  genderChip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    gap: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  genderChipActive: {
    backgroundColor: theme.colors.primary.main + '10',
    borderColor: theme.colors.primary.main,
  },
  genderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary.main + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderIconActive: {
    backgroundColor: theme.colors.primary.main,
  },
  genderLabel: {
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text.secondary,
  },
  genderLabelActive: {
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },

  // Safety Note
  safetyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.success + '10',
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.base,
  },
  safetyText: {
    flex: 1,
    fontSize: theme.fontSizes.xs,
    color: theme.colors.success,
    lineHeight: 18,
  },

  // Buttons
  continueButton: {
    marginTop: theme.spacing.lg,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.base,
    marginTop: theme.spacing.base,
  },
  skipText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.medium,
  },
});

export default CustomerOnboardingScreen;
