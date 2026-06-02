import React from 'react'
import PropTypes from 'prop-types'
import BudgetRow from './budgetRow'
import { formatCurrency } from '../../utils/formatUtils'

/**
 * Expense section grouped by category.
 *
 * @param {object} props - Component props.
 * @param {object[]} props.items - List of expense items.
 * @param {string[]} props.categories - List of expense categories.
 * @param {number} props.total - Total expenses.
 * @param {string|null} props.editingId - Id of item currently being edited.
 * @param {object} props.editForm - Current edit form state.
 * @param {string|null} props.addingType - Which type is being added, or null.
 * @param {object} props.addForm - Current add form state.
 * @param {Function} props.onEditChange - Handler for edit form changes.
 * @param {Function} props.onAddChange - Handler for add form changes.
 * @param {Function} props.onEditClick - Handler for clicking edit on an item.
 * @param {Function} props.onEditSave - Handler for saving an edit.
 * @param {Function} props.onEditCancel - Handler for cancelling an edit.
 * @param {Function} props.onDelete - Handler for deleting an item.
 * @param {Function} props.onAddSave - Handler for saving a new item.
 * @param {Function} props.onAddStart - Handler for starting to add.
 * @param {Function} props.onAddCancel - Handler for cancelling add.
 * @returns {Function} JSX Element.
 */
const BudgetExpenseSection = ({
  items,
  categories,
  total,
  editingId,
  editForm,
  addingType,
  addForm,
  onEditChange,
  onAddChange,
  onEditClick,
  onEditSave,
  onEditCancel,
  onDelete,
  onAddSave,
  onAddStart,
  onAddCancel,
}) => (
  <section className="budget-section">
    <h2>Utgifter</h2>

    {categories.map((cat) => {
      const catItems = items.filter((i) => i.category === cat)
      if (catItems.length === 0) return null
      return (
        <div key={cat}>
          <h3 className="budget-category">{cat}</h3>
          {catItems.map((i) => (
            <BudgetRow
              key={i.id}
              item={i}
              isEditing={editingId === i.id}
              editForm={editForm}
              categories={categories}
              onChange={onEditChange}
              onSave={() => onEditSave(i.id)}
              onCancel={onEditCancel}
              onEdit={() => onEditClick(i)}
              onDelete={() => onDelete(i.id)}
            />
          ))}
        </div>
      )
    })}

    {addingType === 'expense' && (
      <div className="budget-add-form">
        <input
          className="budget-input"
          placeholder="Namn"
          value={addForm.label}
          onChange={(e) => onAddChange({ ...addForm, label: e.target.value })}
        />
        <input
          className="budget-input"
          type="number"
          placeholder="Belopp"
          value={addForm.amount}
          onChange={(e) => onAddChange({ ...addForm, amount: e.target.value })}
        />
        <select
          className="budget-input"
          value={addForm.category}
          onChange={(e) => onAddChange({ ...addForm, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="budget-row-actions">
          <button className="btn-primary" onClick={onAddSave}>
            Spara
          </button>
          <button onClick={onAddCancel}>Avbryt</button>
        </div>
      </div>
    )}

    <button className="budget-add-btn" onClick={onAddStart}>
      + Lägg till utgift
    </button>

    <div className="budget-total">Totalt: {formatCurrency(total)} kr</div>
  </section>
)

BudgetExpenseSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  total: PropTypes.number.isRequired,
  editingId: PropTypes.string,
  editForm: PropTypes.object,
  addingType: PropTypes.string,
  addForm: PropTypes.object.isRequired,
  onEditChange: PropTypes.func.isRequired,
  onAddChange: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEditSave: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddSave: PropTypes.func.isRequired,
  onAddStart: PropTypes.func.isRequired,
  onAddCancel: PropTypes.func.isRequired,
}

export default BudgetExpenseSection
