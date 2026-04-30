import React, { useState } from 'react'
import PurchasePlanForm from './purchasePlanForm'
import PurchasePlanList from './purchasePlanList'

/**
 * Purchase plan component.
 *
 * @returns {Function} JSX Element.
 */
const PurchasePlan = () => {
  const [items, setItems] = useState([])

  /**
   * Handles changes to the form fields.
   *
   * @param {number} index - The index of the item being changed
   * @param {Event} event - The event object
   */
  const handleChange = (index, event) => {
    const values = [...items]
    values[index][event.target.name] = event.target.value
    setItems(values)
  }

  /**
   * Adds a new item to the form.
   *
   * @param {object} item - The item to add to the form
   */
  const handleAddItem = (item) => {
    setItems([...items, item])
  }

  /**
   * Handles form submission.
   *
   * @param {Event} event - The event object.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    // Här kan du hantera formulärets inlämning, till exempel skicka data till en server eller uppdatera tillstånd
    console.log('Purchase Plan:', items)
  }

  return (
    <div>
      <p>Add a new item to your purchase plan</p>
      <PurchasePlanForm
        items={items}
        handleChange={handleChange}
        handleAddItem={handleAddItem}
        handleSubmit={handleSubmit}
      />
      <p>Your purchase plan</p>
      <PurchasePlanList items={items} />
    </div>
  )
}

export default PurchasePlan
