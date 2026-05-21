import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 * A single row in the budget list.
 *
 * @param {object} props - Component props.
 * @param {object} props.item - The budget item.
 * @param {boolean} props.isEditing - Whether this row is in edit mode.
 * @param {object} props.editForm - Current edit form values.
 * @param {string[]} [props.categories] - Optional categories for expenses.
 * @param {Function} props.onChange - Handler for form field changes.
 * @param {Function} props.onSave - Handler for saving edits.
 * @param {Function} props.onCancel - Handler for cancelling edits.
 * @param {Function} props.onEdit - Handler for entering edit mode.
 * @param {Function} props.onDelete - Handler for deleting the item.
 * @returns {Function} JSX Element.
 */
const BudgetRow = ({
  item,
  isEditing,
  editForm,
  categories,
  onChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) => {
  if (isEditing) {
    return (
      <div className="budget-item-row">
        <input
          className="budget-input"
          value={editForm.label}
          onChange={(e) => onChange({ ...editForm, label: e.target.value })}
        />
        <input
          className="budget-input"
          type="number"
          value={editForm.amount}
          onChange={(e) => onChange({ ...editForm, amount: e.target.value })}
        />
        {categories && (
          <select
            className="budget-input"
            value={editForm.category}
            onChange={(e) => onChange({ ...editForm, category: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        <div className="budget-row-actions">
          <button className="btn-primary" onClick={onSave}>
            Spara
          </button>
          <button onClick={onCancel}>Avbryt</button>
        </div>
      </div>
    )
  }

  return (
    <div className="budget-item-row">
      <span className="budget-item-label">{item.label}</span>
      <span className="budget-item-value">{item.amount.toLocaleString('sv-SE')} kr</span>
      <div className="budget-row-actions">
        <button className="btn-icon btn-icon--edit" aria-label="Redigera" onClick={onEdit}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="btn-icon btn-icon--delete" aria-label="Ta bort" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
}

BudgetRow.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editForm: PropTypes.shape({
    label: PropTypes.string,
    amount: PropTypes.string,
    category: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BudgetRow
