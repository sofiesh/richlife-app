import React, { useState } from 'react'
import PropTypes from 'prop-types'
import JoyScoreSlider from '../joyscore/joyScoreSlider'
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
    usage_frequency: '',
    joy_score: 5,
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
      usage_frequency: formItem.usage_frequency || null,
      joy_score: formItem.joy_score ? Number(formItem.joy_score) : null,
    }
    onAdd(parsed)
    setFormItem({
      name: '',
      new_price: '',
      second_hand_price: '',
      category: '',
      usage_frequency: '',
      joy_score: '',
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
      {/* Usage frequency dropdown */}
      <div className="form-field">
        <label className="form-label" htmlFor="usage_frequency">
          Användningsfrekvens
        </label>
        <select
          className="form-input"
          id="usage_frequency"
          name="usage_frequency"
          value={formItem.usage_frequency}
          onChange={handleChange}
        >
          <option value="">Välj frekvens</option>
          <option value="dagligen">Dagligen</option>
          <option value="varje vecka">Varje vecka</option>
          <option value="varje månad">Varje månad</option>
          <option value="mer sällan">Mer sällan</option>
        </select>
      </div>
      <div className="form-field">
        <label className="form-label">Glädjefaktor</label>
        <JoyScoreSlider
          value={formItem.joy_score}
          onChange={(val) => setFormItem({ ...formItem, joy_score: val })}
        />
      </div>


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
