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
  const [currentStep, setCurrentStep] = useState<'type' | 'details' | 'confirm'>('type');
  // Hourly inputs
  const [hourlyStartDate, setHourlyStartDate] = useState('');
  const [hourlyStartTime, setHourlyStartTime] = useState('');
  const [hours, setHours] = useState<number>(2);
  // Outstation inputs
  const [outStartDate, setOutStartDate] = useState('');
  const [outEndDate, setOutEndDate] = useState('');
  const [outPickup, setOutPickup] = useState('');
  const [outDestination, setOutDestination] = useState('');

  const hourlyPricePerHour = 299;
  const outPricePerDay = 1799;
  const outDriverAllowance = 300;

  const days = useMemo(() => {
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
  const isValid = bookingType === 'hourly' ? hourlyValid : outstationValid;

  const handleNext = () => {
    if (currentStep === 'type') {
      setCurrentStep('details');
    } else if (currentStep === 'details' && isValid) {
      setCurrentStep('confirm');
    }
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('type');
    } else if (currentStep === 'confirm') {
      setCurrentStep('details');
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Driver</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* STEP 1: Booking Type Selection */}
        {currentStep === 'type' && (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Choose Booking Type</Text>
              <Text style={styles.stepSubtitle}>Select how you want to book a driver</Text>
            </View>

            <View style={styles.bookingTypeContainer}>
              <TouchableOpacity
                style={[styles.typeCard, bookingType === 'hourly' && styles.typeCardSelected]}
                onPress={() => setBookingType('hourly')}
                activeOpacity={0.85}
              >
                <View style={[styles.typeIcon, bookingType === 'hourly' && styles.typeIconSelected]}>
                  <Ionicons name="time" size={32} color={bookingType === 'hourly' ? '#FFF' : theme.colors.primary.main} />
                </View>
                <Text style={[styles.typeTitle, bookingType === 'hourly' && styles.typeTitleSelected]}>
                  Hourly Rental
                </Text>
                <Text style={styles.typeDescription}>Flexible hours for city travel</Text>
                {bookingType === 'hourly' && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeCard, bookingType === 'outstation' && styles.typeCardSelected]}
                onPress={() => setBookingType('outstation')}
                activeOpacity={0.85}
              >
                <View style={[styles.typeIcon, bookingType === 'outstation' && styles.typeIconSelected]}>
                  <Ionicons name="map" size={32} color={bookingType === 'outstation' ? '#FFF' : theme.colors.primary.main} />
                </View>
                <Text style={[styles.typeTitle, bookingType === 'outstation' && styles.typeTitleSelected]}>
                  Outstation
                </Text>
                <Text style={styles.typeDescription}>Multi-day trips & long journeys</Text>
                {bookingType === 'outstation' && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Why Book a Driver?</Text>
              <BenefitItem icon="shield-checkmark" text="Verified & experienced drivers" />
              <BenefitItem icon="location" text="Real-time tracking" />
              <BenefitItem icon="call" text="24/7 support" />
              <BenefitItem icon="star" text="Flexible cancellation" />
            </View>
          </View>
        )}

        {/* STEP 2: Booking Details */}
        {currentStep === 'details' && (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>
                {bookingType === 'hourly' ? 'Hourly Rental Details' : 'Outstation Trip Details'}
              </Text>
              <Text style={styles.stepSubtitle}>
                {bookingType === 'hourly' ? 'Let us know when you need the driver' : 'Provide your trip details'}
              </Text>
            </View>

            <View style={styles.formContainer}>
              {bookingType === 'hourly' ? (
                <>
                  <FormGroup label="Start Date" required>
                    <Input
                      placeholder="Select date (YYYY-MM-DD)"
                      value={hourlyStartDate}
                      onChangeText={setHourlyStartDate}
                      leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <FormGroup label="Start Time" required>
                    <Input
                      placeholder="Enter time (HH:MM)"
                      value={hourlyStartTime}
                      onChangeText={setHourlyStartTime}
                      leftIcon={<Ionicons name="time-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <FormGroup label="Duration (Hours)" required>
                    <View style={styles.stepperContainer}>
                      <Text style={styles.stepperLabel}>Select hours (2-12 hours)</Text>
                      <View style={styles.stepper}>
                        <TouchableOpacity
                          style={styles.stepperBtn}
                          onPress={() => setHours(Math.max(2, hours - 1))}
                        >
                          <Ionicons name="remove" size={20} color={theme.colors.primary.main} />
                        </TouchableOpacity>
                        <Text style={styles.stepperDisplay}>{hours}h</Text>
                        <TouchableOpacity
                          style={styles.stepperBtn}
                          onPress={() => setHours(Math.min(12, hours + 1))}
                        >
                          <Ionicons name="add" size={20} color={theme.colors.primary.main} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </FormGroup>

                  <PriceCard
                    label="Hourly Rate"
                    price={hourlyPricePerHour}
                    quantity={`${hours} hours`}
                    total={hourlyTotal}
                    features={['Fuel included', 'Professional driver', 'Multiple stops']}
                  />
                </>
              ) : (
                <>
                  <FormGroup label="Start Date" required>
                    <Input
                      placeholder="Select start date"
                      value={outStartDate}
                      onChangeText={setOutStartDate}
                      leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <FormGroup label="End Date" required>
                    <Input
                      placeholder="Select end date"
                      value={outEndDate}
                      onChangeText={setOutEndDate}
                      leftIcon={<Ionicons name="calendar-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <FormGroup label="Pickup Location" required>
                    <Input
                      placeholder="Enter pickup address"
                      value={outPickup}
                      onChangeText={setOutPickup}
                      leftIcon={<Ionicons name="location-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <FormGroup label="Destination" required>
                    <Input
                      placeholder="Enter destination city"
                      value={outDestination}
                      onChangeText={setOutDestination}
                      leftIcon={<Ionicons name="navigate-outline" size={20} color={theme.colors.primary.main} />}
                    />
                  </FormGroup>

                  <PriceCard
                    label="Per Day Rate"
                    price={outPricePerDay}
                    quantity={`${days} days`}
                    total={outstationTotal}
                    features={[`Fuel included`, `₹${outDriverAllowance}/day`, 'Full coverage']}
                  />
                </>
              )}
            </View>
          </View>
        )}

        {/* STEP 3: Confirmation */}
        {currentStep === 'confirm' && (
          <View style={styles.stepContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color={theme.colors.success} />
            </View>

            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Ready to Book?</Text>
              <Text style={styles.stepSubtitle}>Review your booking details below</Text>
            </View>

            <ConfirmationCard
              bookingType={bookingType}
              details={{
                hourly: {
                  startDate: hourlyStartDate,
                  startTime: hourlyStartTime,
                  hours,
                  total: hourlyTotal,
                },
                outstation: {
                  startDate: outStartDate,
                  endDate: outEndDate,
                  days,
                  pickup: outPickup,
                  destination: outDestination,
                  total: outstationTotal,
                },
              }}
            />

            <View style={styles.confirmInfo}>
              <Ionicons name="information-circle" size={20} color={theme.colors.info} />
              <Text style={styles.confirmInfoText}>
                Our driver will contact you 30 minutes before arrival
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Footer CTA */}
      <View style={styles.footer}>
        {currentStep === 'type' && (
          <Button
            title="Continue"
            onPress={handleNext}
            fullWidth
            gradient
            size="lg"
          />
        )}
        {currentStep === 'details' && (
          <View style={styles.footerButtonGroup}>
            <View style={styles.priceDisplay}>
              <Text style={styles.priceLabel}>Total</Text>
              <Text style={styles.priceValue}>
                ₹{bookingType === 'hourly' ? hourlyTotal : outstationTotal}
              </Text>
            </View>
            <Button
              title="Next"
              onPress={handleNext}
              disabled={!isValid}
              gradient
              size="lg"
            />
          </View>
        )}
        {currentStep === 'confirm' && (
          <Button
            title="Confirm & Book Driver"
            onPress={() => { }}
            fullWidth
            gradient
            size="lg"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// ============ HELPER COMPONENTS ============

interface FormGroupProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, required, children }) => (
  <View style={styles.formGroup}>
    <Text style={styles.formLabel}>
      {label}
      {required && <Text style={styles.requiredAsterisk}> *</Text>}
    </Text>
    {children}
  </View>
);

interface BenefitItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, text }) => (
  <View style={styles.benefitItem}>
    <View style={styles.benefitIcon}>
      <Ionicons name={icon} size={20} color={theme.colors.primary.main} />
    </View>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

interface PriceCardProps {
  label: string;
  price: number;
  quantity: string;
  total: number;
  features: string[];
}

const PriceCard: React.FC<PriceCardProps> = ({ label, price, quantity, total, features }) => (
  <View style={styles.priceCard}>
    <View style={styles.priceCardHeader}>
      <Text style={styles.priceCardLabel}>{label}</Text>
      <Text style={styles.priceCardAmount}>₹{price}/unit</Text>
    </View>
    <View style={styles.priceCardDivider} />
    <View style={styles.priceBreakdown}>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>{label}</Text>
        <Text style={styles.breakdownValue}>₹{price}</Text>
      </View>
      <View style={styles.breakdownRow}>
        <Text style={styles.breakdownLabel}>Quantity</Text>
        <Text style={styles.breakdownValue}>{quantity}</Text>
      </View>
    </View>
    <View style={styles.featuresContainer}>
      {features.map((feature, idx) => (
        <View key={idx} style={styles.featureItem}>
          <Ionicons name="checkmark-done" size={16} color={theme.colors.success} />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
    <View style={styles.priceCardDivider} />
    <View style={styles.priceCardTotal}>
      <Text style={styles.totalLabel}>Total Amount</Text>
      <Text style={styles.totalAmount}>₹{total}</Text>
    </View>
  </View>
);

interface ConfirmationCardProps {
  bookingType: BookingType;
  details: any;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ bookingType, details }) => (
  <View style={styles.confirmationCard}>
    <View style={styles.confirmationHeader}>
      <Text style={styles.confirmationTitle}>
        {bookingType === 'hourly' ? 'Hourly Booking' : 'Outstation Booking'}
      </Text>
      <View style={styles.confirmationBadge}>
        <Text style={styles.confirmationBadgeText}>{bookingType === 'hourly' ? 'HOURLY' : 'OUTSTATION'}</Text>
      </View>
    </View>

    {bookingType === 'hourly' ? (
      <>
        <ConfirmationRow icon="calendar-outline" label="Date" value={details.hourly.startDate} />
        <ConfirmationRow icon="time-outline" label="Time" value={details.hourly.startTime} />
        <ConfirmationRow icon="hourglass-outline" label="Duration" value={`${details.hourly.hours} hours`} />
        <View style={styles.confirmationDivider} />
        <View style={styles.confirmationTotal}>
          <Text style={styles.confirmationTotalLabel}>Total Cost</Text>
          <Text style={styles.confirmationTotalValue}>₹{details.hourly.total}</Text>
        </View>
      </>
    ) : (
      <>
        <ConfirmationRow icon="calendar-outline" label="From" value={details.outstation.startDate} />
        <ConfirmationRow icon="calendar-outline" label="To" value={details.outstation.endDate} />
        <ConfirmationRow icon="location-outline" label="Pickup" value={details.outstation.pickup} />
        <ConfirmationRow icon="navigate-outline" label="Destination" value={details.outstation.destination} />
        <ConfirmationRow icon="calendar" label="Days" value={`${details.outstation.days} days`} />
        <View style={styles.confirmationDivider} />
        <View style={styles.confirmationTotal}>
          <Text style={styles.confirmationTotalLabel}>Total Cost</Text>
          <Text style={styles.confirmationTotalValue}>₹{details.outstation.total}</Text>
        </View>
      </>
    )}
  </View>
);

interface ConfirmationRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

const ConfirmationRow: React.FC<ConfirmationRowProps> = ({ icon, label, value }) => (
  <View style={styles.confirmationRow}>
    <View style={styles.confirmationRowLeft}>
      <Ionicons name={icon} size={20} color={theme.colors.primary.main} />
      <Text style={styles.confirmationRowLabel}>{label}</Text>
    </View>
    <Text style={styles.confirmationRowValue}>{value}</Text>
  </View>
);

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
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginLeft: -theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
  },

  // SCROLL VIEW
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.lg,
  },

  // STEP CONTAINER
  stepContainer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.lg,
  },
  stepHeader: {
    marginBottom: theme.spacing.lg,
  },
  stepTitle: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  stepSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },

  // BOOKING TYPE SELECTOR
  bookingTypeContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  typeCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  typeCardSelected: {
    borderColor: theme.colors.primary.main,
    backgroundColor: `${theme.colors.primary.main}12`,
    ...theme.shadows.md,
  },
  typeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  typeIconSelected: {
    backgroundColor: theme.colors.primary.main,
  },
  typeTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  typeTitleSelected: {
    color: theme.colors.primary.main,
  },
  typeDescription: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  selectedBadge: {
    position: 'absolute',
    top: theme.spacing.base,
    right: theme.spacing.base,
  },

  // BENEFITS
  benefitsContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  benefitsTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${theme.colors.primary.main}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
    flex: 1,
  },

  // FORM
  formContainer: {
    gap: theme.spacing.lg,
  },
  formGroup: {
    gap: theme.spacing.sm,
  },
  formLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  requiredAsterisk: {
    color: theme.colors.error,
  },

  // STEPPER
  stepperContainer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
  },
  stepperLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.background.primary,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperDisplay: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.primary,
    minWidth: 50,
    textAlign: 'center',
  },

  // PRICE CARD
  priceCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    borderWidth: 1,
    borderColor: theme.colors.primary.main,
    marginTop: theme.spacing.sm,
  },
  priceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  priceCardLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  priceCardAmount: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },
  priceCardDivider: {
    height: 1,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.md,
  },
  priceBreakdown: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  breakdownValue: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  featuresContainer: {
    backgroundColor: `${theme.colors.success}08`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  priceCardTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  totalAmount: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },

  // SUCCESS ICON
  successIcon: {
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },

  // CONFIRMATION CARD
  confirmationCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  confirmationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.base,
    paddingBottom: theme.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  confirmationTitle: {
    fontSize: theme.fontSizes.base,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  confirmationBadge: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  confirmationBadgeText: {
    fontSize: theme.fontSizes.xs,
    color: '#FFF',
    fontWeight: theme.fontWeights.bold,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  confirmationRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  confirmationRowLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
  },
  confirmationRowValue: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.text.primary,
  },
  confirmationDivider: {
    height: 2,
    backgroundColor: theme.colors.border.light,
    marginVertical: theme.spacing.md,
  },
  confirmationTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  confirmationTotalLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeights.semiBold,
  },
  confirmationTotalValue: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },

  // CONFIRMATION INFO
  confirmInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.base,
    backgroundColor: `${theme.colors.info}12`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.base,
    marginBottom: theme.spacing.lg,
  },
  confirmInfoText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    flex: 1,
  },

  // FOOTER
  footer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.base,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    ...theme.shadows.lg,
  },
  footerButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  priceDisplay: {
    minWidth: 80,
  },
  priceLabel: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  priceValue: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary.main,
  },

  // INCLUSION ITEM
  inclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  inclusionText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.primary,
    flex: 1,
  },

  // BOTTOM PADDING
  bottomPadding: {
    height: theme.spacing.xl,
  },
});

export default DriverBookingScreen;
