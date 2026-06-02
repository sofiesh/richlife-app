import React from 'react'
import PropTypes from 'prop-types'
import BudgetRow from './budgetRow'
import { formatCurrency } from '../../utils/formatUtils'

/**
 * A budget section displaying a list of items with add and edit functionality.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - Section heading.
 * @param {object[]} props.items - List of budget items.
 * @param {string} props.type - 'income' or 'expense'.
 * @param {number} props.total - Total amount for this section.
 * @param {string|null} props.editingId - Id of item currently being edited.
 * @param {object} props.editForm - Current edit form state.
 * @param {string|null} props.addingType - Which type is being added, or null.
 * @param {object} props.addForm - Current add form state.
 * @param {string[]} [props.categories] - Optional expense categories.
 * @param {Function} props.onEditChange - Handler for edit form changes.
 * @param {Function} props.onAddChange - Handler for add form changes.
 * @param {Function} props.onEditClick - Handler for clicking edit on an item.
 * @param {Function} props.onEditSave - Handler for saving an edit.
 * @param {Function} props.onEditCancel - Handler for cancelling an edit.
 * @param {Function} props.onDelete - Handler for deleting an item.
 * @param {Function} props.onAddSave - Handler for saving a new item.
 * @param {Function} props.onAddStart - Handler for starting to add an item.
 * @param {Function} props.onAddCancel - Handler for cancelling add.
 * @returns {Function} JSX Element.
 */
const BudgetSection = ({
  title,
  items,
  type,
  total,
  editingId,
  editForm,
  addingType,
  addForm,
  categories,
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
    <h2>{title}</h2>

    {items.map((i) => (
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

    {addingType === type && (
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
        {categories && (
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
        )}
        <div className="budget-row-actions">
          <button className="btn-primary" onClick={onAddSave}>
            Spara
          </button>
          <button onClick={onAddCancel}>Avbryt</button>
        </div>
      </div>
    )}

    <button className="budget-add-btn" onClick={onAddStart}>
      + Lägg till {type === 'income' ? 'inkomst' : 'utgift'}
    </button>

    <div className="budget-total">Totalt: {formatCurrency(total)} kr
    </div>
  </section>
)

BudgetSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  editingId: PropTypes.string,
  editForm: PropTypes.object,
  addingType: PropTypes.string,
  addForm: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
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

export default BudgetSection
