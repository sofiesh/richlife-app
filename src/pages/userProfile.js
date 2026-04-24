// import React, { useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import './dashboard.css'

/**
 * Landing page for logged in users.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
const UserProfile = ({ user }) => {
  //   const notBought = products.filter(p => !p.bought)
  //   const bought = products.filter(p => p.bought)

  // const [showBought, setShowBought] = useState(false)
  // const visibleProducts = showBought ? bought : notBought

  return (
        <div className="user-profile">
            <h1>Användarprofil</h1>

<p>LÄGG IN EN MASSA INFO OM ANVÄNDAREN HÄR, T.EX.:</p>
<ul>
    <li>Email: {user.email}</li>
    <li>Medlem sedan: 2023-01-15</li>
    <li>Antal produkter i önskelistan: 12</li>
    <li>Totalt spenderat: 15 000 kr</li>
</ul>

</div>
  )
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  })
}

export default UserProfile
