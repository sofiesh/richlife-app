import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBudget } from '../../context/budgetContext.js'
import {
  addBudgetItem,
  updateBudgetItem,
  deleteBudgetItem,
} from '../../repositories/budgetRepository.js'
import './budget.css'

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
      setEditingId(null)
    } catch (err) {
      console.error('Kunde inte uppdatera:', err)
    }
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
            {editingId === i.id ? (
              <>
                <input
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                />
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                />
                <button onClick={() => handleEditSave(i.id)}>Spara</button>
                <button onClick={() => setEditingId(null)}>Avbryt</button>
              </>
            ) : (
              <>
                <span>{i.label}</span>
                <span>{i.amount.toLocaleString('sv-SE')} kr</span>
                <button onClick={() => handleEditClick(i)}>Ändra</button>
                <button onClick={() => handleDelete(i.id)}>✕</button>
              </>
            )}
          </div>
        ))}

        {addingType === 'income' && (
          <div className="budget-row">
            <input
              placeholder="Namn (t.ex. Lön)"
              value={addForm.label}
              onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
            />
            <input
              type="number"
              placeholder="Belopp"
              value={addForm.amount}
              onChange={(e) => setAddForm({ ...addForm, amount: e.target.value })}
            />
            <button onClick={handleAdd}>Spara</button>
            <button onClick={() => setAddingType(null)}>Avbryt</button>
          </div>
        )}
        <button
          onClick={() => {
            setAddingType('income')
            setEditingId(null)
          }}
        >
          + Lägg till inkomst
        </button>

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
                  {editingId === i.id ? (
                    <>
                      <input
                        value={editForm.label}
                        onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                      />
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                      />
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      >
                        {EXPENSE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleEditSave(i.id)}>Spara</button>
                      <button onClick={() => setEditingId(null)}>Avbryt</button>
                    </>
                  ) : (
                    <>
                      <span>{i.label}</span>
                      <span>{i.amount.toLocaleString('sv-SE')} kr</span>
                      <button onClick={() => handleEditClick(i)}>Ändra</button>
                      <button onClick={() => handleDelete(i.id)}>✕</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )
        })}

        {addingType === 'expense' && (
          <div className="budget-row">
            <input
              placeholder="Namn (t.ex. Hyra)"
              value={addForm.label}
              onChange={(e) => setAddForm({ ...addForm, label: e.target.value })}
            />
            <input
              type="number"
              placeholder="Belopp"
              value={addForm.amount}
              onChange={(e) => setAddForm({ ...addForm, amount: e.target.value })}
            />
            <select
              value={addForm.category}
              onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button onClick={handleAdd}>Spara</button>
            <button onClick={() => setAddingType(null)}>Avbryt</button>
          </div>
        )}
        <button
          onClick={() => {
            setAddingType('expense')
            setEditingId(null)
          }}
        >
          + Lägg till avdrag
        </button>

        <div className="budget-total">Totalt: {totalExpenses.toLocaleString('sv-SE')} kr</div>
      </section>

      {/* Safe to spend */}
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
