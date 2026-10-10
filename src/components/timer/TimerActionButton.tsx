import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { AppButton } from '@/components/common/AppButton';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';

interface TimerActionButtonProps {
  onComplete: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function TimerActionButton({
  onComplete,
  disabled = false,
  style,
}: TimerActionButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <AppButton
        title="تمت العملية"
        variant="primary"
        size="lg"
        onPress={onComplete}
        disabled={disabled}
        icon={<CheckCircle2 size={24} color="#FFFFFF" />}
        iconPosition="left"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  button: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.primaryRed,
    minHeight: 58,
    shadowColor: COLORS.primaryRed,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
});
