import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { purchaseItemsMock } from '../../mockData/purchaseItemsMock'
import './itemDetail.css'

/**
 * Creates a view for item details.
 *
 * @returns {Function} JSX Element.
 */
const ItemDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = purchaseItemsMock.find((i) => String(i.id) === id)
  const [bought, setBought] = useState(item ? item.bought : false)

  if (!item) return <p>Produkten hittades inte.</p>

  return (
    <div>
      <div className="item-detail-container">
        <button className="item-back" onClick={() => navigate('/dashboard')}>
          Tillbaka
        </button>

        <h1>{item.name}</h1>

        <div className="item-detail-grid">
          <span className="item-label">Kategori</span>
          <span className="item-value">{item.category}</span>

          <span className="item-label">Pris</span>
          <span className="item-value">{item.price} kr</span>

          <span className="item-label">Prioritet</span>
          <span className="item-value">{item.priority}</span>

          <span className="item-label">Sparat</span>
          <span className="item-value">{item.savedAmount} kr</span>

          <span className="item-label">Status</span>
          <span className="item-value">{bought ? 'Köpt' : 'Ej köpt'}</span>
        </div>
        <div className="item-buttons">
          <button onClick={() => setBought((prev) => !prev)}>
            {bought ? 'Markera som ej köpt' : 'Markera som köpt'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
