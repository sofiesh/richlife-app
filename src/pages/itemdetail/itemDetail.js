import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct, deleteProduct } from '../../repositories/productRepository'
import './itemDetail.css'

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
    const updated = await updateProduct(id, { is_bought: !item.is_bought })
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
      priority: item.priority,
      value_rating: item.value_rating,
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
              <span className="item-label">Prioritet</span>
              {isEditing ? (
                <input
                  className="item-value"
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                />
              ) : (
                <span className="item-value">{item.priority}</span>
              )}
            </div>
            <div className="item-detail-row">
              <span className="item-label">Värdering</span>
              {isEditing ? (
                <input
                  className="item-value"
                  type="number"
                  value={formData.value_rating}
                  onChange={(e) =>
                    setFormData({ ...formData, value_rating: Number(e.target.value) })
                  }
                />
              ) : (
                <span className="item-value">{item.value_rating}</span>
              )}
            </div>
            <div className="item-detail-row">
              <span className="item-label">Status</span>
              <span className={`item-status-badge ${item.is_bought ? 'bought' : 'not-bought'}`}>
                {item.is_bought ? 'Köpt' : 'Ej köpt'}
              </span>
            </div>
          </div>

          {updateError && <p role="alert">{updateError}</p>}
          {deleteError && (
            <p className="delete-error" role="alert">
              {deleteError}
            </p>
          )}

          <div className="item-buttons">
            <button type="button" onClick={toggleBought}>
              {item.is_bought ? 'Markera som ej köpt' : 'Markera som köpt'}
            </button>

            {isEditing ? (
              <>
                <button type="submit" disabled={isUpdating}>
                  {isUpdating ? 'Sparar…' : 'Spara'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} disabled={isUpdating}>
                  Avbryt
                </button>
              </>
            ) : (
              <button type="button" className="btn-update" onClick={handleEditClick}>
                Ändra produkt
              </button>
            )}

            {!isEditing &&
              (!confirmDelete ? (
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => {
                    setConfirmDelete(true)
                    setDeleteError(null)
                  }}
                >
                  Ta bort produkt
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
