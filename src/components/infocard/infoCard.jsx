import React from 'react'
import PropTypes from 'prop-types'
import './infoCard.css'

/**
 * The info card component.
 *
 * @param {*} param0 card details
 * @returns {Function} jsx component
 */
const InfoCard = ({ title, value, subtitle, variant = 'default' }) => (
  <div className={`info-card info-card--${variant}`}>
    <span className="info-card__title">{title}</span>
    <span className="info-card__value">{value ?? '–'}</span>
    {subtitle && <span className="info-card__subtitle">{subtitle}</span>}
  </div>
)

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'highlight', 'warning', 'success']),
}

export default InfoCard
