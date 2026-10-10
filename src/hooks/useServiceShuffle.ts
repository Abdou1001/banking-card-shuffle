import { useState, useCallback, useRef } from 'react';
import {
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SHUFFLE_CONFIG, SHUFFLE_DURATION } from '@/animations/shuffleConfig';

export interface CardMotionValues {
  translateX: ReturnType<typeof useSharedValue<number>>;
  translateY: ReturnType<typeof useSharedValue<number>>;
  rotateZ: ReturnType<typeof useSharedValue<number>>;
  scale: ReturnType<typeof useSharedValue<number>>;
  opacity: ReturnType<typeof useSharedValue<number>>;
  zIndex: ReturnType<typeof useSharedValue<number>>;
}

export interface UseServiceShuffleOptions<T> {
  items: T[];
  onComplete?: (selectedItem: T, index: number) => void;
}

export interface UseServiceShuffleReturn<T> {
  isShuffling: boolean;
  isCompleted: boolean;
  selectedCard: T | null;
  selectedIndex: number | null;
  startShuffle: () => void;
  resetShuffle: () => void;
  cardMotions: CardMotionValues[];
  shuffleDuration: number;
}

const MAX_CARDS = 10;

export function useServiceShuffle<T>({
  items,
  onComplete,
}: UseServiceShuffleOptions<T>): UseServiceShuffleReturn<T> {
  const [isShuffling, setIsShuffling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<T | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Guard against simultaneous double-triggering
  const isRunningRef = useRef(false);

  // Allocate fixed number of shared values to satisfy React Hooks rules
  const m0_x = useSharedValue(0);
  const m0_y = useSharedValue(0);
  const m0_r = useSharedValue(0);
  const m0_s = useSharedValue(1);
  const m0_o = useSharedValue(1);
  const m0_z = useSharedValue(24);

  const m1_x = useSharedValue(0);
  const m1_y = useSharedValue(0);
  const m1_r = useSharedValue(0);
  const m1_s = useSharedValue(1);
  const m1_o = useSharedValue(1);
  const m1_z = useSharedValue(22);

  const m2_x = useSharedValue(0);
  const m2_y = useSharedValue(0);
  const m2_r = useSharedValue(0);
  const m2_s = useSharedValue(1);
  const m2_o = useSharedValue(1);
  const m2_z = useSharedValue(20);

  const m3_x = useSharedValue(0);
  const m3_y = useSharedValue(0);
  const m3_r = useSharedValue(0);
  const m3_s = useSharedValue(1);
  const m3_o = useSharedValue(1);
  const m3_z = useSharedValue(18);

  const m4_x = useSharedValue(0);
  const m4_y = useSharedValue(0);
  const m4_r = useSharedValue(0);
  const m4_s = useSharedValue(1);
  const m4_o = useSharedValue(1);
  const m4_z = useSharedValue(16);

  const m5_x = useSharedValue(0);
  const m5_y = useSharedValue(0);
  const m5_r = useSharedValue(0);
  const m5_s = useSharedValue(1);
  const m5_o = useSharedValue(1);
  const m5_z = useSharedValue(14);

  const m6_x = useSharedValue(0);
  const m6_y = useSharedValue(0);
  const m6_r = useSharedValue(0);
  const m6_s = useSharedValue(1);
  const m6_o = useSharedValue(1);
  const m6_z = useSharedValue(12);

  const m7_x = useSharedValue(0);
  const m7_y = useSharedValue(0);
  const m7_r = useSharedValue(0);
  const m7_s = useSharedValue(1);
  const m7_o = useSharedValue(1);
  const m7_z = useSharedValue(10);

  const m8_x = useSharedValue(0);
  const m8_y = useSharedValue(0);
  const m8_r = useSharedValue(0);
  const m8_s = useSharedValue(1);
  const m8_o = useSharedValue(1);
  const m8_z = useSharedValue(8);

  const m9_x = useSharedValue(0);
  const m9_y = useSharedValue(0);
  const m9_r = useSharedValue(0);
  const m9_s = useSharedValue(1);
  const m9_o = useSharedValue(1);
  const m9_z = useSharedValue(6);

  const allMotions: CardMotionValues[] = [
    { translateX: m0_x, translateY: m0_y, rotateZ: m0_r, scale: m0_s, opacity: m0_o, zIndex: m0_z },
    { translateX: m1_x, translateY: m1_y, rotateZ: m1_r, scale: m1_s, opacity: m1_o, zIndex: m1_z },
    { translateX: m2_x, translateY: m2_y, rotateZ: m2_r, scale: m2_s, opacity: m2_o, zIndex: m2_z },
    { translateX: m3_x, translateY: m3_y, rotateZ: m3_r, scale: m3_s, opacity: m3_o, zIndex: m3_z },
    { translateX: m4_x, translateY: m4_y, rotateZ: m4_r, scale: m4_s, opacity: m4_o, zIndex: m4_z },
    { translateX: m5_x, translateY: m5_y, rotateZ: m5_r, scale: m5_s, opacity: m5_o, zIndex: m5_z },
    { translateX: m6_x, translateY: m6_y, rotateZ: m6_r, scale: m6_s, opacity: m6_o, zIndex: m6_z },
    { translateX: m7_x, translateY: m7_y, rotateZ: m7_r, scale: m7_s, opacity: m7_o, zIndex: m7_z },
    { translateX: m8_x, translateY: m8_y, rotateZ: m8_r, scale: m8_s, opacity: m8_o, zIndex: m8_z },
    { translateX: m9_x, translateY: m9_y, rotateZ: m9_r, scale: m9_s, opacity: m9_o, zIndex: m9_z },
  ];

  const totalCards = Math.min(items.length, MAX_CARDS);
  const cardMotions = allMotions.slice(0, totalCards);

  // Reset all motion shared values to default resting state
  const resetMotionValues = useCallback(() => {
    for (let i = 0; i < totalCards; i++) {
      const m = cardMotions[i];
      if (!m) continue;
      m.translateX.value = 0;
      m.translateY.value = 0;
      m.rotateZ.value = 0;
      m.scale.value = 1;
      m.opacity.value = 1;
      m.zIndex.value = (MAX_CARDS - i) * 2;
    }
  }, [totalCards, cardMotions]);

  // Safe JS callback triggered strictly when animation completes
  const handleAnimationComplete = useCallback(
    (targetIdx: number) => {
      isRunningRef.current = false;
      setIsShuffling(false);
      setIsCompleted(true);

      const picked = items[targetIdx];
      setSelectedCard(picked);
      setSelectedIndex(targetIdx);

      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {
        // Ignored
      }

      if (onComplete && picked) {
        onComplete(picked, targetIdx);
      }
    },
    [items, onComplete]
  );

  const startShuffle = useCallback(() => {
    if (isRunningRef.current || isShuffling || totalCards === 0) return;

    // Single item: select it immediately
    if (totalCards === 1) {
      handleAnimationComplete(0);
      return;
    }

    isRunningRef.current = true;
    setIsShuffling(true);
    setIsCompleted(false);
    setSelectedCard(null);
    setSelectedIndex(null);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {
      // Ignored
    }

    const targetIdx = Math.floor(Math.random() * totalCards);

    const {
      phase1FastCut: t1,
      phase2FastRiffle: t2,
      phase3SecondRiffle: t3,
      phase4OverhandGather: t4,
      phase5SlowSettle: t5,
      phase6HeroReveal: t6,
      fastEasing: eFast,
      mediumEasing: eMedium,
      gatherEasing: eGather,
      settleEasing: eSettle,
    } = SHUFFLE_CONFIG;

    for (let i = 0; i < totalCards; i++) {
      const m = cardMotions[i];
      if (!m) continue;

      const isTarget = i === targetIdx;
      // Even cards go left half, odd cards go right half (riffle split)
      const isLeftHalf = i % 2 === 0;
      const dir = isLeftHalf ? -1 : 1;
      const normalizedPos = (i - (totalCards - 1) / 2) / Math.max(totalCards - 1, 1); // -1 to +1

      // ─── RIFFLE SHUFFLE PHYSICS ─────────────────────────────────────
      // Phase 1: CUT — split deck cleanly into left and right halves
      // Each card moves to its side by an amount proportional to its index
      const cutX = dir * (55 + Math.abs(normalizedPos) * 45);
      const cutY = isLeftHalf ? -12 : 12;
      const cutR = dir * (8 + Math.abs(normalizedPos) * 5);

      // Phase 2: RIFFLE — cards from both halves interleave rapidly
      // Cards shoot to the opposite side quickly (riffle interweave effect)
      const riffle1X = -dir * (40 + (i % 3) * 18);
      const riffle1Y = dir * 10;
      const riffle1R = -dir * 7;

      // Phase 3: SECOND RIFFLE PASS — second interweave for realism
      const riffle2X = dir * (28 + (i % 2) * 22);
      const riffle2Y = isLeftHalf ? -8 : 8;
      const riffle2R = dir * 5;

      // Phase 4: OVERHAND GATHER — cascade all cards to center with chaos
      const gatherX = normalizedPos * 20;
      const gatherY = Math.abs(normalizedPos) * 6;
      const gatherR = normalizedPos * 3;

      // Phase 5: SETTLE — precise slide into stacked position
      const settleX = 0;
      const settleY = 0;
      const settleR = 0;

      // Phase 6: HERO REVEAL — winning card rises, others fan back
      const heroX = isTarget ? 0 : normalizedPos * 28;
      const heroY = isTarget ? -22 : 40;
      const heroR = isTarget ? 0 : normalizedPos * 4;

      // ── TRANSLATE X ──────────────────────────────────────────────────
      if (isTarget) {
        m.translateX.value = withSequence(
          withTiming(cutX,     { duration: t1, easing: eFast }),
          withTiming(riffle1X, { duration: t2, easing: eFast }),
          withTiming(riffle2X, { duration: t3, easing: eMedium }),
          withTiming(gatherX,  { duration: t4, easing: eGather }),
          withTiming(settleX,  { duration: t5, easing: eSettle }),
          withTiming(heroX,    { duration: t6, easing: eSettle }, (finished) => {
            'worklet';
            if (finished) {
              runOnJS(handleAnimationComplete)(targetIdx);
            }
          })
        );
      } else {
        m.translateX.value = withSequence(
          withTiming(cutX,     { duration: t1, easing: eFast }),
          withTiming(riffle1X, { duration: t2, easing: eFast }),
          withTiming(riffle2X, { duration: t3, easing: eMedium }),
          withTiming(gatherX,  { duration: t4, easing: eGather }),
          withTiming(settleX,  { duration: t5, easing: eSettle }),
          withTiming(heroX,    { duration: t6, easing: eSettle })
        );
      }

      // ── TRANSLATE Y ──────────────────────────────────────────────────
      m.translateY.value = withSequence(
        withTiming(cutY,     { duration: t1, easing: eFast }),
        withTiming(riffle1Y, { duration: t2, easing: eFast }),
        withTiming(riffle2Y, { duration: t3, easing: eMedium }),
        withTiming(gatherY,  { duration: t4, easing: eGather }),
        withTiming(settleY,  { duration: t5, easing: eSettle }),
        withTiming(heroY,    { duration: t6, easing: eSettle })
      );

      // ── ROTATE Z ─────────────────────────────────────────────────────
      m.rotateZ.value = withSequence(
        withTiming(cutR,     { duration: t1, easing: eFast }),
        withTiming(riffle1R, { duration: t2, easing: eFast }),
        withTiming(riffle2R, { duration: t3, easing: eMedium }),
        withTiming(gatherR,  { duration: t4, easing: eGather }),
        withTiming(settleR,  { duration: t5, easing: eSettle }),
        withTiming(heroR,    { duration: t6, easing: eSettle })
      );

      // ── SCALE ─────────────────────────────────────────────────────────
      const preShuffleDuration = t1 + t2 + t3 + t4 + t5;
      if (isTarget) {
        m.scale.value = withSequence(
          withTiming(0.96, { duration: preShuffleDuration }),
          withSpring(1.07, { damping: 16, stiffness: 150, mass: 0.9 })
        );
      } else {
        m.scale.value = withSequence(
          withTiming(0.96, { duration: preShuffleDuration }),
          withTiming(0.85, { duration: t6, easing: eSettle })
        );
      }

      // ── OPACITY ───────────────────────────────────────────────────────
      if (isTarget) {
        m.opacity.value = withSequence(
          withTiming(0.85, { duration: t1 }),
          withTiming(1, { duration: t2 + t3 + t4 + t5 + t6 })
        );
      } else {
        m.opacity.value = withSequence(
          withTiming(0.85, { duration: t1 }),
          withTiming(1, { duration: t2 + t3 + t4 + t5 }),
          withTiming(0.22, { duration: t6, easing: eSettle })
        );
      }

      // ── Z-INDEX DYNAMICS (Swapping card layers & simulating card interchange) ──
      // Card 0 specifically alternates from top (20) -> bottom (2) -> top (28)
      // Odd cards alternate in reverse to Card 0, creating real interleaving motion
      const zPhase1 = isLeftHalf ? 20 - i : 10 - i;
      const zPhase2 = isLeftHalf ? 2 + i  : 25 - i;  // Card 0 dives underneath!
      const zPhase3 = isLeftHalf ? 28 - i : 4 + i;   // Card 0 rises on top!
      const zPhase4 = isTarget ? 60 : 10 + (totalCards - i);
      const zPhase5 = isTarget ? 80 : 10 + (totalCards - i);
      const zPhase6 = isTarget ? 100 : i + 1;

      m.zIndex.value = withSequence(
        withTiming(zPhase1, { duration: t1 }),
        withTiming(zPhase2, { duration: t2 }),
        withTiming(zPhase3, { duration: t3 }),
        withTiming(zPhase4, { duration: t4 }),
        withTiming(zPhase5, { duration: t5 }),
        withTiming(zPhase6, { duration: t6 })
      );
    }
  }, [
    isShuffling,
    totalCards,
    cardMotions,
    handleAnimationComplete,
  ]);

  const resetShuffle = useCallback(() => {
    isRunningRef.current = false;
    setIsShuffling(false);
    setIsCompleted(false);
    setSelectedCard(null);
    setSelectedIndex(null);
    resetMotionValues();
  }, [resetMotionValues]);

  return {
    isShuffling,
    isCompleted,
    selectedCard,
    selectedIndex,
    startShuffle,
    resetShuffle,
    cardMotions,
    shuffleDuration: SHUFFLE_DURATION,
  };
}
