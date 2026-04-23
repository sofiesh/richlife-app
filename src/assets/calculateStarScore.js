/**
 * Calculate a star score for a product based on its value rating and price.
 *
 * @param {{ valueRating: number, price: number }} products - The product object containing valueRating and price.
 * @returns {number} The calculated star score.
 */
export function calculateStarScore (products) {
  const value = products.valueRating || 0
  const price = products.price || 1

  return (value * 1000) / price
}
