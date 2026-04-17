import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PurchasePlanInputField from './purchasePlanInputField'
import Button from './button'

/**
 * Purchase plan form component.
 *
 * @param {object} props - The props object.
 * @param {Array} props.items - The list of items in the purchase plan. Each item is an object with `name` and `price` properties.
 * @param {Function} props.handleAddItem - Function to add a new item to the form.
 * @returns {Function} JSX Element.
 */
const PurchasePlanForm = ({ items, handleAddItem }) => {
  const [formItem, setFormItem] = useState({ name: '', price: '' })

  /**
   * Function to handle changes to the form fields.
   *
   * @param {Event} event - The event object.
   */
  const handleChange = (event) => {
    setFormItem({ ...formItem, [event.target.name]: event.target.value })
  }

  /**
   * Function to handle form submission.
   *
   * @param {Event} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddItem(formItem)
    setFormItem({ name: '', price: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='purchaseplaninputfield-component'>
        <PurchasePlanInputField
          name="name"
          placeholder="Artikel"
          value={formItem.name}
          onChange={handleChange}
        />
      </div>
      <div className='purchaseplaninputfield-component'>
        <PurchasePlanInputField
          name="price"
          placeholder="Pris"
          value={formItem.price}
          onChange={handleChange}
        />
      </div>
      <Button text="Add new item" backgroundColor="#1a8c51" type="submit" >Skicka</Button>
    </form>
  )
}

PurchasePlanForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired,
  handleAddItem: PropTypes.func.isRequired
}

export default PurchasePlanForm
