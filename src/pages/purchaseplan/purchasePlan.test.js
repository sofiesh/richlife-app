import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PurchasePlan from './purchasePlan.js'

const mockNavigate = jest.fn()
jest.mock('../../repositories/productRepository', () => ({
  getProducts: () =>
    Promise.resolve([
      { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, is_bought: false },
      { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, is_bought: true },
    ]),
  addProduct: () => Promise.resolve(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('../../components/rankingstars/rankingStar.js', () => () => null)
jest.mock('../../assets/calculateStarScore.js', () => ({
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
  expect(await screen.findByText('Nike sneakers')).toBeInTheDocument()
})

test('navigerar till detaljsida vid klick på produktrad', async () => {
  renderPurchasePlan()
  fireEvent.click(await screen.findByText('iPhone 15'))
  expect(mockNavigate).toHaveBeenCalledWith('/items/1')
})
