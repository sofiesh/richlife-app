import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ItemDetail from './itemDetail'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

beforeEach(() => mockNavigate.mockClear())

// Renderar ItemDetail med ett specifikt produkt-id
const renderItemDetail = (id) =>
  render(
    <MemoryRouter initialEntries={[`/items/${id}`]}>
      <Routes>
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </MemoryRouter>
  )

test('visar produktnamn och detaljer', () => {
  renderItemDetail('1')
  expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  expect(screen.getByText('Elektronik')).toBeInTheDocument()
  expect(screen.getByText('12990 kr')).toBeInTheDocument()
})

test('visar Ej köpt för en ej köpt produkt', () => {
  renderItemDetail('1') // iPhone 15, bought: false
  expect(screen.getByText('Ej köpt')).toBeInTheDocument()
  expect(screen.getByText('Markera som köpt')).toBeInTheDocument()
})

test('visar Köpt för en redan köpt produkt', () => {
  renderItemDetail('2') // Nike sneakers, bought: true
  expect(screen.getByText('Köpt')).toBeInTheDocument()
  expect(screen.getByText('Markera som ej köpt')).toBeInTheDocument()
})

test('togglar köpt-status vid knappklick', () => {
  renderItemDetail('1')
  fireEvent.click(screen.getByText('Markera som köpt'))
  expect(screen.getByText('Markera som ej köpt')).toBeInTheDocument()
})

test('Tillbaka-knappen navigerar till /dashboard', () => {
  renderItemDetail('1')
  fireEvent.click(screen.getByText('Tillbaka'))
  expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
})
