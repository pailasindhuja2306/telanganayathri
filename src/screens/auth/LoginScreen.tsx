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
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, Input } from '../../components';
import theme from '../../theme';
import { useAppState } from '../../state/AppState';
import { auth, db, firebaseConfig } from '../../config/firebase';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationId, setVerificationId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { setPhone, setToken, syncProfileFromRemote, syncBookingsFromRemote } = useAppState();
    const { width } = useWindowDimensions();
    const recaptchaVerifier = React.useRef<FirebaseRecaptchaVerifierModal>(null);

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
        };
    }, [width]);

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

    const handleSendOTP = async () => {
        if (phoneNumber.length !== 10) return;
        setLoading(true);
        setErrorMessage(null);
        try {
            const provider = new PhoneAuthProvider(auth);
            const id = await provider.verifyPhoneNumber(
                `+91${phoneNumber}`,
                recaptchaVerifier.current as any
            );
            setVerificationId(id);
            setOtpSent(true);
        } catch (err: any) {
            setErrorMessage(err?.message || 'Failed to send OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (otp.length !== 6) return;
        if (!verificationId) {
            setErrorMessage('Please request OTP again.');
            return;
        }
        setLoading(true);
        setErrorMessage(null);
        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            const userCredential = await signInWithCredential(auth, credential);
            const user = userCredential.user;
            let profileComplete = false;
            try {
                profileComplete = await syncProfileFromRemote();
                const userRef = doc(db, 'users', user.uid);
                await setDoc(
                    userRef,
                    {
                        phone: phoneNumber,
                        updatedAt: serverTimestamp(),
                        lastLoginAt: serverTimestamp(),
                        isProfileComplete: profileComplete,
                    },
                    { merge: true }
                );
            } catch (error) {
                console.warn('Failed to update user in Firestore', error);
            }
            const token = await user.getIdToken();
            setPhone(phoneNumber);
            await setToken(token);
            await syncBookingsFromRemote();
            if (profileComplete) {
                navigation.replace('MainApp');
            } else {
                navigation.replace('CustomerOnboarding');
            }
        } catch (err: any) {
            setErrorMessage(err?.message || 'Invalid OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={[theme.colors.primary.main, theme.colors.accent.main, theme.colors.background.secondary]}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification
            />
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
                                                <Ionicons name="call-sharp" size={layout.iconSize} color="#FFFFFF" />
                                            </LinearGradient>
                                        </View>
                                        <Text style={[styles.title, { fontSize: layout.titleSize }]}>
                                            Welcome Back
                                        </Text>
                                        <Text style={[styles.subtitle, { fontSize: layout.subtitleSize }]}>
                                            {otpSent ? 'Enter the verification code sent to your mobile' : 'Sign in with your mobile number'}
                                        </Text>
                                    </View>

                                    <View style={[styles.form, { gap: layout.inputGap }]}>
                                        {!otpSent ? (
                                            <>
                                                {errorMessage ? (
                                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                                ) : null}
                                                <Input
                                                    label="Mobile Number"
                                                    placeholder="Enter 10-digit mobile number"
                                                    keyboardType="phone-pad"
                                                    maxLength={10}
                                                    value={phoneNumber}
                                                    onChangeText={setPhoneNumber}
                                                    leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.primary.main} />}
                                                />
                                                <Button
                                                    title="Send Verification Code"
                                                    onPress={handleSendOTP}
                                                    loading={loading}
                                                    disabled={phoneNumber.length !== 10}
                                                    fullWidth
                                                    gradient
                                                    size={layout.isMobile ? 'base' : 'lg'}
                                                    leftIcon={<Ionicons name="send" size={18} color="#FFFFFF" />}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {errorMessage ? (
                                                    <Text style={styles.errorText}>{errorMessage}</Text>
                                                ) : null}
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
                                                    title="Verify & Login"
                                                    onPress={handleVerifyOTP}
                                                    loading={loading}
                                                    disabled={otp.length !== 6}
                                                    fullWidth
                                                    gradient
                                                    size={layout.isMobile ? 'base' : 'lg'}
                                                    leftIcon={<Ionicons name="checkmark" size={18} color="#FFFFFF" />}
                                                />

                                                <TouchableOpacity onPress={() => { setOtpSent(false); setOtp(''); setVerificationId(null); }} style={styles.resendContainer}>
                                                    <Text style={styles.resendText}>Didn't receive code? </Text>
                                                    <Text style={styles.resendLink}>Resend OTP</Text>
                                                </TouchableOpacity>
                                            </>
                                        )}
                                    </View>

                                    <TouchableOpacity onPress={() => navigation.replace('Language')} style={styles.backLink}>
                                        <Ionicons name="arrow-back" size={18} color={theme.colors.primary.main} />
                                        <Text style={styles.backLinkText}>Back to Language</Text>
                                    </TouchableOpacity>

                                    {!otpSent && (
                                        <TouchableOpacity onPress={() => navigation.replace('Signup')} style={styles.switchAuthRow}>
                                            <Text style={styles.switchAuthText}>Don't have an account? </Text>
                                            <Text style={styles.switchAuthLink}>Sign up</Text>
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
    errorText: {
        color: '#D32F2F',
        fontSize: theme.fontSizes.xs,
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
        lineHeight: 24,
    },
    form: {
        marginBottom: theme.spacing.lg,
    },
    button: {
        marginTop: theme.spacing.sm,
    },
    otpHeader: {
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
        marginBottom: theme.spacing.base,
        backgroundColor: `${theme.colors.primary.main}08`,
        borderRadius: theme.borderRadius.lg,
        gap: theme.spacing.sm,
    },
    otpTitle: {
        fontWeight: theme.fontWeights.semiBold,
        color: theme.colors.text.primary,
    },
    otpSubtitle: {
        color: theme.colors.text.secondary,
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
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    backLinkText: {
        color: theme.colors.primary.main,
        fontWeight: theme.fontWeights.medium,
        fontSize: theme.fontSizes.sm,
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

export default LoginScreen;
