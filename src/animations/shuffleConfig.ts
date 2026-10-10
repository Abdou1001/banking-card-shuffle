import { Easing } from 'react-native-reanimated';

/**
 * Shuffle animation timings — optimized for smooth, realistic card shuffling.
 * Total duration: ~2.8 seconds to feel satisfying without being too slow.
 */
export const SHUFFLE_DURATION = 2800;

export const SHUFFLE_CONFIG = {
  duration: SHUFFLE_DURATION,

  // Phase durations in milliseconds
  // Phase 1: Split the deck into left/right halves (fast)
  phase1FastCut: 320,
  // Phase 2: Riffle — interleave cards from left and right alternately (rapid)
  phase2FastRiffle: 280,
  // Phase 3: Second riffle pass in opposite direction
  phase3SecondRiffle: 300,
  // Phase 4: Overhand shuffle — cascade gather with slight chaos
  phase4OverhandGather: 420,
  // Phase 5: Settle the deck into resting position smoothly
  phase5SlowSettle: 480,
  // Phase 6: Hero card emerges and shines
  phase6HeroReveal: 700,

  // Spring settings for the hero reveal
  heroSpring: { damping: 18, stiffness: 160, mass: 0.8 },

  // Easings tuned for physical card motion
  // Fast initial snap to simulate physical card inertia
  fastEasing: Easing.out(Easing.quad),
  // Medium cross: smooth arc
  mediumEasing: Easing.inOut(Easing.sin),
  // Gather: heavy deceleration
  gatherEasing: Easing.out(Easing.cubic),
  // Settle: very smooth exponential deceleration
  settleEasing: Easing.out(Easing.exp),
};
