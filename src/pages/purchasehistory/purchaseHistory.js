import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { getPurchasedProducts } from '../../repositories/productRepository.js'
import './purchaseHistory.css'

/**
 * The purchase history page.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
const PurchaseHistory = ({ user }) => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getPurchasedProducts(user.uid)
      .then(setProducts)
      .catch((err) => console.error('Supabase error: ', err))
  }, [user.uid])

  const grouped = products.reduce((acc, p) => {
    const key = new Date(p.purchased_at).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
    })
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  const totalSpent = products.reduce((sum, p) => sum + (p.new_price || 0), 0)

  return (
    <div className="purchasehistory">
      <button type="button" className="item-back" onClick={() => navigate('/')}>
        Tillbaka
      </button>
      <h1>Köphistorik</h1>
      <p>Totalt spenderat: {totalSpent.toLocaleString('sv-SE')} kr</p>

      {Object.entries(grouped).map(([month, items]) => (
        <div key={month}>
          <h2>{month}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Produkt</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Kategori</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Pris</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Datum</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/items/${item.id}`)}
                  style={{ borderBottom: '1px solid #ccc', cursor: 'pointer' }}
                >
                  <td style={{ padding: '8px' }}>{item.name}</td>
                  <td style={{ padding: '8px' }}>{item.category || '-'}</td>
                  <td style={{ padding: '8px' }}>{item.new_price || '-'} kr</td>
                  <td style={{ padding: '8px' }}>
                    {new Date(item.purchased_at).toLocaleDateString('sv-SE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {products.length === 0 && <p>Inga köp registrerade ännu.</p>}
    </div>
  )
}

PurchaseHistory.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
}

export default PurchaseHistory
