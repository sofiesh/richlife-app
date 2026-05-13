// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './purchasePlan.css'
import Button from '../../components/button/button.js'
import { calculateStarScore } from '../../assets/calculateStarScore.js'
import { getProducts, addProduct } from '../../repositories/productRepository.js'
import InfoCard from '../../components/infocard/infoCard.js'
import PurchasePlanForm from '../../components/purchaseplan/purchasePlanForm.js'
import Stars from '../../components/rankingstars/rankingStar.js'

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
      .then((all) => setProducts(all.filter((p) => !p.purchased)))
      .catch((err) => console.error('Supabase error: ', err))
  }, [user.uid])

  const rankedProducts = [...products]
    .map((p) => ({
      ...p,
      score: calculateStarScore(p),
    }))
    .sort((a, b) => b.score - a.score)

  const scores = rankedProducts.map((p) => p.score)
  const min = Math.min(...scores)
  const max = Math.max(...scores)

  const normalizedProducts = rankedProducts.map((p) => ({
    ...p,
    starValue:
      max === min
        ? 3 // alla lika → alla får mitt
        : Math.round(1 + ((p.score - min) / (max - min)) * 4),
  }))

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
      <button type="button" className="item-back" onClick={() => navigate('/')}>
        Tillbaka
      </button>
      <h1>Köpkollen</h1>
      <Button onClick={() => setShowForm(!showForm)} variant="outline">
        {showForm ? 'Avbryt' : 'Lägg till produkt'}
      </Button>

      {showForm && <PurchasePlanForm onAdd={handleAddItem} />}

      {/* KPI-boxar */}
      <InfoCard title="I önskelistan" value="15 000 kr" subtitle="av 5 000 kr budget" />

      <InfoCard
        title="Viktigaste köp nu"
        {...(bestProduct && (
          <div style={{ marginTop: 8, fontSize: '14px', color: '#555' }}>
            {bestProduct.name} ({bestProduct.price} kr)
          </div>
        ))}
      />

      <InfoCard
        title="Totalt spenderat nuvarande månad"
        value="15 000 kr"
        subtitle="av 5 000 kr budget"
      />

      <InfoCard title="Köppoäng" value="3/5" subtitle="Se analys och tips" variant="highlight" />

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
          <table className="product-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Kategori</th>
                <th>Pris: nyköp</th>
                <th>Pris: secondhand</th>
                <th>Värdering</th>
                <th>Prioritet</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {normalizedProducts.map((item) => (
                <tr
                  key={item.id}
                  className="product-row"
                  onClick={() => navigate(`/items/${item.id}`)}
                >
                  <td data-label="Produkt">{item.name}</td>
                  <td data-label="Kategori">{item.category || '-'}</td>
                  <td data-label="Nypris">{item.new_price || '-'} kr</td>
                  <td data-label="Andrahandspris">{item.second_hand_price || '-'} kr</td>
                  <td data-label="Value-rating">{item.value_rating || '-'}</td>
                  <td data-label="Priority">{item.priority || '-'}</td>
                  <td data-label="Score">
                    <Stars value={item.starValue} onChange={() => {}} />
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
