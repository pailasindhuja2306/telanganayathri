import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { useAppState } from '../../state/AppState';
import theme from '../../theme';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { logout, profile, phone, isProfileComplete } = useAppState();
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    return {
      isMobile,
      isTablet,
      padding: isMobile ? theme.spacing.base : theme.spacing.lg,
      horizontalPadding: isMobile ? theme.spacing.base : theme.spacing.lg,
      nameSize: isMobile ? theme.fontSizes['2xl'] : theme.fontSizes['3xl'],
      menuIconSize: isMobile ? 22 : 26,
    };
  }, [width]);

  React.useEffect(() => {
    if (!isProfileComplete) {
      navigation.replace('CustomerOnboarding');
    }
  }, [isProfileComplete]);

  const handleComingSoon = (title: string) => {
    Alert.alert(title, 'This feature will be available soon.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            // Clear all app state and storage
            await logout();

            // Reset navigation to Language screen (entry point after logout)
            const parent = navigation.getParent?.();
            if (parent) {
              parent.reset({ index: 0, routes: [{ name: 'Language' }] });
            } else {
              navigation.reset({ index: 0, routes: [{ name: 'Language' }] });
            }
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={[theme.colors.primary.main, theme.colors.primary.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingVertical: layout.padding * 1.5, paddingHorizontal: layout.horizontalPadding }]}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={layout.isMobile ? 48 : 56} color={theme.colors.primary.main} />
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Ionicons name="camera" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { fontSize: layout.nameSize }]}>
            {profile?.name || 'Guest User'}
          </Text>
          <Text style={[styles.phone, { fontSize: layout.isMobile ? theme.fontSizes.sm : theme.fontSizes.base }]}>
            {phone ? `+91 ${phone}` : '+91 XXXXX XXXXX'}
          </Text>
          
          {/* Verified Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
              <Text style={styles.verifiedText}>Verified Rider</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={[styles.statsContainer, { paddingHorizontal: layout.horizontalPadding }]}>
          <StatCard icon="car-outline" label="Total Rides" value="24" color={theme.colors.primary.main} />
          <StatCard icon="star" label="Rating" value="4.8" color={theme.colors.warning} />
          <StatCard icon="people-outline" label="Referrals" value="8" color={theme.colors.success} />
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding }]}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <QuickActionCard
              icon="wallet-outline"
              title="Wallet"
              subtitle="₹250"
              color={theme.colors.accent.main}
              onPress={() => handleComingSoon('Wallet')}
            />
            <QuickActionCard
              icon="people-outline"
              title="Referrals"
              subtitle="Earn rewards"
              color={theme.colors.success}
              onPress={() => handleComingSoon('Referrals')}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => handleComingSoon('Edit Profile')}
            />
            <MenuItem
              icon="time-outline"
              title="Trip History"
              subtitle="View all your past rides"
              onPress={() => handleComingSoon('Trip History')}
              badge="24"
            />
          </View>
        </View>

        {/* Payments & Rewards */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding }]}>
          <Text style={styles.sectionTitle}>Payments & Rewards</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage your payment options"
              onPress={() => handleComingSoon('Payment Methods')}
            />
            <MenuItem
              icon="gift-outline"
              title="Offers & Rewards"
              subtitle="Claim your exclusive offers"
              onPress={() => handleComingSoon('Offers & Rewards')}
              badge="5"
              badgeColor={theme.colors.success}
            />
          </View>
        </View>

        {/* Safety & Support */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding }]}>
          <Text style={styles.sectionTitle}>Safety & Support</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="shield-checkmark-outline"
              title="Safety Center"
              subtitle="Your safety is our priority"
              onPress={() => handleComingSoon('Safety Center')}
            />
            <MenuItem
              icon="star-outline"
              title="Ratings & Reviews"
              subtitle="Rate your recent trips"
              onPress={() => handleComingSoon('Ratings & Reviews')}
            />
            <MenuItem
              icon="headset-outline"
              title="Help & Support"
              subtitle="24/7 customer support"
              onPress={() => handleComingSoon('Help & Support')}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding }]}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="settings-outline"
              title="Preferences"
              subtitle="Customize your app experience"
              onPress={() => handleComingSoon('Settings')}
            />
            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => handleComingSoon('Notifications')}
            />
            <MenuItem
              icon="language-outline"
              title="Language"
              subtitle="English, తెలుగు, हिंदी"
              onPress={() => handleComingSoon('Language')}
            />
            <MenuItem
              icon="information-circle-outline"
              title="About"
              subtitle="App version 1.0.0"
              onPress={() => handleComingSoon('About Telangana Yatri')}
            />
          </View>
        </View>

        {/* Logout */}
        <View style={[styles.section, { marginHorizontal: layout.horizontalPadding, marginBottom: layout.padding * 2 }]}>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="log-out-outline"
              title="Logout"
              subtitle="Sign out from your account"
              onPress={handleLogout}
              danger
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


// Stat Card Component
interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
  onPress: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, subtitle, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color="#FFFFFF" />
      </View>
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
    </TouchableOpacity>
  );
};

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  onPress?: () => void;
  danger?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, badge, badgeColor, onPress, danger }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const iconSize = isMobile ? 22 : 26;
  const fontSize = isMobile ? theme.fontSizes.base : theme.fontSizes.lg;

  return (
    <TouchableOpacity 
      style={[styles.menuItem, { paddingVertical: isMobile ? theme.spacing.base : theme.spacing.lg }]} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconContainer, danger && styles.menuIconDanger]}>
        <Ionicons
          name={icon}
          size={iconSize}
          color={danger ? theme.colors.error : theme.colors.primary.main}
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, { fontSize }, danger && styles.menuTextDanger]}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {badge && (
        <View style={[styles.badge, badgeColor && { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing['4xl'],
  },
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
    marginBottom: -theme.spacing['2xl'],
    borderBottomLeftRadius: theme.borderRadius['2xl'],
    borderBottomRightRadius: theme.borderRadius['2xl'],
    ...theme.shadows.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...theme.shadows.xl,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.accent.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...theme.shadows.md,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    color: '#FFFFFF',
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  phone: {
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: theme.spacing.base,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    gap: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  verifiedText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.success,
    fontWeight: theme.fontWeights.semiBold,
  },
  
  // Stats Section
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginTop: theme.spacing['2xl'],
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },

  // Section
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Quick Actions
  quickActions: {
    gap: theme.spacing.md,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    gap: theme.spacing.base,
    ...theme.shadows.sm,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },

  // Menu
  menuGroup: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border.light,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary.main + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.base,
  },
  menuIconDanger: {
    backgroundColor: theme.colors.error + '15',
  },
  menuContent: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  menuTitle: {
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  menuTextDanger: {
    color: theme.colors.error,
    fontWeight: theme.fontWeights.semiBold,
  },
  badge: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    marginRight: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.fontSizes.xs,
    color: '#FFFFFF',
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default ProfileScreen;
