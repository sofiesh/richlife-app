import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserProfile from './userProfile'
import { updateProfile } from 'firebase/auth'

// Mocka Firebase
vi.mock('firebase/auth', () => ({
  updateProfile: vi.fn(),
}))
vi.mock('../../firebase', () => ({ auth: {} }))

const mockUser = {
  email: 'test@example.com',
  displayName: 'Anna',
  metadata: { creationTime: 'Thu, 01 Jan 2024 00:00:00 GMT' },
}

test('visar användarens e-post', () => {
  render(<UserProfile user={mockUser} />)
  expect(screen.getByText('test@example.com')).toBeInTheDocument()
})

test('visar displayName i inputfältet', () => {
  render(<UserProfile user={mockUser} />)
  expect(screen.getByDisplayValue('Anna')).toBeInTheDocument()
})

test('visar bekräftelse efter lyckad sparning', async () => {
  updateProfile.mockResolvedValueOnce()
  render(<UserProfile user={mockUser} />)

  fireEvent.click(screen.getByText('Spara'))

  await waitFor(() => {
    expect(screen.getByText('Profil uppdaterad!')).toBeInTheDocument()
  })
})

test('visar felmeddelande om sparning misslyckas', async () => {
  updateProfile.mockRejectedValueOnce(new Error('Nätverksfel'))
  render(<UserProfile user={mockUser} />)

  fireEvent.click(screen.getByText('Spara'))

  await waitFor(() => {
    expect(screen.getByText(/Fel vid uppdatering/)).toBeInTheDocument()
  })
})
