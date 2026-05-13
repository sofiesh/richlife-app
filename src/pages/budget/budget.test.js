import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PurchaseHistory from './budget.js'

jest.mock('../../repositories/productRepository', () => ({
  getPurchasedProducts: () =>
    Promise.resolve([
      {
        id: '1',
        name: 'iPhone 15',
        category: 'Elektronik',
        new_price: 12990,
        purchased: true,
        purchased_at: '2026-03-15T10:00:00Z',
      },
      {
        id: '2',
        name: 'Nike sneakers',
        category: 'Mode',
        new_price: 1299,
        purchased: true,
        purchased_at: '2026-03-20T10:00:00Z',
      },
      {
        id: '3',
        name: 'Skrivbord',
        category: 'Möbler',
        new_price: 2500,
        purchased: true,
        purchased_at: '2026-04-05T10:00:00Z',
      },
    ]),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

const mockUser = { uid: 'user-123' }

const renderHistory = () =>
  render(
    <MemoryRouter>
      <PurchaseHistory user={mockUser} />
    </MemoryRouter>,
  )

test('visar köpta produkter', async () => {
  renderHistory()
  expect(await screen.findByText('iPhone 15')).toBeInTheDocument()
  expect(await screen.findByText('Nike sneakers')).toBeInTheDocument()
})

test('grupperar produkter per månad', async () => {
  renderHistory()
  expect(await screen.findByText(/mars 2026/i)).toBeInTheDocument()
  expect(await screen.findByText(/april 2026/i)).toBeInTheDocument()
})

test('visar totalt spenderat', async () => {
  renderHistory()
  expect(await screen.findByText(/16 789 kr/)).toBeInTheDocument()
})

test('visar tomt tillstånd om inga köp finns', async () => {
  const repo = require('../../repositories/productRepository.js')
  jest.spyOn(repo, 'getPurchasedProducts').mockResolvedValueOnce([])
  renderHistory()
  expect(await screen.findByText(/inga köp/i)).toBeInTheDocument()
})
