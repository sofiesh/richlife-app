// Testing protected routes, redirects

import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import UserProfile from '../../pages/userprofile/userProfile.js'

jest.mock('firebase/auth', () => ({ updateProfile: jest.fn() }))
jest.mock('../../firebase.js', () => ({ auth: {} }))

const mockUser = {
  email: 'test@example.com',
  displayName: '',
  metadata: { creationTime: 'Thu, 01 Jan 2024 00:00:00 GMT' }
}

// Hjälpfunktion — renderar /userProfile med eller utan inloggad användare
const renderProfileRoute = (user) =>
  render(
    <MemoryRouter initialEntries={['/userProfile']}>
      <Routes>
        <Route
          path="/userProfile"
          element={user ? <UserProfile user={user} /> : <div>Logga in</div>}
        />
      </Routes>
    </MemoryRouter>
  )

test('inloggad användare ser profilsidan', () => {
  renderProfileRoute(mockUser)
  expect(screen.getByText('Användarprofil')).toBeInTheDocument()
  expect(screen.getByText('test@example.com')).toBeInTheDocument()
})

test('ej inloggad användare ser inte profilsidan', () => {
  renderProfileRoute(null)
  expect(screen.queryByText('Användarprofil')).not.toBeInTheDocument()
  expect(screen.getByText('Logga in')).toBeInTheDocument()
})
