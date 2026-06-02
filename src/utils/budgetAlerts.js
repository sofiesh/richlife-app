import { BUDGET_LIMITS } from '../constants'

/**
 * Generates budget alerts based on income and expense data.
 *
 * @param {number} totalIncome - The total income.
 * @param {Array} expenses - The list of expenses.
 * @returns {Array} The list of budget alerts.
 */
export function getBudgetAlerts(totalIncome, expenses) {
  if (totalIncome === 0) return []
  const alerts = []

  /**
   * Calculates the total amount for a given category.
   *
   * @param {string} cat - The category.
   * @returns {number} The total amount for the category.
   */
  const sum = (cat) =>
    expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + e.amount, 0)

  /**
   * Calculates the percentage of the total income for a given category.
   *
   * @param {string} cat - The category.
   * @returns {number} The percentage of the total income for the category.
   */
  const pct = (cat) => Math.round((sum(cat) / totalIncome) * 100)

  /**
   * Calculates how much the actual spending is over the recommended limit.
   *
   * @param {number} actual - The actual spending.
   * @param {number} limit - The recommended limit.
   * @returns {number} The percentage over the limit.
   */
  const overBy = (actual, limit) => Math.round((actual / limit - 1) * 100)

  const housing = pct('boende')
  if (housing > BUDGET_LIMITS.housing)
    alerts.push({
      category: 'boende',
      message: `Din boendekostnad är ${overBy(housing, BUDGET_LIMITS.housing)}% högre än rekommenderat. Du lägger ${housing}% av inkomsten på boende — tumregeln är max ${BUDGET_LIMITS.housing}%.`,
    })

  const food = pct('mat')
  if (food > BUDGET_LIMITS.food)
    alerts.push({
      category: 'mat',
      message: `Din matkostnad är ${food}% och är ${overBy(food, BUDGET_LIMITS.food)}% högre än rekommenderat.`,
    })

  const transport = pct('transport')
  if (transport > BUDGET_LIMITS.transport)
    alerts.push({
      category: 'transport',
      message: `Din transportkostnad är ${transport}% och är ${overBy(transport, BUDGET_LIMITS.transport)}% högre än rekommenderat.`,
    })

  const totalFixed = pct('boende') + pct('mat') + pct('transport')
  if (totalFixed > BUDGET_LIMITS.totalFixed)
    alerts.push({
      category: 'totalt',
      message: `Boende, mat och transport tar tillsammans ${totalFixed}% av din inkomst. Det lämnar lite utrymme för sparande och oväntade utgifter.`,
    })

  return alerts
}
