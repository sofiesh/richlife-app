import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../../components/infocard/infoCard.js'
import { getProducts } from '../../repositories/productRepository.js'
import { countProducts, sumNewPrice } from '../../utils/productUtils.js'
import './homePage.css'
import { Link } from 'react-router-dom'

/**
 * A home page.
 *
 * @param {*} param0 user and login
 * @returns {Function} jsx element
 */
const HomePage = ({ user, onLogin }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!user) return
    getProducts(user.uid)
      .then((all) => setProducts(all.filter((p) => !p.purchased)))
      .catch((err) => console.error('Supabase error: ', err))
  }, [user])

  if (!user) {
    return (
      <div className="landing">
        <h1>Susbud</h1>
        <p className="tagline">Talk about your finances</p>
        <button className="btn-cta" onClick={onLogin}>
          Kom igång
        </button>
      </div>
    )
  }

  return (
    <div className="home-dashboard">
      <section className="home-top">
        <InfoCard
          title="Safe to spend"
          value="3 200 kr"
          subtitle="av 5 000 kr budget"
          variant="highlight"
        />
        <Link to="/purchaseplan" className="card-link">
          <InfoCard
            title="I önskelistan"
            value={`${countProducts(products)} produkter`}
            subtitle={`Totalt värde: ${sumNewPrice(products).toLocaleString('sv-SE')} kr`}
          />
        </Link>
        <InfoCard title="Köppoäng" value="72" subtitle="den här månaden" />
        <InfoCard title="Insikter" value="2 alerts" variant="warning" />
      </section>

      <section className="home-nav">
        <Link to="/purchaseplan" className="home-nav__card">
          <span className="home-nav__label">Köpkollen</span>
          <span className="home-nav__arrow">→</span>
        </Link>
      </section>

      <section className="home-nav">
        <Link to="/purchasehistory" className="home-nav__card">
          <span className="home-nav__label">Köphistorik</span>
          <span className="home-nav__arrow">→</span>
        </Link>
      </section>

      <section className="home-nav">
        <Link to="/budget" className="home-nav__card">
          <span className="home-nav__label">Min budget</span>
          <span className="home-nav__arrow">→</span>
        </Link>
      </section>
    </div>
  )
}

HomePage.propTypes = {
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
}

export default HomePage
