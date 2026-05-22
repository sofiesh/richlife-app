import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from './homePage'

vi.mock('../../context/budgetContext', () => ({
  useBudget: () => ({
    safeToSpend: 5000,
    totalIncome: 10000,
  }),
}))

vi.mock('../../repositories/productRepository', () => ({
  getProducts: () => Promise.resolve([]),
}))

const onLogin = vi.fn()
test('visar landningssida när användaren inte är inloggad', async () => {
  render(
    <MemoryRouter>
      <HomePage user={null} onLogin={onLogin} />
    </MemoryRouter>,
  )
  await waitFor(() => {
    expect(screen.getByText('Susbud')).toBeInTheDocument()
    expect(screen.getByText('Kom igång')).toBeInTheDocument()
  })
})

test('visar info-kort när användaren är inloggad', async () => {
  const mockUser = { uid: 'user-123', email: 'test@example.com' } // uid tillagd
  render(
    <MemoryRouter>
      <HomePage user={mockUser} onLogin={onLogin} />
    </MemoryRouter>,
  )
  await waitFor(() => {
    expect(screen.getByText('Safe to spend')).toBeInTheDocument()
    expect(screen.getByText('Köpkollen')).toBeInTheDocument()
  })
})
