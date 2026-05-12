import React from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../../components/infocard/infoCard.js'
import './homePage.css'
import { Link } from 'react-router-dom'

/**
 * A home page.
 *
 * @param {*} param0 user and login
 * @returns {Function} jsx element
 */
const HomePage = ({ user, onLogin }) => {
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
        <InfoCard title="Köppoäng" value="72" subtitle="den här månaden" />
      </section>

      <section className="home-mid">
        <InfoCard title="I önskelistan" value="5 produkter" />
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
    </div>
  )
}

HomePage.propTypes = {
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
}

export default HomePage
