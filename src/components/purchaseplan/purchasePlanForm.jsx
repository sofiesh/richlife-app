import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PurchasePlanInputField from './purchasePlanInputField'
import './purchasePlanForm.css'

/**
 * Purchase plan form component.
 *
 * @param {object} props - The props object.
 * @param {Function} props.onAdd - The function to add new items.
 * @returns {Function} JSX Element.
 */
const PurchasePlanForm = ({ onAdd }) => {
  const [formItem, setFormItem] = useState({
    name: '',
    new_price: '',
    second_hand_price: '',
    category: '',
    priority: '',
    value_rating: '',
  })

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
    const parsed = {
      ...formItem,
      new_price: formItem.new_price ? Number(formItem.new_price) : null,
      second_hand_price: formItem.second_hand_price ? Number(formItem.second_hand_price) : null,
      priority: formItem.priority ? Number(formItem.priority) : null,
      value_rating: formItem.value_rating ? Number(formItem.value_rating) : null,
    }
    onAdd(parsed)
    setFormItem({
      name: '',
      new_price: '',
      second_hand_price: '',
      category: '',
      priority: '',
      value_rating: '',
    })
  }

  return (
    <form className="purchase-plan-form" onSubmit={handleSubmit}>
      <h2>Ny produkt</h2>
      <PurchasePlanInputField
        name="name"
        label="Artikel"
        placeholder="t.ex. Cykel"
        value={formItem.name}
        onChange={handleChange}
      />
      <PurchasePlanInputField
        name="new_price"
        label="Nypris (kr)"
        placeholder="0"
        value={formItem.new_price}
        onChange={handleChange}
      />
      <PurchasePlanInputField
        name="second_hand_price"
        label="Secondhand (kr)"
        placeholder="0"
        value={formItem.second_hand_price}
        onChange={handleChange}
      />
      <PurchasePlanInputField
        name="category"
        label="Kategori"
        placeholder="t.ex. Sport"
        value={formItem.category}
        onChange={handleChange}
      />
      <PurchasePlanInputField
        name="priority"
        label="Prioritet (1–5)"
        placeholder="3"
        value={formItem.priority}
        onChange={handleChange}
      />
      <PurchasePlanInputField
        name="value_rating"
        label="Värdering (1–5)"
        placeholder="3"
        value={formItem.value_rating}
        onChange={handleChange}
      />

      <button className="btn-primary" type="submit">
        Lägg till produkt
      </button>
    </form>
  )
}

PurchasePlanForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default PurchasePlanForm
