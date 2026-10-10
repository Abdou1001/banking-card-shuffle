import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { ZoomIn, FadeInUp } from 'react-native-reanimated';
import { CheckCircle2, RotateCcw, Home } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppButton } from '@/components/common/AppButton';
import { useServiceContext } from '@/context/ServiceContext';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';
import { formatDurationArabic } from '@/utils/format';

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ elapsed?: string }>();
  const {
    selectedMainService,
    selectedSubService,
    resetAll,
    elapsedTime,
  } = useServiceContext();

  const rawElapsed = params.elapsed !== undefined ? Number(params.elapsed) : elapsedTime;
  const elapsed = typeof rawElapsed === 'number' && !isNaN(rawElapsed) ? rawElapsed : null;

  const handleNewOperation = () => {
    resetAll();
    router.replace('/services');
  };

  const handleReturnHome = () => {
    resetAll();
    router.replace('/');
  };

  return (
    <ScreenContainer backgroundColor={COLORS.background}>
      <AppHeader
        showBack={false}
        showLogo
      />

      <View style={styles.container}>
        {/* Animated Checkmark and Success Heading */}
        <View style={styles.centerContent}>
          <Animated.View
            entering={ZoomIn.duration(500).springify().damping(12)}
            style={styles.iconCircle}
          >
            <CheckCircle2 size={68} color="#FFFFFF" strokeWidth={2.4} />
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(400).delay(200)} style={styles.textGroup}>
            <Text style={styles.successTitle}>تمت العملية بنجاح</Text>
            <Text style={styles.successSubtitle}>
              تم تأكيد وإتمام العملية المصرفية في الوقت المحدد
            </Text>
          </Animated.View>

          {/* Operation Summary Card */}
          {selectedSubService && (
            <Animated.View
              entering={FadeInUp.duration(400).delay(350)}
              style={styles.summaryCard}
            >

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>العملية المنفذة:</Text>
                <Text style={[styles.summaryValue, styles.highlightValue]}>
                  {selectedSubService.name}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>زمن العملية:</Text>
                <Text style={styles.summaryValue}>
                  {formatDurationArabic(selectedSubService.duration)}
                </Text>
              </View>

              {elapsed !== null && (
                <>
                  <View style={styles.divider} />

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>الوقت المستغرق:</Text>
                    <Text style={[styles.summaryValue, styles.elapsedValue]}>
                      {formatDurationArabic(elapsed)}
                    </Text>
                  </View>
                </>
              )}
            </Animated.View>
          )}
        </View>

        {/* Bottom Actions */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(450)}
          style={styles.actions}
        >
          <AppButton
            title="عملية جديدة"
            variant="primary"
            size="lg"
            onPress={handleNewOperation}
            icon={<RotateCcw size={20} color="#FFFFFF" />}
            iconPosition="right"
            style={styles.newOpButton}
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
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: SPACING.lg,
  },
  textGroup: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  successSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 22,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  summaryValue: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.text,
  },
  highlightValue: {
    color: COLORS.primaryBlue,
  },
  elapsedValue: {
    color: COLORS.success,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  actions: {
    width: '100%',
    gap: SPACING.sm,
    alignItems: 'center',
  },
  newOpButton: {
    width: '100%',
    maxWidth: 300,
  },
  homeButton: {
    width: '100%',
    maxWidth: 300,
  },
});
