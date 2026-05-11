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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    getProductById(id).then(setItem).catch(console.error)
  }, [id])

  if (!item) return <p>Produkten hittades inte.</p>

  /**
   * Toggle function for bought or not bought.
   */
  const toggleBought = async () => {
    const updated = await updateProduct(id, { is_bought: !item.is_bought })
    setItem(updated)
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
        <button className="item-back" onClick={() => navigate('/purchaseplan')}>
          Tillbaka
        </button>

        <h1>{item.name}</h1>

        <div className="item-detail-grid">
          <div className="item-detail-row">
            <span className="item-label">Kategori</span>
            <span className="item-value">{item.category}</span>
          </div>
          <div className="item-detail-row">
            <span className="item-label">Pris: nyköp</span>
            <span className="item-value">{item.new_price} kr</span>
          </div>
          <div className="item-detail-row">
            <span className="item-label">Pris: secondhand</span>
            <span className="item-value">{item.second_hand_price} kr</span>
          </div>
          <div className="item-detail-row">
            <span className="item-label">Prioritet</span>
            <span className="item-value">{item.priority}</span>
          </div>
          <div className="item-detail-row">
            <span className="item-label">Status</span>
            <span className={`item-status-badge ${item.is_bought ? 'bought' : 'not-bought'}`}>
              {item.is_bought ? 'Köpt' : 'Ej köpt'}
            </span>
          </div>
        </div>

        {deleteError && (
          <p className="delete-error" role="alert">
            {deleteError}
          </p>
        )}
        <div className="item-buttons">
          <button onClick={toggleBought}>
            {item.is_bought ? 'Markera som ej köpt' : 'Markera som köpt'}
          </button>

          {!confirmDelete ? (
            <button
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
              <button className="btn-delete" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Tar bort…' : 'Ja, ta bort'}
              </button>
              <button onClick={() => setConfirmDelete(false)} disabled={isDeleting}>
                Avbryt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
