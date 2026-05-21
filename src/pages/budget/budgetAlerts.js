import React from 'react'
import PropTypes from 'prop-types'

/**
 * Displays budget alerts based on spending ratios.
 *
 * @param {object} props - Component properties.
 * @param {Array} props.alerts - List of alert objects with category and message.
 * @returns {Function} JSX Element.
 */
const BudgetAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null

  return (
    <section className="budget-alerts">
      {alerts.map((alert) => (
        <div key={alert.category} className="budget-alert">
          <span className="budget-alert-icon">⚠️</span>
          <p className="budget-alert-message">{alert.message}</p>
        </div>
      ))}
    </section>
  )
}

BudgetAlerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default BudgetAlerts
