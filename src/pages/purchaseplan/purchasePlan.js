// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './purchasePlan.css'
import PurchasePlanForm from '../../components/purchaseplan/purchasePlanForm.js'
import { getProducts, addProduct } from '../../repositories/productRepository.js'
import Stars from '../../components/rankingstars/rankingStar.js'
import { calculateStarScore } from '../../assets/calculateStarScore.js'
import Button from '../../components/button/button.js'

/**
 * Landing page for logged in users.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
const PurchasePlan = ({ user }) => {
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts(user.uid)
      .then(setProducts)
      .catch((err) => console.error('Supabase error: ', err))
  }, [user.uid])

  const rankedProducts = [...products]
    .map((p) => ({
      ...p,
      score: calculateStarScore(p),
    }))
    .sort((a, b) => b.score - a.score)

  /**
   * Adds a new product and updates product list.
   *
   * @param {Function} item - The product to be added to an owners list
   */
  const handleAddItem = async (item) => {
    const saved = await addProduct(user.uid, item)
    setProducts([...products, saved])
    setShowForm(false)
  }

  const bestProduct = rankedProducts[0]

  return (
    <div className="purchaseplan">
      <h1>Köpkollen</h1>
      <Button onClick={() => setShowForm(!showForm)} variant="outline">
        {showForm ? 'Avbryt' : 'Lägg till produkt'}
      </Button>

      {showForm && <PurchasePlanForm onAdd={handleAddItem} />}

      {/* KPI-boxar */}
      <div className="stats">
        <div className="card">I önskelistan</div>
        <div className="card">
          Viktigast köp nu
          {bestProduct && (
            <div style={{ marginTop: 8, fontSize: '14px', color: '#555' }}>
              {bestProduct.name} ({bestProduct.price} kr)
            </div>
          )}
        </div>
        <div className="card">Totalt spenderat</div>
        <div className="card">Köppoäng</div>
      </div>

      {/* Toggle */}
      {/* <div className="toggle">
                <button onClick={() => setShowBought(false)}>
                    Ej köpta ({notBought.length})
                </button>

                <button onClick={() => setShowBought(true)}>
                    Köpta ({bought.length})
                </button>
            </div> */}

      {/* Lista */}
      <div className="list">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '8px' }}>Produkt</th>
                <th style={{ padding: '8px' }}>Kategori</th>
                <th style={{ padding: '8px' }}>Pris: nyköp</th>
                <th style={{ padding: '8px' }}>Pris: secondhand</th>
                <th style={{ padding: '8px' }}>Värdering</th>
              </tr>
            </thead>

            <tbody>
              {rankedProducts.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/items/${item.id}`)}
                  style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
                >
                  <td style={{ padding: '8px' }}>{item.name}</td>
                  <td style={{ padding: '8px' }}>{item.category || 'Unknown'}</td>
                  <td style={{ padding: '8px' }}>{item.new_price || 'Unknown'}</td>
                  <td style={{ padding: '8px' }}>{item.second_hand_price || 'Unknown'}</td>
                  <td style={{ padding: '8px' }}>{item.priority || 'Unknown'}</td>
                  <td>
                    <Stars
                      value={item.priority}
                      onChange={(newValue) => {
                        console.log(item.id, newValue)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

PurchasePlan.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
}

export default PurchasePlan
