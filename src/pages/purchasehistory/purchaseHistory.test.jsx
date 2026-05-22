import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PurchaseHistory from './purchaseHistory'

const mockNavigate = vi.hoisted(() => vi.fn())

const mockGetPurchasedProducts = vi.hoisted(() =>
  vi.fn().mockResolvedValue([
    { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, purchased: true, purchased_at: '2026-03-15T10:00:00Z' },
    { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, purchased: true, purchased_at: '2026-03-20T10:00:00Z' },
    { id: '3', name: 'Skrivbord', category: 'Möbler', new_price: 2500, purchased: true, purchased_at: '2026-04-05T10:00:00Z' },
  ])
)

vi.mock('../../repositories/productRepository', () => ({
  getPurchasedProducts: mockGetPurchasedProducts,
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../lib/supabase', () => ({
  supabase: { from: vi.fn() },
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
  mockGetPurchasedProducts.mockResolvedValueOnce([])
  renderHistory()
  expect(await screen.findByText(/inga köp/i)).toBeInTheDocument()
})
