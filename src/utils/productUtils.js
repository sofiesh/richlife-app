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

/**
 * Counts products bought second-hand.
 *
 * @param {Array} products purchased products
 * @returns {number} count of second-hand purchases
 */
export const countSecondHandProducts = (products) =>
  products.filter((p) => p.purchased_condition === 'second_hand').length

/**
 * Calculates actual savings from buying second-hand.
 *
 * @param {Array} products purchased products
 * @returns {number} total saved in kr
 */
export const calculateActualSavingsSecondHand = (products) =>
  products
    .filter(
      (p) =>
        p.purchased_condition === 'second_hand' &&
        p.new_price != null &&
        p.second_hand_price != null,
    )
    .reduce((sum, p) => sum + (p.new_price - p.second_hand_price), 0)

/**
 * Calculates potential additional savings if new purchases had been bought second-hand.
 *
 * @param {Array} products purchased products
 * @returns {number} potential savings in kr
 */
export const calculatePotentialSavingsIfAllSecondHand = (products) =>
  products
    .filter(
      (p) =>
        p.purchased_condition !== 'second_hand' &&
        p.new_price != null &&
        p.second_hand_price != null,
    )
    .reduce((sum, p) => sum + (p.new_price - p.second_hand_price), 0)
