import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: (auth, callback) => {
    callback(null)
    return () => {}
  }
}))
jest.mock('./firebase', () => ({ auth: {} }))

test('appen renderar utan att krascha', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(screen.getAllByText('Susbud').length).toBeGreaterThan(0)
})

test('visar Logga in och Registrera när användaren är utloggad', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByText('Logga in')).toBeInTheDocument()
  expect(screen.getByText('Registrera')).toBeInTheDocument()
})
