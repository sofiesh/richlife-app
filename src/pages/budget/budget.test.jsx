import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Budget from './budget'

const mockNavigate = vi.hoisted(() => vi.fn())

vi.mock('../../context/budgetContext', () => ({
  useBudget: () => ({
    items: [{ id: '1', label: 'hyra', amount: 3000, type: 'expense', category: 'boende' }],
    setItems: vi.fn(),
    income: [],
    expenses: [{ id: '1', label: 'hyra', amount: 3000, type: 'expense', category: 'boende' }],
    totalIncome: 0,
    totalExpenses: 3000,
    safeToSpend: -3000,
    userId: 'user-123',
  }),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

test('visar tillagd utgift', async () => {
  render(
    <MemoryRouter>
      <Budget />
    </MemoryRouter>,
  )
  expect(await screen.findByText('hyra')).toBeInTheDocument()
  expect(await screen.findByText('boende')).toBeInTheDocument()
})
