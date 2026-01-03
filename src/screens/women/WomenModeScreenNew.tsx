import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, SafetyBar } from '../../components';
import { SOSButton } from '../../components/SOSButton';
import theme from '../../theme';

type WomenModeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WomenMode'>;

interface Props {
  navigation: WomenModeScreenNavigationProp;
}

const WomenModeScreen: React.FC<Props> = ({ navigation }) => {
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [liveShareEnabled, setLiveShareEnabled] = useState(true);
  const [audioRecording, setAudioRecording] = useState(false);

  const handleActivateSheYatri = () => {
    if (!verificationComplete) {
      Alert.alert(
        'Verification Required',
        'Please complete identity verification to use She-Yatri mode',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Verify Now', onPress: () => console.log('Start verification') },
        ]
      );
      return;
    }
    
    navigation.navigate('RideBooking');
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafetyBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>She-Yatri</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={[theme.colors.accent.women, theme.colors.accent.womenDark]}
          style={styles.heroSection}
        >
          <View style={styles.heroIcon}>
            <Ionicons name="shield-checkmark" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>Women-Only Safe Rides</Text>
          <Text style={styles.heroSubtitle}>
            Only verified women riders • Only verified women drivers
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Women Drivers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Verified</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>24×7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="shield-checkmark" size={28} color={theme.colors.accent.women} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>100% Verified Women Drivers</Text>
              <Text style={styles.featureDesc}>
                All drivers undergo Aadhaar, police verification & background checks
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="location" size={28} color={theme.colors.accent.women} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Live Location Sharing</Text>
              <Text style={styles.featureDesc}>
                Auto-share ride details with up to 3 emergency contacts
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="mic" size={28} color={theme.colors.accent.women} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>In-Ride Audio Recording</Text>
              <Text style={styles.featureDesc}>
                Optional audio recording for your safety (encrypted & private)
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="call" size={28} color={theme.colors.accent.women} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>One-Tap SOS Alert</Text>
              <Text style={styles.featureDesc}>
                Instant alert to police, contacts & our safety team
              </Text>
            </View>
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Verification Status</Text>
          
          <View style={[styles.verificationCard, verificationComplete && styles.verificationComplete]}>
            <View style={styles.verificationHeader}>
              <Ionicons 
                name={verificationComplete ? "checkmark-circle" : "alert-circle"} 
                size={32} 
                color={verificationComplete ? theme.colors.success : theme.colors.warning} 
              />
              <View style={styles.verificationText}>
                <Text style={styles.verificationTitle}>
                  {verificationComplete ? 'Verified ✓' : 'Verification Pending'}
                </Text>
                <Text style={styles.verificationDesc}>
                  {verificationComplete 
                    ? 'You can now use She-Yatri mode'
                    : 'Complete verification to access She-Yatri'
                  }
                </Text>
              </View>
            </View>
            
            {!verificationComplete && (
              <TouchableOpacity style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>Complete Verification</Text>
                <Ionicons name="arrow-forward" size={16} color={theme.colors.accent.women} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Safety Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Auto Live Share</Text>
              <Text style={styles.settingDesc}>Share location with emergency contacts</Text>
            </View>
            <Switch
              value={liveShareEnabled}
              onValueChange={setLiveShareEnabled}
              trackColor={{ false: '#D1D5DB', true: theme.colors.accent.womenLight }}
              thumbColor={liveShareEnabled ? theme.colors.accent.women : '#F3F4F6'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>In-Ride Recording</Text>
              <Text style={styles.settingDesc}>Record audio during rides (optional)</Text>
            </View>
            <Switch
              value={audioRecording}
              onValueChange={setAudioRecording}
              trackColor={{ false: '#D1D5DB', true: theme.colors.accent.womenLight }}
              thumbColor={audioRecording ? theme.colors.accent.women : '#F3F4F6'}
            />
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Emergency Contacts</Text>
            <TouchableOpacity>
              <Text style={styles.addContact}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contactCard}>
            <Ionicons name="person-circle" size={40} color={theme.colors.text.secondary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>Add Emergency Contact</Text>
              <Text style={styles.contactDesc}>Up to 3 trusted contacts</Text>
            </View>
            <Ionicons name="add-circle" size={24} color={theme.colors.accent.women} />
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaContainer}>
          <Button
            title="Activate She-Yatri Mode"
            onPress={handleActivateSheYatri}
            variant="women"
            size="lg"
            fullWidth
            leftIcon={<Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />}
          />
          <Text style={styles.ctaNote}>
            By activating, you'll only be matched with verified women drivers
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating SOS Button */}
      <SOSButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  stat: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  section: {
    padding: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  addContact: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.accent.women,
  },
  featureCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    marginBottom: theme.spacing.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${theme.colors.accent.women}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    lineHeight: 18,
  },
  verificationCard: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.warning,
  },
  verificationComplete: {
    borderColor: theme.colors.success,
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  verificationDesc: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.accent.women,
    marginRight: theme.spacing.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  settingInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  settingDesc: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderStyle: 'dashed',
  },
  contactInfo: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  ctaContainer: {
    padding: theme.spacing.lg,
  },
  ctaNote: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});

export default WomenModeScreen;
