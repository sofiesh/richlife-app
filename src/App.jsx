// import logo from './Susbud_logo.png'
import './App.css'
import ItemDetail from './pages/itemdetail/itemDetail'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Navbar from './components/navbar/navbar'
import HomePage from './pages/home/homePage'
import Insights from './pages/insights/insights'
import PurchasePlan from './pages/purchaseplan/purchasePlan'
import PurchaseHistory from './pages/purchasehistory/purchaseHistory'
import ScrollToTop from './components/scrollToTop/scrollToTop'
import Budget from './pages/budget/budget'
import { BudgetProvider } from './context/budgetContext'
import UserProfile from './pages/userprofile/userProfile'
import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

/**
 * Function to handle the main application.
 *
 * @returns {Function} JSX Element.
 */
function AppRoute() {
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
   * Handles the click event for the insights button.
   *
   * @returns {void}
   */
  const handleInsightsClick = () => navigate('/insights')

  /**
   * Handles the click event for the purchaseplan button.
   *
   * @returns {void}
   */
  const handlePurchasePlanClick = () => navigate('/purchaseplan')

  /**
   * Handles the click event for the purchase history button.
   *
   * @returns {void}
   */
  const handlePurchaseHistoryClick = () => navigate('/purchasehistory')

  /**
   * Handles the click event for the budget button.
   *
   * @returns {void}
   */
  const handleBudgetClick = () => navigate('/budget')

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
        onInsights={handleInsightsClick}
        onPurchasePlan={handlePurchasePlanClick}
        onPurchaseHistory={handlePurchaseHistoryClick}
        onBudget={handleBudgetClick}
        onProfile={handleUserProfileClick}
        onLogout={handleLogoutClick}
      />
      <main className="main-content">
        <BudgetProvider user={user}>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage user={user} onLogin={handleLoginClick} onRegister={handleRegisterClick} />
              }
            />{' '}
            <Route
              path="/login"
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />}
            />
            <Route
              path="/homepage"
              element={user ? <PurchasePlan user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/insights"
              element={user ? <Insights user={user} /> : <Navigate to="/insights" />}
            />
            <Route
              path="/purchaseplan"
              element={user ? <PurchasePlan user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchasehistory"
              element={user ? <PurchaseHistory user={user} /> : <Navigate to="/login" />}
            />
            <Route path="/budget" element={user ? <Budget /> : <Navigate to="/login" />} />
            <Route path="/items/:id" element={user ? <ItemDetail /> : <Navigate to="/login" />} />
            <Route
              path="/userProfile"
              element={user ? <UserProfile user={user} /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BudgetProvider>
      </main>
    </div>
  )
}

export default AppRoute
