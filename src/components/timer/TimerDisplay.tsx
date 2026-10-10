import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { formatTime } from '@/utils/format';

interface TimerDisplayProps {
  remainingSeconds: number;
  totalSeconds: number;
  isPaused?: boolean;
}

export function TimerDisplay({
  remainingSeconds,
  totalSeconds,
  isPaused = false,
}: TimerDisplayProps) {
  const formatted = formatTime(remainingSeconds);
  const isLowTime = remainingSeconds <= 5 && remainingSeconds > 0;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.timeText,
          isLowTime && styles.lowTimeText,
          isPaused && styles.pausedText,
        ]}
      >
        {formatted}
      </Text>
      <Text style={styles.label}>
        {isPaused ? 'المؤقت متوقف مؤقتاً' : 'الوقت المتبقي'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTS.black,
    fontSize: 52,
    color: COLORS.primaryBlue,
    textAlign: 'center',
    letterSpacing: 2,
  },
  lowTimeText: {
    color: COLORS.primaryRed,
  },
  pausedText: {
    color: COLORS.secondaryText,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 4,
    textAlign: 'center',
  },
});
