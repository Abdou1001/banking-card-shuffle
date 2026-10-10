import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Service } from '@/types/service';
import { ServiceCardFront } from './ServiceCardFront';
import { ServiceCardBack } from './ServiceCardBack';
import { CARD_DIMENSIONS, RADIUS, SHADOWS } from '@/constants/spacing';
import { COLORS } from '@/constants/colors';

export type CardState = 'normal' | 'selected' | 'shuffling' | 'disabled' | 'preview';
export type ServiceCardData = Service;
export type ServiceItemData = Service;

export interface ServiceCardProps {
  card?: Service;
  item?: Service;
  index?: number;
  totalCards?: number;
  state?: CardState;
  isBack?: boolean;
  onPress?: () => void;
  // Reanimated shared values
  animatedTranslateX?: SharedValue<number>;
  animatedTranslateY?: SharedValue<number>;
  animatedRotateZ?: SharedValue<number>;
  animatedScale?: SharedValue<number>;
  animatedOpacity?: SharedValue<number>;
  animatedZIndex?: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
  isHero?: boolean;
  compact?: boolean;
}

export function ServiceCard({
  card,
  item,
  index = 0,
  totalCards = 10,
  state = 'normal',
  isBack = false,
  onPress,
  animatedTranslateX,
  animatedTranslateY,
  animatedRotateZ,
  animatedScale,
  animatedOpacity,
  animatedZIndex,
  style,
  isHero = false,
  compact = false,
}: ServiceCardProps) {
  const currentService = card || item;
  const isSelected = state === 'selected' || isHero;
  const isShuffling = state === 'shuffling';
  const isDisabled = state === 'disabled';
  const showBack = isBack || isShuffling;

  const cardWidth = compact ? CARD_DIMENSIONS.miniWidth : CARD_DIMENSIONS.width;
  const cardHeight = compact ? CARD_DIMENSIONS.miniHeight : CARD_DIMENSIONS.height;

  const hasAnimation = Boolean(
    animatedTranslateX ||
    animatedTranslateY ||
    animatedRotateZ ||
    animatedScale ||
    animatedOpacity ||
    animatedZIndex
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (!hasAnimation) {
      return {};
    }

    const tx = animatedTranslateX ? animatedTranslateX.value : 0;
    const ty = animatedTranslateY ? animatedTranslateY.value : 0;
    const rz = animatedRotateZ ? animatedRotateZ.value : 0;
    const sc = animatedScale ? animatedScale.value : 1;
    const op = animatedOpacity ? animatedOpacity.value : isDisabled ? 0.45 : 1;
    const zi = animatedZIndex ? animatedZIndex.value : isSelected ? 99 : totalCards - index;

    const safeTx = Number.isFinite(tx) ? tx : 0;
    const safeTy = Number.isFinite(ty) ? ty : 0;
    const safeRz = Number.isFinite(rz) ? rz : 0;
    const safeSc = Number.isFinite(sc) ? sc : 1;
    const safeOp = Number.isFinite(op) ? Math.max(0, Math.min(1, op)) : 1;
    const safeZi = Number.isFinite(zi) ? Math.round(zi) : totalCards - index;

    return {
      transform: [
        { translateX: safeTx },
        { translateY: safeTy },
        { rotate: `${safeRz}deg` },
        { scale: safeSc },
      ],
      opacity: safeOp,
      zIndex: safeZi,
    };
  });

  if (!currentService) {
    return null;
  }

  const content = showBack ? (
    <ServiceCardBack compact={compact} />
  ) : (
    <View
      style={[
        styles.frontWrapper,
        isSelected && styles.selectedFront,
      ]}
    >
      <ServiceCardFront
        service={currentService}
        compact={compact}
        showDuration
      />
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        { width: cardWidth, height: cardHeight },
        isSelected ? SHADOWS.cardSelected : SHADOWS.card,
        animatedStyle,
        style,
      ]}
    >
      {onPress && !isShuffling && !isDisabled ? (
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onPress}
          style={styles.touchable}
        >
          {content}
        </TouchableOpacity>
      ) : (
        content
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.card,
    backgroundColor: '#FFFFFF',
  },
  touchable: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.card,
  },
  frontWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.card,
  },
  selectedFront: {
    borderWidth: 2,
    borderColor: COLORS.primaryBlue,
    borderRadius: RADIUS.card,
  },
});
