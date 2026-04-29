import React from 'react'
import PropTypes from 'prop-types'

/**
 * PurchasePlanList component.
 *
 * @param {object} props - Component properties
 * @param {Array} props.items - List of purchase plan items
 * @returns {Function} JSX Element
 */
const PurchasePlanList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <strong>Item:</strong> {item.name}, <strong>Price:</strong> {item.price}
        </li>
      ))}
    </ul>
  )
}

PurchasePlanList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired
}

export default PurchasePlanList
