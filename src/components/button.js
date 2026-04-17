// Button.js
import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

/**
 * Button component.
 *
 * @param {object} props - Button properties
 * @param {Function} props.onClick - Button click handler
 * @param {string} props.text - Button text
 * @param {string} props.backgroundColor - Button background color
 * @param {string} props.color - Button text color
 * @returns {Function} JSX Element
 */
const Button = ({ onClick, text, backgroundColor, color }) => {
  return (
        <button
          className="button"
          style={{ backgroundColor, color }}
          onClick={onClick}
        >
          {text}
        </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Button
