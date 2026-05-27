import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../context/budgetContext'
import { getBudgetAlerts } from '../../utils/budgetAlerts'
import './insights.css'

const KEY_FIGURES = [
  { category: 'boende', label: 'Boende', limit: 30, warnIfOver: true },
  { category: 'mat', label: 'Mat', limit: 15, warnIfOver: true },
  { category: 'transport', label: 'Transport', limit: 15, warnIfOver: true },
  { category: 'sparande', label: 'Sparande', limit: 10, warnIfOver: false },
]

const TIPS = [
  'Försök spara minst 10% av din inkomst varje månad.',
  'Boendekostnad över 30% av inkomsten ger lite utrymme för oväntade utgifter.',
  'En buffert på 3 månadslöner ger ekonomisk trygghet vid sjukdom eller arbetslöshet.',
  'Se över prenumerationer regelbundet — små belopp summerar snabbt.',
]

/**
 * Creates a view for insights.
 *
 * @returns {Function} JSX Element.
 */
const Insights = () => {
  const navigate = useNavigate()
  const { totalIncome, expenses } = useBudget()
  const alerts = getBudgetAlerts(totalIncome, expenses)

  /**
   * Calculates the percentage of expenses for a given category.
   *
   * @param {string} cat - The category for which to calculate the percentage.
   * @returns {number} The percentage of expenses for the specified category.
   */
  const pct = (cat) => {
    if (totalIncome === 0) return 0
    const total = expenses.filter((e) => e.category === cat).reduce((acc, e) => acc + e.amount, 0)
    return Math.round((total / totalIncome) * 100)
  }

  return (
    <div className="insights-page">
      <button type="button" className="item-back" onClick={() => navigate('/')}>
        Tillbaka
      </button>
      <h1>Insikter</h1>

      <section className="insights-section">
        <h2>Nyckeltal</h2>
        {KEY_FIGURES.map(({ category, label, limit, warnIfOver }) => {
          const value = pct(category)
          const isWarning = warnIfOver ? value > limit : value < limit
          return (
            <div key={category} className="insights-row">
              <span className="insights-label">{label}</span>
              <span className="insights-value">{value}% av inkomst</span>
              <span className="insights-limit">
                max {Math.round(totalIncome * limit / 100).toLocaleString('sv-SE')} kr
              </span>
              <span>{isWarning ? '⚠️' : '✅'}</span>
            </div>
          )
        })}
      </section>

      {/* Alerts */}
      <section className="insights-section">
        <h2>Varningar</h2>
        {alerts.length === 0 ? (
          <p>Inga varningar — din budget ser bra ut!</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.category} className="insights-alert">
              <h3>{alert.category}</h3>
              <p>{alert.message}</p>
            </div>
          ))
        )}
      </section>

      {/* Tips */}
      <section className="insights-section">
        <h2>Tips</h2>
        {TIPS.map((tip) => (
          <p key={tip} className="insights-tip">
            {tip}
          </p>
        ))}
      </section>
    </div>
  )
}

export default Insights
