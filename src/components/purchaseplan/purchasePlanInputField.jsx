// Input field for purchase plan form
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Input field component.
 *
 * @param {object} props - Component properties
 * @param {string} props.label - Field label
 * @param {string} props.name - Field name
 * @param {string} props.placeholder - Field placeholder
 * @param {number} props.value - Field value
 * @param {Function} props.onChange - Field change handler
 * @returns {Function} JSX Element
 */
const PurchasePlanInputField = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-input"
        id={name}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

PurchasePlanInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PurchasePlanInputField
