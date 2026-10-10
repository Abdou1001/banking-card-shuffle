import { useState, useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export interface CardAnimatedValues {
  translateX: ReturnType<typeof useSharedValue<number>>;
  translateY: ReturnType<typeof useSharedValue<number>>;
  rotateZ: ReturnType<typeof useSharedValue<number>>;
  scale: ReturnType<typeof useSharedValue<number>>;
  opacity: ReturnType<typeof useSharedValue<number>>;
  zIndex: ReturnType<typeof useSharedValue<number>>;
}

export interface UseCardShuffleOptions<T> {
  items: T[];
  onSelect?: (item: T, index: number) => void;
}

export interface UseCardShuffleReturn<T> {
  isShuffling: boolean;
  isCompleted: boolean;
  selectedCard: T | null;
  selectedIndex: number | null;
  startShuffle: () => void;
  resetShuffle: () => void;
  cardValues: CardAnimatedValues[];
}

export function useCardShuffle<T>({
  items,
  onSelect,
}: UseCardShuffleOptions<T>): UseCardShuffleReturn<T> {
  const [isShuffling, setIsShuffling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<T | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Pre-allocate shared values for up to MAX_SUPPORTED_CARDS
  // This complies with React Hook rules (fixed count of hooks)
  const c0_x = useSharedValue(0);
  const c0_y = useSharedValue(0);
  const c0_r = useSharedValue(0);
  const c0_s = useSharedValue(1);
  const c0_o = useSharedValue(1);
  const c0_z = useSharedValue(1);

  const c1_x = useSharedValue(0);
  const c1_y = useSharedValue(0);
  const c1_r = useSharedValue(0);
  const c1_s = useSharedValue(1);
  const c1_o = useSharedValue(1);
  const c1_z = useSharedValue(2);

  const c2_x = useSharedValue(0);
  const c2_y = useSharedValue(0);
  const c2_r = useSharedValue(0);
  const c2_s = useSharedValue(1);
  const c2_o = useSharedValue(1);
  const c2_z = useSharedValue(3);

  const c3_x = useSharedValue(0);
  const c3_y = useSharedValue(0);
  const c3_r = useSharedValue(0);
  const c3_s = useSharedValue(1);
  const c3_o = useSharedValue(1);
  const c3_z = useSharedValue(4);

  const c4_x = useSharedValue(0);
  const c4_y = useSharedValue(0);
  const c4_r = useSharedValue(0);
  const c4_s = useSharedValue(1);
  const c4_o = useSharedValue(1);
  const c4_z = useSharedValue(5);

  const c5_x = useSharedValue(0);
  const c5_y = useSharedValue(0);
  const c5_r = useSharedValue(0);
  const c5_s = useSharedValue(1);
  const c5_o = useSharedValue(1);
  const c5_z = useSharedValue(6);

  const c6_x = useSharedValue(0);
  const c6_y = useSharedValue(0);
  const c6_r = useSharedValue(0);
  const c6_s = useSharedValue(1);
  const c6_o = useSharedValue(1);
  const c6_z = useSharedValue(7);

  const c7_x = useSharedValue(0);
  const c7_y = useSharedValue(0);
  const c7_r = useSharedValue(0);
  const c7_s = useSharedValue(1);
  const c7_o = useSharedValue(1);
  const c7_z = useSharedValue(8);

  const allCardValues: CardAnimatedValues[] = [
    { translateX: c0_x, translateY: c0_y, rotateZ: c0_r, scale: c0_s, opacity: c0_o, zIndex: c0_z },
    { translateX: c1_x, translateY: c1_y, rotateZ: c1_r, scale: c1_s, opacity: c1_o, zIndex: c1_z },
    { translateX: c2_x, translateY: c2_y, rotateZ: c2_r, scale: c2_s, opacity: c2_o, zIndex: c2_z },
    { translateX: c3_x, translateY: c3_y, rotateZ: c3_r, scale: c3_s, opacity: c3_o, zIndex: c3_z },
    { translateX: c4_x, translateY: c4_y, rotateZ: c4_r, scale: c4_s, opacity: c4_o, zIndex: c4_z },
    { translateX: c5_x, translateY: c5_y, rotateZ: c5_r, scale: c5_s, opacity: c5_o, zIndex: c5_z },
    { translateX: c6_x, translateY: c6_y, rotateZ: c6_r, scale: c6_s, opacity: c6_o, zIndex: c6_z },
    { translateX: c7_x, translateY: c7_y, rotateZ: c7_r, scale: c7_s, opacity: c7_o, zIndex: c7_z },
  ];

  const totalCards = items.length;
  const cardValues = allCardValues.slice(0, totalCards);

  // Initialize initial fanned deck positions
  const initPositions = useCallback(() => {
    const N = totalCards;
    for (let i = 0; i < N; i++) {
      const val = cardValues[i];
      if (!val) continue;
      const offsetFromCenter = i - (N - 1) / 2;
      val.translateX.value = offsetFromCenter * 14;
      val.translateY.value = Math.abs(offsetFromCenter) * 4;
      val.rotateZ.value = offsetFromCenter * 3;
      val.scale.value = 1;
      val.opacity.value = 1;
      val.zIndex.value = i + 1;
    }
  }, [totalCards, cardValues]);

  // On shuffle finish callback
  const handleShuffleFinished = useCallback(
    (pickedIndex: number) => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (_) {}

      setIsShuffling(false);
      setIsCompleted(true);
      const picked = items[pickedIndex];
      setSelectedCard(picked);
      setSelectedIndex(pickedIndex);
      if (onSelect && picked) {
        onSelect(picked, pickedIndex);
      }
    },
    [items, onSelect]
  );

  const startShuffle = useCallback(() => {
    if (isShuffling || totalCards === 0) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (_) {}

    setIsShuffling(true);
    setIsCompleted(false);
    setSelectedCard(null);
    setSelectedIndex(null);

    // 1. Pick target card index deterministically for this shuffle run
    const targetIdx = Math.floor(Math.random() * totalCards);

    // Durations for each phase (total ~ 2.6 seconds)
    const T_SPLIT = 380;       // Phase 1: Fast Split / Cut
    const T_RIFFLE_1 = 320;    // Phase 2: Rapid Interweave Left-Right
    const T_RIFFLE_2 = 280;    // Phase 3: Rapid Interweave Reverse
    const T_WASH = 360;        // Phase 4: Medium gather swirl
    const T_GATHER = 420;      // Phase 5: Deceleration deck assemble
    const T_HERO = 560;        // Phase 6: Hero emergence & settle

    const easeInOut = Easing.inOut(Easing.cubic);
    const easeOut = Easing.out(Easing.quad);

    for (let i = 0; i < totalCards; i++) {
      const cv = cardValues[i];
      const isTarget = i === targetIdx;
      const isEven = i % 2 === 0;
      const dir = isEven ? -1 : 1;
      const depthOffset = (i - (totalCards - 1) / 2);

      // --- TRANSLATE X ---
      const splitX = dir * (85 + i * 12);
      const weaveX1 = -dir * (65 + (i % 3) * 15);
      const weaveX2 = dir * (45 + (i % 2) * 20);
      const washX = depthOffset * 18;
      const heroX = isTarget ? 0 : depthOffset * 24;

      cv.translateX.value = withSequence(
        withTiming(splitX, { duration: T_SPLIT, easing: easeOut }),
        withTiming(weaveX1, { duration: T_RIFFLE_1, easing: easeInOut }),
        withTiming(weaveX2, { duration: T_RIFFLE_2, easing: easeInOut }),
        withTiming(washX, { duration: T_WASH, easing: easeInOut }),
        withTiming(0, { duration: T_GATHER, easing: easeOut }),
        withTiming(heroX, { duration: T_HERO, easing: easeOut })
      );

      // --- TRANSLATE Y ---
      const splitY = isEven ? -18 : 18;
      const weaveY1 = isEven ? 16 : -16;
      const weaveY2 = (i % 3 === 0) ? -12 : 12;
      const heroY = isTarget ? -24 : 45;

      cv.translateY.value = withSequence(
        withTiming(splitY, { duration: T_SPLIT, easing: easeOut }),
        withTiming(weaveY1, { duration: T_RIFFLE_1, easing: easeInOut }),
        withTiming(weaveY2, { duration: T_RIFFLE_2, easing: easeInOut }),
        withTiming(0, { duration: T_WASH + T_GATHER, easing: easeOut }),
        withTiming(heroY, { duration: T_HERO, easing: easeOut })
      );

      // --- ROTATE Z ---
      const splitRot = dir * (12 + (i % 3) * 3);
      const weaveRot1 = -dir * (9 + (i % 2) * 3);
      const weaveRot2 = dir * 6;
      const heroRot = isTarget ? 0 : depthOffset * 4;

      cv.rotateZ.value = withSequence(
        withTiming(splitRot, { duration: T_SPLIT, easing: easeOut }),
        withTiming(weaveRot1, { duration: T_RIFFLE_1, easing: easeInOut }),
        withTiming(weaveRot2, { duration: T_RIFFLE_2, easing: easeInOut }),
        withTiming(dir * 2, { duration: T_WASH, easing: easeInOut }),
        withTiming(0, { duration: T_GATHER, easing: easeOut }),
        withTiming(heroRot, { duration: T_HERO, easing: easeOut })
      );

      // --- Z-INDEX FLIPS (Dynamic depth changes during shuffle) ---
      // Reanimated supports withTiming / withSequence for numbers
      const intermediateZ = isEven ? 10 + i : 10 - i;
      const heroZ = isTarget ? 99 : 5 - Math.abs(depthOffset);

      cv.zIndex.value = withSequence(
        withTiming(intermediateZ, { duration: T_SPLIT }),
        withTiming(20 - intermediateZ, { duration: T_RIFFLE_1 }),
        withTiming(intermediateZ, { duration: T_RIFFLE_2 }),
        withTiming(i + 1, { duration: T_WASH + T_GATHER }),
        withTiming(heroZ, { duration: T_HERO })
      );

      // --- SCALE & OPACITY ---
      if (isTarget) {
        // Hero card expands and highlights
        cv.scale.value = withSequence(
          withTiming(1, { duration: T_SPLIT + T_RIFFLE_1 + T_RIFFLE_2 + T_WASH + T_GATHER }),
          withSpring(1.06, { damping: 11, stiffness: 140 })
        );
        cv.opacity.value = withSequence(
          withTiming(1, { duration: T_SPLIT + T_RIFFLE_1 + T_RIFFLE_2 + T_WASH + T_GATHER }),
          withTiming(1, { duration: T_HERO })
        );
      } else {
        // Non-selected cards tuck down and fade back slightly
        cv.scale.value = withSequence(
          withTiming(1, { duration: T_SPLIT + T_RIFFLE_1 + T_RIFFLE_2 + T_WASH + T_GATHER }),
          withTiming(0.86, { duration: T_HERO, easing: easeOut })
        );
        cv.opacity.value = withSequence(
          withTiming(1, { duration: T_SPLIT + T_RIFFLE_1 + T_RIFFLE_2 + T_WASH + T_GATHER }),
          withTiming(0.25, { duration: T_HERO, easing: easeOut })
        );
      }
    }

    // Schedule completion trigger after total duration
    const totalTimeMs = T_SPLIT + T_RIFFLE_1 + T_RIFFLE_2 + T_WASH + T_GATHER + T_HERO;
    setTimeout(() => {
      handleShuffleFinished(targetIdx);
    }, totalTimeMs);
  }, [isShuffling, totalCards, cardValues, handleShuffleFinished]);

  const resetShuffle = useCallback(() => {
    setIsShuffling(false);
    setIsCompleted(false);
    setSelectedCard(null);
    setSelectedIndex(null);
    initPositions();
  }, [initPositions]);

  return {
    isShuffling,
    isCompleted,
    selectedCard,
    selectedIndex,
    startShuffle,
    resetShuffle,
    cardValues,
  };
}
