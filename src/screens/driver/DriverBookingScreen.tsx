import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { Button, Input } from '../../components';
import theme from '../../theme';

type DriverBookingNavigationProp = StackNavigationProp<RootStackParamList, 'DriverBooking'>;

interface Props {
  navigation: DriverBookingNavigationProp;
}

type BookingType = 'hourly' | 'outstation';

const DriverBookingScreen: React.FC<Props> = ({ navigation }) => {
  const [bookingType, setBookingType] = useState<BookingType>('hourly');
  // Hourly inputs
  const [hourlyStartDate, setHourlyStartDate] = useState('');
  const [hourlyStartTime, setHourlyStartTime] = useState('');
  const [hours, setHours] = useState<number>(2);
  // Outstation inputs
  const [outStartDate, setOutStartDate] = useState('');
  const [outEndDate, setOutEndDate] = useState('');
  const [outPickup, setOutPickup] = useState('');
  const [outDestination, setOutDestination] = useState('');

  const hourlyPricePerHour = 299; // includes fuel & driver
  const outPricePerDay = 1799;
  const outDriverAllowance = 300;

  const days = useMemo(() => {
    // If both dates present, estimate days difference minimum 1; else derive from endDate numeric input
    if (outStartDate && outEndDate) {
      const d1 = new Date(outStartDate);
      const d2 = new Date(outEndDate);
      const diff = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
      return diff;
    }
    return 1;
  }, [outStartDate, outEndDate]);

  const hourlyTotal = useMemo(() => hours * hourlyPricePerHour, [hours]);
  const outstationTotal = useMemo(() => days * (outPricePerDay + outDriverAllowance), [days]);

  const hourlyValid = hourlyStartDate && hourlyStartTime && hours >= 2;
  const outstationValid = outStartDate && (outEndDate || days >= 1) && outPickup && outDestination;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Driver</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Booking Type Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Booking Type</Text>
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleCard, bookingType === 'hourly' && styles.toggleCardSelected]}
              onPress={() => setBookingType('hourly')}
              activeOpacity={0.9}
            >
              <View style={styles.toggleIcon}><Ionicons name="time-outline" size={24} color={theme.colors.primary.main} /></View>
              <Text style={styles.toggleTitle}>Hourly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleCard, bookingType === 'outstation' && styles.toggleCardSelected]}
              onPress={() => setBookingType('outstation')}
              activeOpacity={0.9}
            >
              <View style={styles.toggleIcon}><Ionicons name="trail-sign" size={24} color={theme.colors.primary.main} /></View>
              <Text style={styles.toggleTitle}>Outstation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hourly Flow */}
        {bookingType === 'hourly' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hourly Driver Details</Text>
            <View style={styles.detailsCard}>
              <Input
                label="Start Date"
                placeholder="YYYY-MM-DD"
                value={hourlyStartDate}
                onChangeText={setHourlyStartDate}
                leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.text.secondary} />}
              />
              <Input
                label="Start Time"
                placeholder="HH:MM"
                value={hourlyStartTime}
                onChangeText={setHourlyStartTime}
                leftIcon={<Ionicons name="time-outline" size={20} color={theme.colors.text.secondary} />}
              />

              <View style={styles.stepperRow}>
                <Text style={styles.stepperLabel}>Number of Hours</Text>
                <View style={styles.stepperControls}>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => setHours((h) => Math.max(2, h - 1))}>
                    <Ionicons name="remove" size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{hours}</Text>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => setHours((h) => Math.min(12, h + 1))}>
                    <Ionicons name="add" size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.infoCard}>
                <View style={styles.infoRow}><Ionicons name="cash-outline" size={18} color={theme.colors.primary.main} /><Text style={styles.infoTextInline}>₹{hourlyPricePerHour} per hour</Text></View>
                <View style={styles.infoRow}><Ionicons name="car-outline" size={18} color={theme.colors.success} /><Text style={styles.infoTextInline}>Includes fuel & driver</Text></View>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Pricing Summary</Text>
                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Type</Text><Text style={styles.summaryValue}>Hourly</Text></View>
                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Duration</Text><Text style={styles.summaryValue}>{hours} hours</Text></View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}><Text style={styles.summaryTotalLabel}>Estimated Price</Text><Text style={styles.summaryTotalValue}>₹{hourlyTotal}</Text></View>
              </View>
            </View>
          </View>
        )}

        {/* Outstation Flow */}
        {bookingType === 'outstation' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outstation Driver Details</Text>
            <View style={styles.detailsCard}>
              <Input
                label="Start Date"
                placeholder="YYYY-MM-DD"
                value={outStartDate}
                onChangeText={setOutStartDate}
                leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.text.secondary} />}
              />
              <Input
                label="End Date"
                placeholder="YYYY-MM-DD"
                value={outEndDate}
                onChangeText={setOutEndDate}
                leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.text.secondary} />}
              />
              <Input
                label="Pickup Location"
                placeholder="Enter pickup address"
                value={outPickup}
                onChangeText={setOutPickup}
                leftIcon={<Ionicons name="location-outline" size={20} color={theme.colors.text.secondary} />}
              />
              <Input
                label="Destination (City)"
                placeholder="Enter destination city"
                value={outDestination}
                onChangeText={setOutDestination}
                leftIcon={<Ionicons name="navigate-outline" size={20} color={theme.colors.text.secondary} />}
              />

              <View style={styles.infoCard}>
                <View style={styles.infoRow}><Ionicons name="cash-outline" size={18} color={theme.colors.primary.main} /><Text style={styles.infoTextInline}>₹{outPricePerDay} per day</Text></View>
                <View style={styles.infoRow}><Ionicons name="person-outline" size={18} color={theme.colors.secondary.main} /><Text style={styles.infoTextInline}>Driver allowance ₹{outDriverAllowance}/day</Text></View>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Pricing Summary</Text>
                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Type</Text><Text style={styles.summaryValue}>Outstation</Text></View>
                <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Duration</Text><Text style={styles.summaryValue}>{days} days</Text></View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}><Text style={styles.summaryTotalLabel}>Estimated Price</Text><Text style={styles.summaryTotalValue}>₹{outstationTotal}</Text></View>
              </View>
            </View>
          </View>
        )}

        {/* Inclusions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.inclusionsList}>
            <InclusionItem icon="checkmark-circle" text="Professional verified driver" />
            <InclusionItem icon="checkmark-circle" text="Multiple stops allowed" />
            <InclusionItem icon="checkmark-circle" text="Live tracking" />
            <InclusionItem icon="checkmark-circle" text="24/7 customer support" />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      {(bookingType === 'hourly' ? hourlyValid : outstationValid) && (
        <View style={styles.footer}>
          <View style={styles.footerPrice}>
            <Text style={styles.footerPriceLabel}>Estimated Price</Text>
            <Text style={styles.footerPriceValue}>
              ₹{bookingType === 'hourly' ? hourlyTotal : outstationTotal}
            </Text>
          </View>
          <Button
            title={bookingType === 'hourly' ? 'Continue' : 'Continue'}
            onPress={() => {}}
            disabled={!(bookingType === 'hourly' ? hourlyValid : outstationValid)}
            gradient
            size="lg"
            style={{ flex: 1 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

interface InclusionItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const InclusionItem: React.FC<InclusionItemProps> = ({ icon, text }) => (
  <View style={styles.inclusionItem}>
    <Ionicons name={icon} size={20} color={theme.colors.success} />
    <Text style={styles.inclusionText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    ...(Platform.OS === 'web' ? {
      height: '100%',
      display: 'flex' as any,
    } : {}),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  scrollView: {
    flex: 1,
    ...(Platform.OS === 'web' ? {
      height: '100%',
    } : {}),
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  infoBanner: {
    backgroundColor: theme.colors.background.primary,
    margin: theme.spacing.xl,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  infoTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  toggleRow: {
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  toggleCard: {
    width: '100%',
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  toggleCardSelected: {
    borderColor: theme.colors.primary.main,
    backgroundColor: `${theme.colors.primary.main}10`,
    ...theme.shadows.md,
  },
  toggleIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  toggleTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.base,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.sm,
  },
  stepperLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.base,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperValue: {
    width: 44,
    textAlign: 'center',
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  detailsCard: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  infoCard: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.base,
    gap: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoTextInline: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  summaryCard: {
    backgroundColor: theme.colors.background.tertiary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.base,
  },
  summaryTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.medium,
    marginVertical: theme.spacing.md,
  },
  summaryTotalLabel: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  summaryTotalValue: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.services.driver,
  },
  inclusionsList: {
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  inclusionText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.base,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    ...theme.shadows.lg,
  },
  footerPrice: {
    marginRight: theme.spacing.base,
  },
  footerPriceLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  footerPriceValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
});

export default DriverBookingScreen;
