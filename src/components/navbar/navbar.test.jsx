import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from './navbar'

const props = {
  user: null,
  onHome: vi.fn(),
  onLogin: vi.fn(),
  onRegister: vi.fn(),
  onProfile: vi.fn(),
  onLogout: vi.fn(),
}

test('visar Logga in och Registrera när användaren är utloggad', () => {
  render(<Navbar {...props} />)
  expect(screen.getByText('Logga in')).toBeInTheDocument()
  expect(screen.getByText('Registrera')).toBeInTheDocument()
})
