import logo from './Susbud_logo.png'
import './App.css'
import Login from './components/login'
import Register from './components/register'
import Button from './components/button'
// import PurchasePlan from './components/purchasePlan'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

/**
 * Function to handle the main application.
 *
 * @returns {Function} JSX Element.
 */
function AppRoute () {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()
  // const [setShowRegister] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (user) {
        setShowLogin(false)
        setShowRegister(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  /**
   * Function to handle the click event for the home button.
   */
  const handleHomeClick = () => {
    setShowLogin(false)
    setShowRegister(false)
    navigate('/')
  }

  /**
   * Function to handle the click event for the login button.
   */
  const handleLoginClick = () => {
    setShowLogin(true)
    navigate('/login')
  }

  /**
   * Function to handle the click event for the register button.
   */
  const handleRegisterClick = () => {
    setShowLogin(false)
    setShowRegister(true)
    navigate('/register')
  }

  /**
   * Function to handle the click event for the logout button.
   */
  const handleLogoutClick = () => {
    auth.signOut()
    setUser(null)
    setShowLogin(false)
    setShowRegister(false)
    navigate('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {user
            ? (
              <p>Användaren är inloggad</p>
              )
            : (
              <p>Användaren är utloggad</p>
              )}
        </div>
        <nav>
            <Button text="Home" backgroundColor="grey" onClick={handleHomeClick} />
        </nav>
        <img src={logo} className="App-logo" alt="Susbud logo" />
        <h1>Susbud</h1>
        <div className="startp">Talk about your finances</div>
        {user
          ? (
            <Button text="Logga ut" backgroundColor="orange" onClick={handleLogoutClick} />
            )
          : (
            <div>
              {!showLogin && !showRegister && (
                <div className="button-container">
                  <Button text="Logga in" backgroundColor="#d959e4" onClick={handleLoginClick} />
                  <Button text="Registrera ny användare" backgroundColor="green" onClick={handleRegisterClick} />
                </div>
              )}
            </div>
            )}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/" /> : <div />} />
          <Route path="/login" element={!user && showLogin ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user && showRegister ? <Register setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={user ? '/' : '/'} />} />
        </Routes>
      </header>
    </div>
  )
}

export default AppRoute
