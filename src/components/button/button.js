// Button.js
import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

/**
 * Button component.
 *
 * @param {object} props - Button properties
 * @param {Function} props.onClick - Button click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant (primary, outline, text)
 * @returns {Function} JSX Element
 */
const Button = ({ onClick, children, variant = 'primary' }) => {
  return (
    <button className={`button btn--${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'text']),
}

export default Button
