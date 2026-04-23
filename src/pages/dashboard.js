import React from 'react'
import PropTypes from 'prop-types'

/**
 * Landing page for logged in users.
 *
 * @param {{ user: { email: string } }} props - Props containing user information.
 * @returns {Function} JSX Element.
 */
function Dashboard ({ user }) {
  return (
    <div>
      <h1>Welcome, {user.email || 'Guest'}!</h1>
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  })
}

export default Dashboard
