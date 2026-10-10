import React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { ServiceCard, ServiceItemData } from '@/components/services/ServiceCard';
import { CARD_DIMENSIONS, SHADOWS } from '@/constants/spacing';

interface SelectedCardProps {
  card: ServiceItemData;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function SelectedCard({ card, style, onPress }: SelectedCardProps) {
  return (
    <Animated.View
      entering={ZoomIn.duration(350)}
      style={[styles.container, SHADOWS.cardSelected, style]}
    >
      <ServiceCard
        item={card}
        index={0}
        state="selected"
        isHero
        onPress={onPress}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CARD_DIMENSIONS.width,
    height: CARD_DIMENSIONS.height,
  },
});
