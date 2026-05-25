// import React, { useState } from 'react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './purchasePlan.css'
import Button from '../../components/button/button'
import { calculateStarScore } from '../../utils/calculateStarScore'
import { getProducts, addProduct } from '../../repositories/productRepository'
import { countProducts, sumNewPrice, getBestProduct } from '../../utils/productUtils'
import InfoCard from '../../components/infocard/infoCard'
import PurchasePlanForm from '../../components/purchaseplan/purchasePlanForm'
import Stars from '../../components/rankingstars/rankingStar'

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

      <div className="purchaseplan-header">
        <h1>Köpkollen</h1>
        <Button onClick={() => setShowForm(!showForm)} variant="outline">
          {showForm ? 'Avbryt' : 'Lägg till produkt'}
        </Button>
      </div>

      {showForm && <PurchasePlanForm onAdd={handleAddItem} />}


      {/* KPI-boxar */}
      <div className="purchaseplan-stats">
        <div className="card-link">
          <InfoCard
            title="I önskelistan"
            value={`${countProducts(products)} produkter`}
            subtitle={`Totalt värde: ${sumNewPrice(products).toLocaleString('sv-SE')} kr`}
          />
        </div>
        <div className="card-link">
          <InfoCard
            title="Viktigaste köp nu"
            value={bestProduct ? bestProduct.name : '–'}
            subtitle={bestProduct ? `${bestProduct.new_price?.toLocaleString('sv-SE')} kr` : undefined}
          />
        </div>
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
      <div className="list-section">
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
                    <Stars value={item.starValue} onChange={() => { }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}

PurchasePlan.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
}

export default PurchasePlan
