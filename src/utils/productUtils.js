/**
 * Counts number of products.
 *
 * @param {*} products the products in the database
 * @returns {number} the number of products in the purchase plan
 */
export const countProducts = (products) => products.length

/**
 * The total sum of new price in purchase plan.
 *
 * @param {*} products The products in the database
 * @returns {number} the value of the products in the purchase plan
 */
export const sumNewPrice = (products) => products.reduce((sum, p) => sum + (p.new_price || 0), 0)

/**
 * The total sum of second hand price in purchase plan.
 *
 * @param {*} products The products in the database
 * @returns {number} the value of the products in the purchase plan
 */
export const sumSecondHandPrice = (products) =>
  products.reduce((sum, p) => sum + (p.second_hand_price || 0), 0)

/**
 * Ranks the products to get the most valued product.
 *
 * @param {*} rankedProducts The products in the database
 * @returns {object} The product valued most important
 */
export const getBestProduct = (rankedProducts) => rankedProducts[0] ?? null
