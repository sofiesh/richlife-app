// Login.js

import React, { useState } from 'react'
import { signIn } from '../../auth'
import './login.css'

/**
 * Login component.
 *
 * @returns {Function} JSX Element.
 */
function Login () {
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
    <div className="login-container">
      <h3>Logga in</h3>
      {loginSuccess
        ? (
        <p>Du är inloggad</p>
          )
        : (
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-post" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" />
        <button type="submit">Logga in</button>
      </form>
          )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
