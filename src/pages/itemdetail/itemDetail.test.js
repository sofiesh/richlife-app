import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ItemDetail from './itemDetail'

const mockNavigate = jest.fn()
jest.mock('../../repositories/productRepository', () => {
  const products = {
    1: { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, is_bought: false },
    2: { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, is_bought: true },
  }
  return {
    getProductById: (id) => Promise.resolve(products[id]),
    updateProduct: (_id, updates) => Promise.resolve(updates),
  }
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

beforeEach(() => mockNavigate.mockClear())

/**
 * Renderar ItemDetail med ett specifikt produkt-id.
 *
 * @param id the item id
 */
const renderItemDetail = (id) =>
  render(
    <MemoryRouter initialEntries={[`/items/${id}`]}>
      <Routes>
        <Route path="/items/:id" element={<ItemDetail />} />
      </Routes>
    </MemoryRouter>,
  )

test('visar produktnamn och detaljer', async () => {
  renderItemDetail('1')
  expect(await screen.findByText('iPhone 15')).toBeInTheDocument()
  expect(await screen.findByText('Elektronik')).toBeInTheDocument()
  expect(await screen.findByText('12990 kr')).toBeInTheDocument()
})

test('visar Ej köpt för en ej köpt produkt', async () => {
  renderItemDetail('1')
  expect(await screen.findByText('Ej köpt')).toBeInTheDocument()
  expect(await screen.findByText('Markera som köpt')).toBeInTheDocument()
})

test('visar Köpt för en redan köpt produkt', async () => {
  renderItemDetail('2')
  expect(await screen.findByText('Köpt')).toBeInTheDocument()
  expect(await screen.findByText('Markera som ej köpt')).toBeInTheDocument()
})

test('togglar köpt-status vid knappklick', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Markera som köpt'))
  expect(await screen.findByText('Markera som ej köpt')).toBeInTheDocument()
})

test('Tillbaka-knappen navigerar till /purchaseplan', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Tillbaka'))
  expect(mockNavigate).toHaveBeenCalledWith('/purchaseplan')
})
