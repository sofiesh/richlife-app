import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PurchasePlan from './purchasePlan.js'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  /**
   *
   */
  useNavigate: () => mockNavigate,
}))

jest.mock('../../components/rankingstars/rankingStar.js', () => () => null)
jest.mock('../../assets/calculateStarScore.js', () => ({
  /**
   *
   */
  calculateStarScore: () => 5,
}))

const mockUser = { email: 'test@example.com' }

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

test('visar produktlistan', () => {
  renderPurchasePlan()
  expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  expect(screen.getByText('Nike sneakers')).toBeInTheDocument()
})

test('navigerar till detaljsida vid klick på produktrad', () => {
  renderPurchasePlan()
  fireEvent.click(screen.getByText('iPhone 15'))
  expect(mockNavigate).toHaveBeenCalledWith('/items/1')
})
