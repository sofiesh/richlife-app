// Register.js

import React, { useState } from 'react'
import { signIn, signUp } from '../../auth'
import './register.css'
import { seedDefaultBudgetItems } from '../../repositories/budgetRepository'

/**
 * Component for registering a new user.
 *
 * @returns {Function} JSX Element.
 */
function Register() {
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
      // Sign in user to get user ID for seeding default budget items
      const { user } = await signIn(email, password)
      await seedDefaultBudgetItems(user.id)
      // If registration and seeding is successful
      setRegistrationSuccess(true)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h3>Registrera ny användare</h3>
        {registrationSuccess ? (
          <p>Registrering lyckades</p>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="register-field">
              <label>E-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.se"
              />
            </div>
            <div className="register-field">
              <label>Lösenord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="register-error">{error}</p>}
            <button type="submit" className="btn-primary">
              Registrera
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register
