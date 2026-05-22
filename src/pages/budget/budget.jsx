import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../context/budgetContext'
import {
  addBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from '../../repositories/budgetRepository'
import './budget.css'
import BudgetAlerts from './budgetAlerts'
import BudgetExpenseSection from './budgetExpenseSection'
import BudgetSection from './budgetSection'
import { getBudgetAlerts } from '../../utils/budgetAlerts'

const EXPENSE_CATEGORIES = ['boende', 'sparande', 'prenumeration', 'transport', 'mat', 'övrigt']

/**
 * The budget management page.
 *
 * @returns {Function} JSX Element.
 */
const Budget = () => {
  // const [items, setItems] = useState([])
  const [addingType, setAddingType] = useState(null) // 'income' | 'expense' | null
  const [addForm, setAddForm] = useState({ label: '', amount: '', category: 'övrigt' })
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [alerts, setAlerts] = useState([])

  const navigate = useNavigate()
  const { items, setItems, income, expenses, totalIncome, totalExpenses, safeToSpend, userId } =
    useBudget()

  /**
   * Adds budget items to the database.
   */
  const handleAdd = async () => {
    try {
      const saved = await addBudgetItem(userId, {
        ...addForm,
        type: addingType,
        amount: Number(addForm.amount),
      })
      setItems([...items, saved])
      setAlerts(getBudgetAlerts(totalIncome, expenses))
      setAddingType(null)
      setAddForm({ label: '', amount: '', category: 'övrigt' })
    } catch (err) {
      console.error('Kunde inte spara:', err)
    }
  }

  /**
   * Removes budget items from the database if the user is authorized.
   *
   * @param {*} id the user id.
   */
  const handleDelete = async (id) => {
    try {
      await deleteBudgetItem(id)
      setItems(items.filter((i) => i.id !== id))
    } catch (err) {
      console.error('Kunde inte ta bort:', err)
    }
  }

  /**
   * Handles click on edit button.
   *
   * @param {object} item The item to be updated
   */
  const handleEditClick = (item) => {
    setEditingId(item.id)
    setEditForm({ label: item.label, amount: String(item.amount), category: item.category })
  }

  /**
   * Saves updates to the budget items.
   *
   * @param {*} id The budget item id.
   */
  const handleEditSave = async (id) => {
    try {
      const updated = await updateBudgetItem(id, {
        ...editForm,
        amount: Number(editForm.amount),
      })
      setItems(items.map((i) => (i.id === id ? updated : i)))
      setAlerts(getBudgetAlerts(totalIncome, expenses))
      setEditingId(null)
    } catch (err) {
      console.error('Kunde inte uppdatera:', err)
    }
  }

  return (
    <div className="budget-page">
      <button type="button" className="item-back" onClick={() => navigate('/')}>
        Tillbaka
      </button>
      <h1>Budget</h1>

      {/* Inkomster */}
      <BudgetSection
        title="Inkomster"
        items={income}
        type="income"
        total={totalIncome}
        editingId={editingId}
        editForm={editForm}
        addingType={addingType}
        addForm={addForm}
        onEditChange={setEditForm}
        onAddChange={setAddForm}
        onEditClick={handleEditClick}
        onEditSave={handleEditSave}
        onEditCancel={() => setEditingId(null)}
        onDelete={handleDelete}
        onAddSave={handleAdd}
        onAddStart={() => {
          setAddingType('income')
          setEditingId(null)
        }}
        onAddCancel={() => setAddingType(null)}
      />

      {/* Utgifter */}
      <BudgetExpenseSection
        items={expenses}
        categories={EXPENSE_CATEGORIES}
        total={totalExpenses}
        editingId={editingId}
        editForm={editForm}
        addingType={addingType}
        addForm={addForm}
        onEditChange={setEditForm}
        onAddChange={setAddForm}
        onEditClick={handleEditClick}
        onEditSave={handleEditSave}
        onEditCancel={() => setEditingId(null)}
        onDelete={handleDelete}
        onAddSave={handleAdd}
        onAddStart={() => {
          setAddingType('expense')
          setEditingId(null)
        }}
        onAddCancel={() => setAddingType(null)}
      />

      {/* Safe to spend */}
      <BudgetAlerts alerts={alerts} />
      <section className="budget-result">
        <span>Safe to spend</span>
        <span className={safeToSpend >= 0 ? 'positive' : 'negative'}>
          {safeToSpend.toLocaleString('sv-SE')} kr
        </span>
      </section>
    </div>
  )
}

export default Budget
