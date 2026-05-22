import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PurchasePlanForm from './purchasePlanForm'
import PurchasePlanList from './purchasePlanList'
import { getProducts, addProduct } from '../../repositories/productRepository'

/**
 * Purchase plan component.
 *
 * @param {object} props - Component props.
 * @param {object} props.user - The authenticated user.
 * @returns {Function} The purchase plan view with product list and add-item form.
 */
const PurchasePlan = ({ user }) => {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)

  /**
   * Adds a new item to the form and save to Supabase.
   *
   * @param {object} item - The item to add to the form
   */
  const handleAddItem = async (item) => {
    await addProduct(user.uid, item)
    setItems([...items, item])
    setShowForm(false)
  }

  // Steg 3 — hämta från Supabase vid load
  useEffect(() => {
    getProducts(user.uid).then(setItems)
  }, [user.uid])

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Avbryt' : 'Lägg till produkt'}
      </button>

      {showForm && <PurchasePlanForm onAdd={handleAddItem} />}

      <p>Your purchase plan</p>
      <PurchasePlanList items={items} />
    </div>
  )
}

PurchasePlan.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
}

export default PurchasePlan
