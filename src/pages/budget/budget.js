import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
  getBudgetItems,
  addBudgetItem,
  deleteBudgetItem,
} from '../../repositories/budgetRepository.js'
import './budget.css'

const EXPENSE_CATEGORIES = ['boende', 'sparande', 'prenumeration', 'transport', 'mat', 'övrigt']

/**
 * The budget management page.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
const Budget = ({ user }) => {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({
    label: '',
    amount: '',
    type: 'expense',
    category: 'övrigt',
  })
  const navigate = useNavigate()

  useEffect(() => {
    getBudgetItems(user.uid)
      .then(setItems)
      .catch((err) => console.error('Budget error:', err))
  }, [user.uid])

  const income = items.filter((i) => i.type === 'income')
  const expenses = items.filter((i) => i.type === 'expense')
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0)
  const totalExpenses = expenses.reduce((sum, i) => sum + i.amount, 0)
  const safeToSpend = totalIncome - totalExpenses

  /**
   * Adds budget items to the database.
   */
  const handleAdd = async () => {
    const saved = await addBudgetItem(user.uid, {
      ...newItem,
      amount: Number(newItem.amount),
    })
    setItems([...items, saved])
    setNewItem({ label: '', amount: '', type: 'expense', category: 'övrigt' })
    setShowForm(false)
  }

  /**
   * Removes budget items from the database if the user is authorized.
   *
   * @param {*} id the user id.
   */
  const handleDelete = async (id) => {
    await deleteBudgetItem(id)
    setItems(items.filter((i) => i.id !== id))
  }

  return (
    <div className="budget">
      <button type="button" className="item-back" onClick={() => navigate('/')}>
        Tillbaka
      </button>
      <h1>Budget</h1>

      {/* Inkomster */}
      <section className="budget-section">
        <h2>Inkomster</h2>
        {income.map((i) => (
          <div key={i.id} className="budget-row">
            <span>{i.label}</span>
            <span>{i.amount.toLocaleString('sv-SE')} kr</span>
            <button onClick={() => handleDelete(i.id)}>✕</button>
          </div>
        ))}
        <div className="budget-total">Totalt: {totalIncome.toLocaleString('sv-SE')} kr</div>
      </section>

      {/* Avdrag */}
      <section className="budget-section">
        <h2>Avdrag</h2>
        {EXPENSE_CATEGORIES.map((cat) => {
          const catItems = expenses.filter((i) => i.category === cat)
          if (catItems.length === 0) return null
          return (
            <div key={cat}>
              <h3 className="budget-category">{cat}</h3>
              {catItems.map((i) => (
                <div key={i.id} className="budget-row">
                  <span>{i.label}</span>
                  <span>{i.amount.toLocaleString('sv-SE')} kr</span>
                  <button onClick={() => handleDelete(i.id)}>✕</button>
                </div>
              ))}
            </div>
          )
        })}
        <div className="budget-total">Totalt: {totalExpenses.toLocaleString('sv-SE')} kr</div>
      </section>

      {/* Safe to spend */}
      <section className="budget-result">
        <span>Safe to spend</span>
        <span className={safeToSpend >= 0 ? 'positive' : 'negative'}>
          {safeToSpend.toLocaleString('sv-SE')} kr
        </span>
      </section>

      {/* Formulär */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Avbryt' : '+ Lägg till post'}
      </button>

      {showForm && (
        <div className="budget-form">
          <input
            placeholder="Namn (t.ex. Hyra)"
            value={newItem.label}
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
          />
          <input
            type="number"
            placeholder="Belopp"
            value={newItem.amount}
            onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
          />
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          >
            <option value="income">Inkomst</option>
            <option value="expense">Avdrag</option>
          </select>
          {newItem.type === 'expense' && (
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleAdd}>Spara</button>
        </div>
      )}
    </div>
  )
}

Budget.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
}

export default Budget
