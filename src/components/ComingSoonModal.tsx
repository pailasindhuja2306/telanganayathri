import React, { useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

interface ComingSoonModalProps {
    visible: boolean;
    title: string;
    subtitle?: string;
    onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
    visible,
    title,
    subtitle,
    onClose,
}) => {
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    damping: 10,
                    mass: 1,
                    stiffness: 100,
                    overshootClamping: false,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 0,
                    damping: 10,
                    mass: 1,
                    stiffness: 100,
                    overshootClamping: false,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="none">
            <Animated.View
                style={[
                    styles.overlay,
                    {
                        opacity: opacityAnim,
                    },
                ]}
            >
                <TouchableOpacity
                    style={styles.overlayTouchable}
                    activeOpacity={1}
                    onPress={onClose}
                >
                    <Animated.View
                        style={[
                            styles.modalContainer,
                            {
                                transform: [{ scale: scaleAnim }],
                            },
                        ]}
                    >
                        <LinearGradient
                            colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0.95)']}
                            style={styles.modalGradient}
                        >
                            <View style={styles.iconContainer}>
                                <LinearGradient
                                    colors={[theme.colors.primary.main, theme.colors.primary.light]}
                                    style={styles.iconCircle}
                                >
                                    <Ionicons
                                        name="rocket"
                                        size={48}
                                        color="#FFFFFF"
                                    />
                                </LinearGradient>
                            </View>

                            <Text style={styles.title}>{title}</Text>

                            {subtitle && (
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            )}

                            <Text style={styles.comingSoonText}>Coming Soon!</Text>

                            <View style={styles.features}>
                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color={theme.colors.primary.main}
                                    />
                                    <Text style={styles.featureText}>Advanced Features</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color={theme.colors.primary.main}
                                    />
                                    <Text style={styles.featureText}>Seamless Integration</Text>
                                </View>
                                <View style={styles.featureItem}>
                                    <Ionicons
                                        name="checkmark-circle"
                                        size={20}
                                        color={theme.colors.primary.main}
                                    />
                                    <Text style={styles.featureText}>Better Experience</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={onClose}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={[theme.colors.primary.main, theme.colors.primary.light]}
                                    style={styles.closeButtonGradient}
                                >
                                    <Text style={styles.closeButtonText}>Got it!</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </LinearGradient>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalContainer: {
        width: '85%',
        maxWidth: 400,
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 20,
    },
    modalGradient: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: theme.spacing.lg,
    },
    iconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: theme.fontSizes['2xl'],
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.fontSizes.base,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    comingSoonText: {
        fontSize: theme.fontSizes.lg,
        fontWeight: theme.fontWeights.semiBold,
        color: theme.colors.accent.main,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    features: {
        width: '100%',
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.base,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    featureText: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.text.secondary,
        flex: 1,
    },
    closeButton: {
        width: '100%',
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
    },
    closeButtonGradient: {
        paddingVertical: theme.spacing.base,
        paddingHorizontal: theme.spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: theme.fontSizes.base,
        fontWeight: theme.fontWeights.bold,
        color: '#FFFFFF',
    },
});

export default ComingSoonModal;
