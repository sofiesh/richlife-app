/**
 * Calculate a star score for a product based on use frequency and joy score.
 *
 * @param {{ usage_frequency: string, joy_score: number }} p - The product object containing usage frequency and joy score.
 * @returns {number} The calculated star score.
 */
const freqMap = { dagligen: 4, 'varje vecka': 3, 'varje månad': 2, 'mer sällan': 1 }

export function calculateStarScore(p) {
  const freq = freqMap[p.usage_frequency] ?? 2
  const joy = p.joy_score ?? 5
  return freq * joy
}
