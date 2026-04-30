// Logout.js
import React from 'react'
// import { renderToString } from 'react-dom/server'
import { signOut } from '../../auth'
import './logout.css'

/**
 * Logout component.
 *
 * @returns {Function} JSX Element.
 */
function Logout () {
  /**
   * Logout handler.
   *
   * @returns {void}
   */
  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button onClick={handleLogout} className="logout-button">
      Logga ut
    </button>
  )
}

export default Logout
