import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct, deleteProduct } from '../../repositories/productRepository'
import './itemDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 * Creates a view for item details.
 *
 * @returns {Function} JSX Element.
 */
const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [formData, setFormData] = useState(null)

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    getProductById(id)
      .then(setItem)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) return <p>Laddar...</p>
  if (!item) return <p>Produkten hittades inte.</p>

  /**
   * Toggle function for bought or not bought.
   */
  const toggleBought = async () => {
    const updated = await updateProduct(id, {
      purchased: !item.purchased,
      purchased_at: !item.purchased ? new Date().toISOString() : null,
    })
    setItem(updated)
  }

  /**
   * Handles click on edit button.
   */
  const handleEditClick = () => {
    setFormData({
      name: item.name,
      new_price: item.new_price,
      second_hand_price: item.second_hand_price,
      category: item.category,
      usage_frequency: item.usage_frequency,
      joy_score: item.joy_score,
    })
    setIsEditing(true)
  }

  /**
   * Handles update in the database.
   *
   * @param {event} e The update event
   */
  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const updated = await updateProduct(id, formData)
      setItem(updated)
      setIsEditing(false)
    } catch (err) {
      setUpdateError('Något gick fel vid uppdatering. Försök igen.')
    } finally {
      setIsUpdating(false)
    }
  }

  /**
   * Deletes a product from the database.
   */
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/purchaseplan')
    } catch (err) {
      setDeleteError('Något gick fel. Försök igen.')
      setIsDeleting(false)
      setConfirmDelete(false)
    }
  }

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        <button type="button" className="item-back" onClick={() => navigate('/purchaseplan')}>
          Tillbaka
        </button>

        <h1>{item.name}</h1>

        <form onSubmit={handleUpdate}>
          <div className="item-detail-grid">
            <div className="item-detail-row">
              <span className="item-label">Kategori</span>
              {isEditing ? (
                <input
                  className="item-value"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              ) : (
                <span className="item-value">{item.category}</span>
              )}
            </div>
            <div className="item-detail-row">
              <span className="item-label">Pris: nyköp</span>
              {isEditing ? (
                <input
                  className="item-value"
                  type="number"
                  value={formData.new_price}
                  onChange={(e) => setFormData({ ...formData, new_price: Number(e.target.value) })}
                />
              ) : (
                <span className="item-value">{item.new_price} kr</span>
              )}
            </div>
            <div className="item-detail-row">
              <span className="item-label">Pris: secondhand</span>
              {isEditing ? (
                <input
                  className="item-value"
                  type="number"
                  value={formData.second_hand_price}
                  onChange={(e) =>
                    setFormData({ ...formData, second_hand_price: Number(e.target.value) })
                  }
                />
              ) : (
                <span className="item-value">{item.second_hand_price} kr</span>
              )}
            </div>
            <div className="item-detail-row">
              <span className="item-label">Användningsfrekvens</span>
              {isEditing ? (
                <select
                  className="item-value"
                  value={formData.usage_frequency || ''}
                  onChange={(e) => setFormData({ ...formData, usage_frequency: e.target.value })}
                >
                  <option value="">Välj frekvens</option>
                  <option value="dagligen">Dagligen</option>
                  <option value="varje vecka">Varje vecka</option>
                  <option value="varje månad">Varje månad</option>
                  <option value="mer sällan">Mer sällan</option>
                </select>
              ) : (
                <span className="item-value">{item.usage_frequency || '–'}</span>
              )}
            </div>

            <div className="item-detail-row">
              <span className="item-label">Glädjefaktor</span>
              {isEditing ? (
                <input
                  className="item-value"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.joy_score || ''}
                  onChange={(e) => setFormData({ ...formData, joy_score: Number(e.target.value) })}
                />
              ) : (
                <span className="item-value">{item.joy_score ? `${item.joy_score}/10` : '–'}</span>
              )}
            </div>

            <div className="item-detail-row">
              <span className="item-label">Status</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={item.purchased} onChange={toggleBought} />
                <span className="toggle-slider" />
                <span className="toggle-label">{item.purchased ? 'Köpt' : 'Ej köpt'}</span>
              </label>
            </div>
          </div>

          {updateError && <p role="alert">{updateError}</p>}
          {deleteError && (
            <p className="delete-error" role="alert">
              {deleteError}
            </p>
          )}

          <div className="item-buttons">
            {isEditing ? (
              <>
                <button type="submit" className="btn-save" disabled={isUpdating}>
                  {isUpdating ? 'Sparar…' : 'Spara'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)} disabled={isUpdating}>
                  Avbryt
                </button>

              </>
            ) : (
              <button
                className="btn-icon btn-icon--edit"
                type="button"
                aria-label="Redigera produkt"
                onClick={handleEditClick}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}

            {!isEditing &&
              (!confirmDelete ? (
                <button
                  type="button"
                  className="btn-icon btn-icon--delete"
                  aria-label="Ta bort produkt"
                  onClick={() => {
                    setConfirmDelete(true)
                    setDeleteError(null)
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              ) : (
                <div className="delete-confirm">
                  <p>Är du säker på att du vill ta bort {item.name}?</p>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Tar bort…' : 'Ja, ta bort'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isDeleting}
                  >
                    Avbryt
                  </button>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemDetail
