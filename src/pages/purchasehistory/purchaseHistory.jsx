import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { getPurchasedProducts } from '../../repositories/productRepository'
import InfoCard from '../../components/infocard/infoCard'
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
      <InfoCard
        title="Totalt spenderat"
        value={`${totalSpent.toLocaleString('sv-SE')} kr`}
        variant="highlight"
      />
      {Object.entries(grouped).map(([month, items]) => (
        <div key={month} className="list-section">
          <h2>{month}</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Kategori</th>
                <th>Pris</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="product-row"
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  <td data-label="Produkt">{item.name}</td>
                  <td data-label="Kategori">{item.category || '-'}</td>
                  <td data-label="Pris">{item.new_price || '-'} kr</td>
                  <td data-label="Datum">
                    {new Date(item.purchased_at).toLocaleDateString('sv-SE')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {products.length === 0 && <p className="empty-state">Inga köp registrerade ännu.</p>}
    </div>
  )
}

PurchaseHistory.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
}

export default PurchaseHistory
