import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import logo from '../../Susbud_logo.png'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

/**
 * Top navigation bar component.
 *
 * @param {object} props - Component properties.
 * @param {object} props.user - Authenticated user object, or null.
 * @param {Function} props.onHome - Navigate to home.
 * @param {Function} props.onPurchasePlan - Navigate to purchase plan.
 * @param {Function} props.onPurchaseHistory - Navigate to purchase history.
 * @param {Function} props.onBudget - Navigate to budget.
 * @param {Function} props.onLogin - Navigate to login.
 * @param {Function} props.onRegister - Navigate to register.
 * @param {Function} props.onProfile - Navigate to user profile.
 * @param {Function} props.onLogout - Sign out user.
 * @returns {Function} JSX Element.
 */
const Navbar = ({
  user,
  onHome,
  onPurchasePlan,
  onPurchaseHistory,
  onBudget,
  onLogin,
  onRegister,
  onProfile,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  /**
   * Closes the navigation menu.
   *
   * @returns {void}
   */
  const close = () => setMenuOpen(false)

  useEffect(() => {
    /**
     * Handles clicks outside the navigation menu to close it.
     *
     * @param {*} e - Click event object.
     * @returns {void}
     */
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.navbar')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  return (
    <nav className="navbar">
      <button className="navbar-brand" onClick={onHome}>
        <img src={logo} alt="Susbud" className="navbar-logo" />
        <span className="navbar-title">Susbud</span>
      </button>

      <div className={`navbar-actions${menuOpen ? ' open' : ''}`} onClick={close}>
        {user ? (
          <>
            <button
              className="nav-btn nav-btn--outline2"
              onClick={() => {
                onHome()
                close()
              }}
            >
              <span className="menu-label">Startsida</span>
            </button>

            <button
              className="nav-btn nav-btn--outline2"
              onClick={() => {
                onPurchasePlan()
                close()
              }}
            >
              <span className="menu-label">Köpkollen</span>
            </button>

            <button
              className="nav-btn nav-btn--outline2"
              onClick={() => {
                onPurchaseHistory()
                close()
              }}
            >
              <span className="menu-label">Historik</span>
            </button>

            <button
              className="nav-btn nav-btn--outline2"
              onClick={() => {
                onBudget()
                close()
              }}
            >
              <span className="menu-label">Budget</span>
            </button>

            <button
              className="nav-btn nav-btn--outline"
              onClick={() => {
                onLogout()
                close()
              }}
            >
              <span className="menu-label">Logga ut</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-btn nav-btn--text"
              onClick={() => {
                onLogin()
                close()
              }}
            >
              Logga in
            </button>
            <button
              className="nav-btn nav-btn--primary"
              onClick={() => {
                onRegister()
                close()
              }}
            >
              Registrera
            </button>
          </>
        )}
      </div>

      <div className="navbar-right">
        <button
          className="navbar-icon-btn"
          onClick={user ? onProfile : onLogin}
          aria-label={user ? 'Min profil' : 'Logga in'}
        >
          <FontAwesomeIcon icon={faCircleUser} />
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  user: PropTypes.object,
  onHome: PropTypes.func.isRequired,
  onPurchasePlan: PropTypes.func,
  onPurchaseHistory: PropTypes.func,
  onBudget: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onProfile: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default Navbar
