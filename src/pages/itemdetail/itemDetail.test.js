import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ItemDetail from './itemDetail'

const mockNavigate = jest.fn()
jest.mock('../../repositories/productRepository', () => {
  const products = {
    1: { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, purchased: false },
    2: { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, purchased: true },
  }
  return {
    getProductById: (id) => Promise.resolve(products[id]),
    updateProduct: (_id, updates) =>
      Promise.resolve({
        id: '1',
        purchased: false,
        ...updates,
      }),
    deleteProduct: jest.fn().mockResolvedValue(),
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

test('visar redigeringsformulär när Ändra produkt klickas', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ändra produkt'))
  expect(await screen.findByDisplayValue('Elektronik')).toBeInTheDocument()
  expect(await screen.findByDisplayValue('12990')).toBeInTheDocument()
})

test('uppdaterar visad kategori efter sparning', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ändra produkt'))

  const input = await screen.findByDisplayValue('Elektronik')
  fireEvent.change(input, { target: { value: 'Sport' } })
  fireEvent.click(screen.getByText('Spara'))

  expect(await screen.findByText('Sport')).toBeInTheDocument()
})

test('avbryt-knappen stänger redigeringsläget', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ändra produkt'))
  fireEvent.click(await screen.findByText('Avbryt'))
  expect(await screen.findByText('Ändra produkt')).toBeInTheDocument()
  expect(screen.queryByDisplayValue('iPhone 15')).not.toBeInTheDocument()
})

test('döljer Ta bort-knappen under redigering', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ändra produkt'))
  expect(screen.queryByText('Ta bort produkt')).not.toBeInTheDocument()
})

test('visar felmeddelande om uppdateringen misslyckas', async () => {
  const repo = require('../../repositories/productRepository')
  jest.spyOn(repo, 'updateProduct').mockRejectedValueOnce(new Error('Supabase error'))

  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ändra produkt'))
  fireEvent.click(await screen.findByText('Spara'))

  expect(await screen.findByRole('alert')).toHaveTextContent('Något gick fel vid uppdatering')
})

test('visar bekräftelse när Ta bort-knappen klickas', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ta bort produkt'))
  expect(await screen.findByText(/Är du säker/)).toBeInTheDocument()
})

test('navigerar till /purchaseplan efter bekräftad borttagning', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ta bort produkt'))
  fireEvent.click(await screen.findByText('Ja, ta bort'))
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/purchaseplan'))
})

test('visar felmeddelande om borttagningen misslyckas', async () => {
  const { deleteProduct } = require('../../repositories/productRepository')
  deleteProduct.mockRejectedValueOnce(new Error('Supabase error'))

  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Ta bort produkt'))
  fireEvent.click(await screen.findByText('Ja, ta bort'))

  expect(await screen.findByRole('alert')).toHaveTextContent('Något gick fel. Försök igen.')
  expect(mockNavigate).not.toHaveBeenCalled()
})
