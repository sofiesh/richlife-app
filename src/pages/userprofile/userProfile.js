import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import './userProfile.css'

/**
 * User profile page for displaying user information and purchase history.
 *
 * @param {{ user: object }} props - Props containing the Firebase user object.
 * @returns {Function} JSX Element.
 */
const UserProfile = ({ user }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '')
  const [status, setStatus] = useState(null)

  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('sv-SE')
    : 'Okänt datum'

  /**
   * Saves updated profile information to Firebase.
   *
   * @param {Event} e The form submit event.
   */
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(auth.currentUser, { displayName })
      setStatus('Profil uppdaterad!')
    } catch (err) {
      setStatus('Fel vid uppdatering av profil: ' + err.message)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Användarprofil</h1>

        <div className="profile-field">
          <span className="profile-label">E-post</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Medlem sedan</span>
          <span className="profile-value">{memberSince}</span>
        </div>

        <form onSubmit={handleSave} className="profile-form">
          <label className="profile-label" htmlFor="displayName">
            Visningsnamn
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Lägg till ett namn"
            className="profile-input"
          />
          <button type="submit" className="profile-save-btn">Spara</button>
        </form>

        {status && <p className="profile-status">{status}</p>}
      </div>
    </div>
  )
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserProfile
