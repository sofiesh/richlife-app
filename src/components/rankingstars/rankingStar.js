import React from 'react'
import PropTypes from 'prop-types'

/**
 * Star rating component.
 *
 * @param {object} root0 - Props object.
 * @param {number} root0.value - Current star rating value (0-5).
 * @param {Function} root0.onChange - Callback function to handle star rating changes.
 * @returns {Function} JSX Element representing the star rating.
 */
const Star = ({ value = 0, onChange }) => {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange?.(star)}
          style={{
            cursor: 'pointer',
            color: star <= value ? '#f5c518' : '#ccc',
            fontSize: '20px'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

Star.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
}

export default Star
