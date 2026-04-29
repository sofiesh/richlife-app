import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from './navbar'

const props = {
  user: null,
  onHome: jest.fn(),
  onLogin: jest.fn(),
  onRegister: jest.fn(),
  onProfile: jest.fn(),
  onLogout: jest.fn()
}

test('visar Logga in och Registrera när användaren är utloggad', () => {
  render(<Navbar {...props} />)
  expect(screen.getByText('Logga in')).toBeInTheDocument()
  expect(screen.getByText('Registrera')).toBeInTheDocument()
})
