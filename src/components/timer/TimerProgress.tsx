import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  SharedValue,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface TimerProgressProps {
  progressAnim: SharedValue<number>; // 1 down to 0
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  remainingSeconds: number;
}

export function TimerProgress({
  progressAnim,
  size = 250,
  strokeWidth = 14,
  children,
  remainingSeconds,
}: TimerProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const animatedProps = useAnimatedProps(() => {
    // Progress is 1 (full) down to 0 (empty)
    const strokeDashoffset = circumference * (1 - progressAnim.value);
    return {
      strokeDashoffset,
    };
  });

  const isLowTime = remainingSeconds <= 5 && remainingSeconds > 0;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="timerGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.primaryBlue} />
            <Stop offset="100%" stopColor="#4338CA" />
          </LinearGradient>
          <LinearGradient id="timerGradAlert" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.primaryRed} />
            <Stop offset="100%" stopColor="#E11D48" />
          </LinearGradient>
        </Defs>

        {/* Background track circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Dynamic progress circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={isLowTime ? 'url(#timerGradAlert)' : 'url(#timerGradPrimary)'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          fill="none"
          // Rotate -90deg so progress starts at 12 o'clock
          originX={center}
          originY={center}
          rotation="-90"
        />
      </Svg>

      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 15,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
