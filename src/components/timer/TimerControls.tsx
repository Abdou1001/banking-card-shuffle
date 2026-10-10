import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RotateCcw, Pause, Play, XCircle } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { RADIUS, SPACING } from '@/constants/spacing';

interface TimerControlsProps {
  isPaused: boolean;
  onTogglePause: () => void;
  onReset: () => void;
  onEnd: () => void;
  disabled?: boolean;
}

export function TimerControls({
  isPaused,
  onTogglePause,
  onReset,
  onEnd,
  disabled = false,
}: TimerControlsProps) {
  return (
    <View style={styles.container}>
      {/* 1. Pause / Resume */}
      <TouchableOpacity
        onPress={onTogglePause}
        disabled={disabled}
        style={[styles.controlButton, isPaused && styles.activePauseButton]}
        accessibilityRole="button"
        accessibilityLabel={isPaused ? 'استمرار' : 'إيقاف'}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          {isPaused ? (
            <Play size={20} color={COLORS.primaryBlue} />
          ) : (
            <Pause size={20} color={COLORS.primaryBlue} />
          )}
        </View>
        <Text style={styles.buttonLabel}>{isPaused ? 'استمرار' : 'إيقاف'}</Text>
      </TouchableOpacity>

      {/* 2. Reset */}
      <TouchableOpacity
        onPress={onReset}
        disabled={disabled}
        style={styles.controlButton}
        accessibilityRole="button"
        accessibilityLabel="إعادة تعيين"
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          <RotateCcw size={20} color={COLORS.secondaryText} />
        </View>
        <Text style={styles.buttonLabel}>إعادة تعيين</Text>
      </TouchableOpacity>

      {/* 3. End with confirmation */}
      <TouchableOpacity
        onPress={onEnd}
        disabled={disabled}
        style={[styles.controlButton, styles.endButton]}
        accessibilityRole="button"
        accessibilityLabel="إنهاء"
        activeOpacity={0.7}
      >
        <View style={styles.iconWrapper}>
          <XCircle size={20} color={COLORS.error} />
        </View>
        <Text style={[styles.buttonLabel, styles.endButtonLabel]}>إنهاء</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse', // RTL flow
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 86,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  activePauseButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  endButton: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF8F8',
  },
  iconWrapper: {
    marginBottom: 4,
  },
  buttonLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
  },
  endButtonLabel: {
    color: COLORS.error,
  },
});
