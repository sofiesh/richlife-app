// Login.js

import React, { useState } from 'react'
import { signIn } from '../../auth'
import '../auth/auth.css'

/**
 * Login component.
 *
 * @returns {Function} JSX Element.
 */
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  /**
   * Function to handle login.
   *
   * @param {event} e - Event object.
   */
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      // If login is successful
      setLoginSuccess(true)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h3>Logga in</h3>
        {loginSuccess ? (
          <p>Du är inloggad</p>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label>E-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.se"
              />
            </div>
            <div className="auth-field">
              <label>Lösenord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn-primary">
              Logga in
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
