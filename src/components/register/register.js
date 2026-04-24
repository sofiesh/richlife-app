// Register.js

import React, { useState } from 'react'
import { signIn, signUp } from '../../auth'
import './register.css'

/**
 * Component for registering a new user.
 *
 * @returns {Function} JSX Element.
 */
function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  /**
   * Handles the registration of a new user.
   *
   * @param {Event} e - Event object.
   */
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      // If registration is successful
      setRegistrationSuccess(true)
      // Sign in user
      await signIn(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
<div className="register-container">
  <h3>Registrera ny användare</h3>
  {registrationSuccess
    ? (
    <p>Registrering lyckades</p>
      )
    : (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-post" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Lösenord" />
      <button type="submit">Registrera</button>
    </form>
      )}
  {error && <p>{error}</p>}
</div>
  )
}

export default Register
