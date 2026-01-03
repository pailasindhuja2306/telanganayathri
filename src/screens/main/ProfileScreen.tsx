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
      padding: isMobile ? theme.spacing.lg : theme.spacing.xl,
      horizontalPadding: isMobile ? theme.spacing.md : theme.spacing.lg,
      nameSize: isMobile ? theme.fontSizes.lg : theme.fontSizes.xl,
      menuIconSize: isMobile ? 20 : 24,
    };
  }, [width]);

  React.useEffect(() => {
    if (!isProfileComplete) {
      navigation.replace('CustomerOnboarding');
    }
  }, [isProfileComplete]);

  const handleComingSoon = (title: string) => {
    Alert.alert(title, 'This option will be available soon.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          // Clear the state first
          await logout();
          // The SplashScreen will check token and navigate to Language
          // Use replace to go back to Splash which will handle navigation
          navigation.replace('Splash' as any);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={[styles.header, { paddingVertical: layout.padding, paddingHorizontal: layout.horizontalPadding }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={layout.isMobile ? 40 : 48} color={theme.colors.text.secondary} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { fontSize: layout.nameSize }]}>{profile?.name || 'Guest User'}</Text>
          <Text style={[styles.phone, { fontSize: layout.isMobile ? theme.fontSizes.xs : theme.fontSizes.sm }]}>{phone ? `+91 ${phone}` : '+91 XXXXX XXXXX'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menu}>
          <MenuItem
            icon="swap-horizontal-outline"
            title="Switch Role"
            onPress={() => navigation.navigate('RoleSelector')}
          />
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => handleComingSoon('Edit Profile')}
          />
          <MenuItem
            icon="wallet-outline"
            title="Payment Methods"
            onPress={() => handleComingSoon('Payment Methods')}
          />
          <MenuItem
            icon="time-outline"
            title="Trip History"
            onPress={() => handleComingSoon('Trip History')}
          />
          <MenuItem
            icon="star-outline"
            title="Ratings & Reviews"
            onPress={() => handleComingSoon('Ratings & Reviews')}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Safety Center"
            onPress={() => handleComingSoon('Safety Center')}
          />
          <MenuItem
            icon="gift-outline"
            title="Offers & Rewards"
            onPress={() => handleComingSoon('Offers & Rewards')}
          />
          <MenuItem
            icon="settings-outline"
            title="Settings"
            onPress={() => handleComingSoon('Settings')}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => handleComingSoon('Help & Support')}
          />
          <MenuItem
            icon="information-circle-outline"
            title="About"
            onPress={() => handleComingSoon('About Telangana Yatri')}
          />
          <MenuItem
            icon="log-out-outline"
            title="Logout"
            onPress={handleLogout}
            danger
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
  danger?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, danger }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  const iconSize = isMobile ? 20 : 24;
  const fontSize = isMobile ? theme.fontSizes.sm : theme.fontSizes.base;

  return (
    <TouchableOpacity style={[styles.menuItem, { paddingVertical: isMobile ? theme.spacing.sm : theme.spacing.base, paddingHorizontal: theme.spacing.lg }]} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={iconSize}
          color={danger ? theme.colors.error : theme.colors.text.secondary}
        />
        <Text style={[styles.menuText, { fontSize }, danger && styles.menuTextDanger]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={iconSize} color={theme.colors.text.tertiary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    width: '100%',
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  scrollView: {
    flex: 1,
    width: '100%',
    ...(Platform.OS === 'web' ? { height: '100vh' as any } : {}),
  },
  header: {
    backgroundColor: theme.colors.background.primary,
    alignItems: 'center',
    marginBottom: theme.spacing.base,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background.primary,
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  phone: {
    color: theme.colors.text.secondary,
  },
  menu: {
    backgroundColor: theme.colors.background.primary,
    paddingVertical: theme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.base,
    flex: 1,
  },
  menuText: {
    color: theme.colors.text.primary,
    flex: 1,
  },
  menuTextDanger: {
    color: theme.colors.error,
    fontWeight: theme.fontWeights.semiBold,
  },
});

export default ProfileScreen;
