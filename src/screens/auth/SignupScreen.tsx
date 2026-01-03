import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, Input } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setProfile, setPhone, setToken } = useAppState();
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      isMobile,
      isTablet,
      isDesktop,
      padding: isMobile ? theme.spacing.lg : isTablet ? theme.spacing.xl : theme.spacing['2xl'],
      cardPadding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      titleSize: isMobile ? theme.fontSizes.xl : theme.fontSizes['2xl'],
      subtitleSize: isMobile ? theme.fontSizes.sm : theme.fontSizes.base,
      iconSize: isMobile ? 40 : isTablet ? 48 : 56,
      inputGap: isMobile ? theme.spacing.base : theme.spacing.lg,
      buttonHeight: isMobile ? 48 : 56,
    };
  }, [width]);

  const canSend = name.trim().length >= 2 && phoneNumber.length === 10 && agree;
  const canVerify = otp.length === 6;

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSendOTP = () => {
    if (!canSend) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  const handleVerify = () => {
    if (!canVerify) return;
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setProfile({ name: name.trim() });
      setPhone(phoneNumber);
      try {
        await setToken('demo-token');
      } catch (err) {
        console.warn('Failed to set token', err);
      }
      navigation.replace('MainApp');
    }, 1200);
  };

  return (
    <LinearGradient
      colors={[theme.colors.primary.main, theme.colors.accent.main, theme.colors.background.secondary]}
      style={styles.gradientBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { flexGrow: 1, padding: layout.padding }]}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
            keyboardDismissMode={Platform.OS === 'android' ? 'on-drag' : 'interactive'}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={[styles.card, layout.isDesktop && { maxWidth: 500, alignSelf: 'center' }]}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0.95)']}
                  style={[styles.cardGradient, { padding: layout.cardPadding }]}
                >
                  <View style={styles.header}>
                    <View style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary.main}10` }]}>
                      <LinearGradient
                        colors={[theme.colors.primary.main, theme.colors.primary.light]}
                        style={styles.iconGradient}
                      >
                        <Ionicons name="person-add" size={layout.iconSize} color="#FFFFFF" />
                      </LinearGradient>
                    </View>
                    <Text style={[styles.title, { fontSize: layout.titleSize }]}>
                      Create your account
                    </Text>
                    <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>
                      {otpSent ? 'Enter the OTP sent to your mobile' : 'Join Telangana Yatri in minutes'}
                    </Text>
                  </View>

                  <View style={[styles.form, { gap: layout.inputGap }]}>
                    {!otpSent ? (
                      <>
                        <Input
                          label="Full Name"
                          placeholder="Your name"
                          value={name}
                          onChangeText={setName}
                          leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.primary.main} />}
                        />
                        <Input
                          label="Mobile Number"
                          placeholder="Enter 10-digit mobile number"
                          keyboardType="phone-pad"
                          maxLength={10}
                          value={phoneNumber}
                          onChangeText={setPhoneNumber}
                          leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.primary.main} />}
                        />
                        <View style={styles.termsContainer}>
                          <TouchableOpacity
                            style={styles.checkbox}
                            onPress={() => setAgree(!agree)}
                          >
                            <View style={[styles.checkboxBox, agree && styles.checkboxBoxChecked]}>
                              {agree && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                            </View>
                          </TouchableOpacity>
                          <Text style={styles.termsText}>
                            I agree to the <Text style={styles.link}>Terms of Service</Text> and{' '}
                            <Text style={styles.link}>Privacy Policy</Text>
                          </Text>
                        </View>

                        <Button
                          title="Create Account & Send OTP"
                          onPress={handleSendOTP}
                          loading={loading}
                          disabled={!canSend}
                          fullWidth
                          gradient
                          size={layout.isMobile ? 'base' : 'lg'}
                          leftIcon={<Ionicons name="send" size={18} color="#FFFFFF" />}
                        />
                      </>
                    ) : (
                      <>
                        <View style={styles.otpHeader}>
                          <Ionicons name="phone-portrait" size={24} color={theme.colors.primary.main} />
                          <Text style={[styles.otpTitle, { fontSize: layout.isMobile ? theme.fontSizes.base : theme.fontSizes.lg }]}>
                            Verify Your Number
                          </Text>
                          <Text style={[styles.otpSubtitle, { fontSize: layout.isMobile ? theme.fontSizes.xs : theme.fontSizes.sm }]}>
                            Code sent to +91 {phoneNumber.slice(0, 5)} {phoneNumber.slice(5)}
                          </Text>
                        </View>

                        <Input
                          label="Enter 6-digit Code"
                          placeholder="000000"
                          keyboardType="number-pad"
                          maxLength={6}
                          value={otp}
                          onChangeText={setOtp}
                          leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.primary.main} />}
                        />

                        <Button
                          title="Verify & Complete Signup"
                          onPress={handleVerify}
                          loading={loading}
                          disabled={!canVerify}
                          fullWidth
                          gradient
                          size={layout.isMobile ? 'base' : 'lg'}
                          leftIcon={<Ionicons name="checkmark" size={18} color="#FFFFFF" />}
                        />

                        <TouchableOpacity onPress={() => { setOtpSent(false); setOtp(''); }} style={styles.resendContainer}>
                          <Text style={styles.resendText}>Didn't receive code? </Text>
                          <Text style={styles.resendLink}>Resend OTP</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>

                  {!otpSent && (
                    <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.switchAuthRow}>
                      <Text style={styles.switchAuthText}>Already have an account? </Text>
                      <Text style={styles.switchAuthLink}>Login here</Text>
                    </TouchableOpacity>
                  )}
                </LinearGradient>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  cardGradient: {
    borderRadius: theme.borderRadius.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  form: {
    marginBottom: theme.spacing.lg,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  checkbox: {
    paddingVertical: theme.spacing.xs,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxChecked: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  termsText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  link: {
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },
  otpHeader: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.base,
    paddingVertical: theme.spacing.base,
  },
  otpTitle: {
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  otpSubtitle: {
    color: theme.colors.text.tertiary,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.base,
  },
  resendText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  resendLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },
  switchAuthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  switchAuthText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  switchAuthLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default SignupScreen;
