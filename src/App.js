import logo from './Susbud_logo.png'
import './App.css'
import Login from './pages/login/login.js'
import Register from './components/register/register.js'
import Navbar from './components/navbar/navbar.js'
import Dashboard from './pages/dashboard/dashboard.js'
import UserProfile from './pages/userprofile/userProfile.js'
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
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  /**
   * Handles the click event for the home button.
   *
   * @returns {void}
   */
  const handleHomeClick = () => navigate('/')

  /**
   * Handles the click event for the login button.
   *
   * @returns {void}
   */
  const handleLoginClick = () => navigate('/login')

  /**
   * Handles the click event for the register button.
   *
   * @returns {void}
   */
  const handleRegisterClick = () => navigate('/register')

  /**
   * Handles the click event for the profile button.
   *
   * @returns {void}
   */
  const handleUserProfileClick = () => {
    console.log('profil klickad')
    navigate('/userProfile')
  }

  /**
   * Handles the click event for the logout button.
   *
   * @returns {void}
   */
  const handleLogoutClick = () => {
    auth.signOut()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="App">
      <Navbar
        user={user}
        onHome={handleHomeClick}
        onLogin={handleLoginClick}
        onRegister={handleRegisterClick}
        onProfile={handleUserProfileClick}
        onLogout={handleLogoutClick}
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <div className="landing">
              <img src={logo} className="landing-logo" alt="Susbud logo" />
              <h1>Susbud</h1>
              <p className="tagline">Talk about your finances</p>
              {!user && (
                <button className="btn-cta" onClick={handleLoginClick}>Kom igång</button>
              )}
            </div>
          } />
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/userProfile" element={user ? <UserProfile user={user} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

export default AppRoute
