import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { TimerProgress } from '@/components/timer/TimerProgress';
import { TimerDisplay } from '@/components/timer/TimerDisplay';
import { TimerActionButton } from '@/components/timer/TimerActionButton';
import { TimerControls } from '@/components/timer/TimerControls';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { useTimer } from '@/hooks/useTimer';
import { useServiceContext } from '@/context/ServiceContext';
import { services } from '@/data/services';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';

export default function TimerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ duration?: string; serviceId?: string }>();
  const {
    selectedService,
    selectedMainService,
    selectedSubService,
    resetAll,
    setElapsedTime,
  } = useServiceContext();

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  // Safe fallback if navigated directly
  const activeService = selectedService || selectedSubService || selectedMainService || services[0];
  const parsedDuration = params.duration ? parseInt(params.duration, 10) : undefined;
  const duration = (parsedDuration && !isNaN(parsedDuration)) ? parsedDuration : (activeService?.duration || 35);

  const {
    remaining,
    totalDuration,
    isPaused,
    progressAnim,
    togglePause,
    reset,
    finish,
  } = useTimer({
    duration,
    autoStart: true,
    onExpire: () => {
      // Timer reached 0 without confirmation
      router.replace('/timeout');
    },
  });

  const handleCompleteOperation = () => {
    const elapsedSeconds = Math.max(1, totalDuration - remaining);
    setElapsedTime(elapsedSeconds);
    finish();
    router.replace({
      pathname: '/success',
      params: { elapsed: String(elapsedSeconds) },
    });
  };

  const handleEndRequest = () => {
    setConfirmModalVisible(true);
  };

  const handleConfirmEnd = () => {
    setConfirmModalVisible(false);
    resetAll();
    router.replace('/services');
  };

  const handleCancelEnd = () => {
    setConfirmModalVisible(false);
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={handleEndRequest}
        showLogo
      />

      <View style={styles.container}>
        {/* Service Header Info */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.serviceHeader}
        >
          <View style={styles.serviceCategoryPill}>
            <Text style={styles.serviceCategoryText}>
              {activeService?.details?.category || 'بن دوّل باي'}
            </Text>
          </View>
          <Text style={styles.serviceTitle}>{activeService?.name}</Text>
          <Text style={styles.serviceDescription}>
            يرجى إتمام وتأكيد العملية قبل انتهاء الوقت المحدد
          </Text>
        </Animated.View>

        {/* Center Animated Progress Ring and Countdown */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.timerCenter}>
          <TimerProgress
            progressAnim={progressAnim}
            size={260}
            strokeWidth={14}
            remainingSeconds={remaining}
          >
            <TimerDisplay
              remainingSeconds={remaining}
              totalSeconds={totalDuration}
              isPaused={isPaused}
            />
          </TimerProgress>
        </Animated.View>

        {/* Bottom Actions */}
        <View style={styles.bottomSection}>
          {/* Primary Action Button: "تمت العملية" */}
          <TimerActionButton onComplete={handleCompleteOperation} />

          {/* Secondary Controls: "إعادة تعيين", "إيقاف", "إنهاء" */}
          <TimerControls
            isPaused={isPaused}
            onTogglePause={togglePause}
            onReset={reset}
            onEnd={handleEndRequest}
          />
        </View>
      </View>

      {/* Confirmation Modal when requesting to end */}
      <ConfirmModal
        visible={confirmModalVisible}
        title="إنهاء العملية"
        message="هل أنت متأكد من رغبتك في إلغاء العملية الحالية والعودة إلى قائمة الخدمات؟"
        confirmText="نعم، إنهاء"
        cancelText="إلغاء واستمرار"
        onConfirm={handleConfirmEnd}
        onCancel={handleCancelEnd}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  serviceHeader: {
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
  serviceCategoryPill: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginBottom: 6,
  },
  serviceCategoryText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primaryBlue,
  },
  serviceTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.text,
    textAlign: 'center',
  },
  serviceDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 280,
  },
  timerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
  },
});
