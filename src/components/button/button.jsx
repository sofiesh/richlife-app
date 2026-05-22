// Button.js
import React from 'react'
import PropTypes from 'prop-types'
import './button.css'

/**
 * Button component.
 *
 * @param {object} props - Button properties
 * @param {object} props.type - The button type
 * @param {Function} props.onClick - Button click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant (primary, outline, text)
 * @returns {Function} JSX Element
 */
const Button = ({ onClick, children, variant = 'primary', type = 'button' }) => {
  return (
    <button className={`button btn--${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'text']),
  type: PropTypes.string,
}

export default Button
