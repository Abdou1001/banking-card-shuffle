import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING } from '@/constants/spacing';
import { FONTS } from '@/constants/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // Default to right for Arabic RTL
  style,
  textStyle,
  accessibilityLabel,
}: AppButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getVariantStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          button: {
            backgroundColor: COLORS.primaryBlue,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'danger':
        return {
          button: {
            backgroundColor: COLORS.error,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
      case 'outline':
        return {
          button: {
            backgroundColor: '#FFFFFF',
            borderWidth: 1.5,
            borderColor: COLORS.primaryBlue,
          },
          text: {
            color: COLORS.primaryBlue,
          },
        };
      case 'ghost':
        return {
          button: {
            backgroundColor: '#FFFFFF',
            borderWidth: 0.5,
          },
          text: {
            color: COLORS.secondaryText,
          },
        };
      case 'primary':
      default:
        return {
          button: {
            backgroundColor: COLORS.primaryRed,
            borderWidth: 0,
          },
          text: {
            color: '#FFFFFF',
          },
        };
    }
  };

  const getSizeStyles = (): { button: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          button: {
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: RADIUS.md,
          },
          text: {
            fontSize: 14,
          },
        };
      case 'md':
        return {
          button: {
            paddingVertical: 14,
            paddingHorizontal: 22,
            borderRadius: RADIUS.lg,
          },
          text: {
            fontSize: 16,
          },
        };
      case 'lg':
      default:
        return {
          button: {
            paddingVertical: 16,
            paddingHorizontal: 28,
            borderRadius: RADIUS.lg,
            minHeight: 56,
          },
          text: {
            fontSize: 17,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: disabled || loading }}
      style={[
        styles.baseButton,
        variantStyles.button,
        sizeStyles.button,
        disabled && styles.disabledButton,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primaryBlue : '#FFFFFF'}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <>{icon}</>}
          <Text
            style={[
              styles.baseText,
              variantStyles.text,
              sizeStyles.text,
              disabled && styles.disabledText,
              icon ? (iconPosition === 'left' ? styles.textWithLeftIcon : styles.textWithRightIcon) : null,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && <>{icon}</>}
        </>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row-reverse', // RTL natural alignment
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  baseText: {
    fontFamily: FONTS.bold,
    textAlign: 'center',
    includeFontPadding: false,
    direction: 'ltr',
  },
  textWithRightIcon: {
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm,
  },
  textWithLeftIcon: {
    marginRight: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
    borderColor: '#CBD5E1',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabledText: {
    color: '#94A3B8',
  },
});
