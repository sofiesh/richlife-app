import React from 'react'
import PropTypes from 'prop-types'
import logo from '../Susbud_logo.png'
import './Navbar.css'

/**
 * Top navigation bar component.
 *
 * @param {object} props - Component properties.
 * @param {object} props.user - Authenticated user object, or null.
 * @param {Function} props.onHome - Navigate to home.
 * @param {Function} props.onLogin - Navigate to login.
 * @param {Function} props.onRegister - Navigate to register.
 * @param {Function} props.onLogout - Sign out user.
 * @returns {Function} JSX Element.
 */
const Navbar = ({ user, onHome, onLogin, onRegister, onLogout }) => (
  <nav className="navbar">
    <button className="navbar-brand" onClick={onHome}>
      <img src={logo} alt="Susbud" className="navbar-logo" />
      <span className="navbar-title">Susbud</span>
    </button>
    <div className="navbar-actions">
      {user
        ? (
          <button className="nav-btn nav-btn--outline" onClick={onLogout}>Logga ut</button>
          )
        : (
          <>
            <button className="nav-btn nav-btn--text" onClick={onLogin}>Logga in</button>
            <button className="nav-btn nav-btn--primary" onClick={onRegister}>Registrera</button>
          </>
          )}
    </div>
  </nav>
)

Navbar.propTypes = {
  user: PropTypes.object,
  onHome: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default Navbar
