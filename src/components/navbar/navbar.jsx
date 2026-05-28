import React, { useEffect, useRef, useState } from 'react'
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
 * @param {Function} props.onInsights - Navigate to insights.
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
  onInsights,
  onRegister,
  onProfile,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const [profileOpen, setProfileOpen] = useState(false)


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
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

return (
  <nav className="navbar" ref={menuRef}>

    <button className="navbar-brand" onClick={() => { onHome(); close() }}>
      <img src={logo} alt="Susbud" className="navbar-logo" />
      <span className="navbar-title">Susbud</span>
    </button>

    {user && (
      <div className="navbar-center">
        <button className="nav-btn nav-btn--outline2" onClick={() => { onHome(); close() }}>Startsida</button>
        <button className="nav-btn nav-btn--outline2" onClick={() => { onPurchasePlan(); close() }}>Önskelista</button>
        <button className="nav-btn nav-btn--outline2" onClick={() => { onPurchaseHistory(); close() }}>Historik</button>
        <button className="nav-btn nav-btn--outline2" onClick={() => { onBudget(); close() }}>Budget</button>
        <button className="nav-btn nav-btn--outline2" onClick={() => { onInsights(); close() }}>Insikter</button>
      </div>
    )}

    <div className="navbar-right">
      {!user && (
        <div className="navbar-auth">
          <button className="nav-btn nav-btn--text" onClick={onLogin}>Logga in</button>
          <button className="nav-btn nav-btn--primary" onClick={onRegister}>Registrera</button>
        </div>
      )}

      {user && (
        <div className="profile-menu-wrapper">
          <button className="navbar-icon-btn" onClick={() => { setProfileOpen(!profileOpen); setMenuOpen(false) }}>
            <FontAwesomeIcon icon={faCircleUser} />
          </button>
          {profileOpen && (
            <div className="profile-dropdown">
              <button onClick={() => { onProfile(); setProfileOpen(false) }}>Användarprofil</button>
              <button onClick={() => { onLogout(); setProfileOpen(false) }}>Logga ut</button>
            </div>
          )}
        </div>
      )}

      {user && (
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      )}
    </div>

    {user && menuOpen && (
      <div className="navbar-mobile-menu">
        <button className="nav-btn" onClick={() => { onHome(); close() }}>Startsida</button>
        <button className="nav-btn" onClick={() => { onPurchasePlan(); close() }}>Önskelista</button>
        <button className="nav-btn" onClick={() => { onPurchaseHistory(); close() }}>Historik</button>
        <button className="nav-btn" onClick={() => { onBudget(); close() }}>Budget</button>
        <button className="nav-btn" onClick={() => { onInsights(); close() }}>Insikter</button>
        <button className="nav-btn" onClick={() => { onProfile(); close() }}>Användarprofil</button>
        <button className="nav-btn" onClick={() => { onLogout(); close() }}>Logga ut</button>
      </div>
    )}

  </nav>
)

}

Navbar.propTypes = {
  user: PropTypes.object,
  onHome: PropTypes.func.isRequired,
  onPurchasePlan: PropTypes.func,
  onPurchaseHistory: PropTypes.func,
  onBudget: PropTypes.func,
  onInsights: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onProfile: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default Navbar
