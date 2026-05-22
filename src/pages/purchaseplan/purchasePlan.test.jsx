import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PurchasePlan from './purchasePlan'

const mockNavigate = vi.hoisted(() => vi.fn())

vi.mock('../../repositories/productRepository', () => ({
  getProducts: () =>
    Promise.resolve([
      { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, purchased: false },
      { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, purchased: true },
    ]),
  addProduct: () => Promise.resolve(),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../components/rankingstars/rankingStar.js', () => () => null)
vi.mock('../../utils/calculateStarScore.js', () => ({
  calculateStarScore: () => 5,
}))

const mockUser = { email: 'test@example.com', uid: 'user-123' }

beforeEach(() => mockNavigate.mockClear())

/**
 *
 */
const renderPurchasePlan = () =>
  render(
    <MemoryRouter>
      <PurchasePlan user={mockUser} />
    </MemoryRouter>,
  )

test('visar produktlistan', async () => {
  renderPurchasePlan()
  expect(await screen.findByText('iPhone 15')).toBeInTheDocument()
  expect(screen.queryByText('Nike sneakers')).not.toBeInTheDocument()
})

test('navigerar till detaljsida vid klick på produktrad', async () => {
  renderPurchasePlan()
  fireEvent.click(await screen.findByText('iPhone 15'))
  expect(mockNavigate).toHaveBeenCalledWith('/items/1')
})
