import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import InfoCard from '../../components/infocard/infoCard'
import { getProducts } from '../../repositories/productRepository'
import { getBudgetAlerts } from '../../utils/budgetAlerts'
import { countProducts, sumNewPrice } from '../../utils/productUtils'
import { useBudget } from '../../context/budgetContext'
import './homePage.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck, faChartLine, faWallet } from '@fortawesome/free-solid-svg-icons'

/**
 * A home page.
 *
 * @param {*} param0 user and login
 * @returns {Function} jsx element
 */
const HomePage = ({ user, onLogin, onRegister }) => {
  const { safeToSpend, totalIncome, expenses } = useBudget()
  const [products, setProducts] = useState([])

  const alertCount = getBudgetAlerts(totalIncome, expenses).length

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
        <button className="btn-cta" onClick={onRegister}>
          Kom igång
        </button>
      </div>
    )
  }

  return (
    <div className="home-dashboard">
      <section className="home-top">
        <Link to="/budget" className="card-link">
          <InfoCard
            title="Safe to spend"
            value={`${safeToSpend.toLocaleString('sv-SE')} kr`}
            subtitle="kvar den här månaden"
            variant="highlight"
          />
        </Link>

        {/* Hidden for test */}
        <div className="home-hidden">
          <Link to="/purchaseplan" className="card-link">
            <InfoCard
              title="I önskelistan"
              value={`${countProducts(products)} produkter`}
              subtitle={`Totalt värde: ${sumNewPrice(products).toLocaleString('sv-SE')} kr`}
            />
          </Link>
          <InfoCard title="Köppoäng" value="72" subtitle="den här månaden" />
        </div>

        <Link to="/insights" className="card-link">
          <InfoCard
            title="Insikter"
            value={alertCount === 0 ? 'Inga varningar' : `${alertCount} varningar`}
            variant={alertCount === 0 ? 'default' : 'warning'}
          />
        </Link>
      </section>

      <section className="home-nav">
        <Link to="/purchaseplan" className="home-nav__card">
          <FontAwesomeIcon icon={faListCheck}/>
          <span className="home-nav__label">Önskelista</span>
        </Link>
      </section>

      <section className="home-nav">
        <Link to="/purchasehistory" className="home-nav__card">
          <FontAwesomeIcon icon={faChartLine}/>
          <span className="home-nav__label">Köphistorik</span>
        </Link>
      </section>

      <section className="home-nav">
        <Link to="/budget" className="home-nav__card">
          <FontAwesomeIcon icon={faWallet}/>
          <span className="home-nav__label">Min budget</span>
        </Link>
      </section>
    </div>
  )
}

HomePage.propTypes = {
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
}

export default HomePage
