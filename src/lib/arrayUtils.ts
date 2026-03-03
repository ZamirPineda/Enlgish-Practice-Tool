/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * This provides an unbiased shuffle compared to using array.sort().
 *
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // We use Math.random() here as it is sufficient for the purpose of flashcards.
    // For cryptographic purposes, a more secure source of randomness would be used.
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
