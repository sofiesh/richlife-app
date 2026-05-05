import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './homepage.js'

const onLogin = jest.fn()

test('visar landningssida när användaren inte är inloggad', () => {
  render(
    <MemoryRouter>
      <HomePage user={null} onLogin={onLogin} />
    </MemoryRouter>,
  )
  expect(screen.getByText('Susbud')).toBeInTheDocument()
  expect(screen.getByText('Kom igång')).toBeInTheDocument()
})

test('visar info-kort när användaren är inloggad', () => {
  const mockUser = { email: 'test@example.com' }
  render(
    <MemoryRouter>
      <HomePage user={mockUser} onLogin={onLogin} />
    </MemoryRouter>,
  )
  expect(screen.getByText('Safe to spend')).toBeInTheDocument()
  expect(screen.getByText('Köpkollen')).toBeInTheDocument()
})
