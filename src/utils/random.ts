/**
 * Returns a cryptographically sound or high-entropy random integer in range [0, max - 1].
 */
export function getRandomIndex(length: number): number {
  if (length <= 0) return 0;
  return Math.floor(Math.random() * length);
}

/**
 * Returns a random integer in range [min, max] inclusive.
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fisher-Yates array shuffle (pure copy).
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
