// import React, { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './purchaseplan.css'
import { purchaseItemsMock } from '../../mockData/purchaseItemsMock.js'
import Stars from '../../components/rankingstars/rankingStar.js'
import { calculateStarScore } from '../../assets/calculateStarScore.js'
import Button from '../../components/button/button.js'

/**
 * Landing page for logged in users.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
const Dashboard = ({ user }) => {
  const navigate = useNavigate()
  const products = purchaseItemsMock
  //   const notBought = products.filter(p => !p.bought)
  //   const bought = products.filter(p => p.bought)

  // const [showBought, setShowBought] = useState(false)
  // const visibleProducts = showBought ? bought : notBought

  const rankedProducts = [...products]
    .map((p) => ({
      ...p,
      score: calculateStarScore(p),
    }))
    .sort((a, b) => b.score - a.score)

  const bestProduct = rankedProducts[0]

  return (
    <div className="dashboard">
      <h1>Köpkollen</h1>
      <Button className="add-product" onClick={() => {}} variant="outline">
        Lägg till produkt
      </Button>

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
                <th style={{ padding: '8px' }}>Pris</th>
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
                  <td style={{ padding: '8px' }}>{item.price || 'Unknown'}</td>
                  <td style={{ padding: '8px' }}>{item.valueRating || 'Unknown'}</td>
                  <td>
                    <Stars
                      value={item.valueRating}
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

Dashboard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }),
}

export default Dashboard
