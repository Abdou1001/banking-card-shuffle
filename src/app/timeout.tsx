import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { ZoomIn, FadeInUp } from 'react-native-reanimated';
import { AlertCircle, RotateCcw, Home } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppButton } from '@/components/common/AppButton';
import { useServiceContext } from '@/context/ServiceContext';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';
import { formatDurationArabic } from '@/utils/format';

export default function TimeoutScreen() {
  const router = useRouter();
  const {
    selectedMainService,
    selectedSubService,
    resetAll,
  } = useServiceContext();

  const handleRetry = () => {
    // Restart the same selected sub-service with the same duration
    router.replace('/timer');
  };

  const handleReturnToStart = () => {
    // Navigate to the main service selection screen
    resetAll();
    router.replace('/services');
  };

  return (
    <ScreenContainer backgroundColor={COLORS.background}>
      <AppHeader
        showBack={false}
        showLogo
      />

      <View style={styles.container}>
        {/* Timeout Indicator & Texts */}
        <View style={styles.centerContent}>
          <Animated.View
            entering={ZoomIn.duration(450).springify().damping(12)}
            style={styles.iconCircle}
          >
            <AlertCircle size={64} color="#FFFFFF" strokeWidth={2.4} />
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.textGroup}>
            <Text style={styles.timeoutTitle}>انتهى الوقت</Text>
            <Text style={styles.timeoutSubtitle}>
              لم يتم تأكيد إتمام العملية خلال المهلة الزمنية المحددة
            </Text>
          </Animated.View>

          {/* Service Details Card */}
          {selectedSubService && (
            <Animated.View
              entering={FadeInUp.duration(400).delay(350)}
              style={styles.detailsCard}
            >
              <Text style={styles.cardHeader}>العملية غير المكتملة</Text>
              <Text style={styles.subServiceName}>{selectedSubService.name}</Text>
              <Text style={styles.durationNote}>
                المهلة كانت: {formatDurationArabic(selectedSubService.duration)}
              </Text>
            </Animated.View>
          )}
        </View>

        {/* Action Buttons: "إعادة المحاولة" & "العودة للبداية" */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(450)}
          style={styles.actions}
        >
          <AppButton
            title="إعادة المحاولة"
            variant="primary"
            size="lg"
            onPress={handleRetry}
            icon={<RotateCcw size={20} color="#FFFFFF" />}
            iconPosition="left"
            style={styles.retryButton}
          />

          <AppButton
            title="العودة للبداية"
            variant="outline"
            size="lg"
            onPress={handleReturnToStart}
            icon={<Home size={18} color={COLORS.primaryBlue} />}
            iconPosition="left"
            style={styles.homeButton}
          />
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: SPACING.lg,
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  timeoutTitle: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  timeoutSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 22,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
  },
  cardHeader: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  subServiceName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.error,
    textAlign: 'center',
  },
  durationNote: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
  actions: {
    width: '100%',
    gap: SPACING.sm,
    alignItems: 'center',
  },
  retryButton: {
    width: '100%',
    maxWidth: 300,
  },
  homeButton: {
    width: '100%',
    maxWidth: 300,
  },
});
