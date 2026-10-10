import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Sparkles, Play } from 'lucide-react-native';
import { AppButton } from '@/components/common/AppButton';

interface ShuffleButtonProps {
  onPress: () => void;
  isShuffling: boolean;
  disabled?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export function ShuffleButton({
  onPress,
  isShuffling,
  disabled = false,
  title = 'ابدأ',
  style,
}: ShuffleButtonProps) {
  return (
    <AppButton
      title={isShuffling ? 'جاري خلط البطاقات...' : title}
      onPress={onPress}
      disabled={disabled || isShuffling}
      loading={isShuffling}
      variant="primary"
      size="lg"
      icon={isShuffling ? undefined : <Sparkles size={20} color="#FFFFFF" />}
      iconPosition="right"
      style={[styles.button, style]}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 280,
  },
});
