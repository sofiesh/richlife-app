import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ItemDetail from './itemDetail'

const mockNavigate = vi.hoisted(() => vi.fn())
const mockUpdateProduct = vi.hoisted(() =>
  vi.fn().mockImplementation((_id, updates) =>
    Promise.resolve({ id: '1', purchased: false, purchased_condition: null, ...updates })
  )
)
const mockDeleteProduct = vi.hoisted(() => vi.fn().mockResolvedValue())

vi.mock('../../repositories/productRepository', () => {
  const products = {
    1: { id: '1', name: 'iPhone 15', category: 'Elektronik', new_price: 12990, second_hand_price: 8000, usage_frequency: 'dagligen', joy_score: 8, purchased: false, purchased_condition: null },
    2: { id: '2', name: 'Nike sneakers', category: 'Mode', new_price: 1299, second_hand_price: 700, usage_frequency: 'varje vecka', joy_score: 6, purchased: true, purchased_condition: 'new' },
    3: { id: '3', name: 'Cykel', category: 'Sport', new_price: 5000, second_hand_price: 2500, usage_frequency: 'dagligen', joy_score: 9, purchased: true, purchased_condition: 'second_hand' },
  }
  return {
    getProductById: (id) => Promise.resolve(products[id]),
    updateProduct: mockUpdateProduct,
    deleteProduct: mockDeleteProduct,
  }
})

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

beforeEach(() => {
  mockNavigate.mockClear()
  mockUpdateProduct.mockImplementation((_id, updates) =>
    Promise.resolve({ id: '1', purchased: false, purchased_condition: null, ...updates })
  )
  mockDeleteProduct.mockResolvedValue()
})

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
  expect(await screen.findByRole('checkbox')).not.toBeChecked()
})

test('visar Köpt – nyköpt för nyköpt produkt', async () => {
  renderItemDetail('2')
  expect(await screen.findByText('Köpt – nyköpt')).toBeInTheDocument()
  expect(await screen.findByRole('checkbox')).toBeChecked()
})

test('visar Köpt – begagnat för begagnat köpt produkt', async () => {
  renderItemDetail('3')
  expect(await screen.findByText('Köpt – begagnat')).toBeInTheDocument()
})

test('visar köpvilkorsval när ej köpt produkt markeras', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('checkbox'))
  expect(await screen.findByText('Hur köpte du produkten?')).toBeInTheDocument()
  expect(await screen.findByText('Nyköpt')).toBeInTheDocument()
  expect(await screen.findByText('Begagnat')).toBeInTheDocument()
})

test('sparar nyköpt och visar Köpt – nyköpt', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('checkbox'))
  fireEvent.click(await screen.findByText('Nyköpt'))
  expect(await screen.findByText('Köpt – nyköpt')).toBeInTheDocument()
  expect(mockUpdateProduct).toHaveBeenCalledWith('1', expect.objectContaining({ purchased_condition: 'new' }))
})

test('sparar begagnat och visar Köpt – begagnat', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('checkbox'))
  fireEvent.click(await screen.findByText('Begagnat'))
  expect(await screen.findByText('Köpt – begagnat')).toBeInTheDocument()
  expect(mockUpdateProduct).toHaveBeenCalledWith('1', expect.objectContaining({ purchased_condition: 'second_hand' }))
})

test('avmarkerar köpt direkt utan villkorsval', async () => {
  renderItemDetail('2')
  fireEvent.click(await screen.findByRole('checkbox'))
  await waitFor(() => {
    expect(mockUpdateProduct).toHaveBeenCalledWith('2', expect.objectContaining({ purchased: false, purchased_condition: null }))
  })
})

test('Tillbaka-knappen navigerar tillbaka', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByText('Tillbaka'))
  expect(mockNavigate).toHaveBeenCalledWith('(-1)')
})

test('visar redigeringsformulär när Ändra produkt klickas', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Redigera produkt' }))
  expect(await screen.findByDisplayValue('Elektronik')).toBeInTheDocument()
  expect(await screen.findByDisplayValue('12990')).toBeInTheDocument()
})

test('uppdaterar visad kategori efter sparning', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Redigera produkt' }))
  const input = await screen.findByDisplayValue('Elektronik')
  fireEvent.change(input, { target: { value: 'Sport' } })
  fireEvent.click(screen.getByText('Spara'))
  expect(await screen.findByText('Sport')).toBeInTheDocument()
})

test('avbryt-knappen stänger redigeringsläget', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Redigera produkt' }))
  fireEvent.click(await screen.findByText('Avbryt'))
  expect(await screen.findByRole('button', { name: 'Redigera produkt' })).toBeInTheDocument()
  expect(screen.queryByDisplayValue('iPhone 15')).not.toBeInTheDocument()
})

test('döljer Ta bort-knappen under redigering', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Redigera produkt' }))
  expect(screen.queryByRole('button', { name: 'Ta bort produkt' })).not.toBeInTheDocument()
})

test('visar felmeddelande om uppdateringen misslyckas', async () => {
  mockUpdateProduct.mockRejectedValueOnce(new Error('Supabase error'))
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Redigera produkt' }))
  fireEvent.click(await screen.findByText('Spara'))
  expect(await screen.findByRole('alert')).toHaveTextContent('Något gick fel vid uppdatering')
})

test('visar bekräftelse när Ta bort-knappen klickas', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Ta bort produkt' }))
  expect(await screen.findByText(/Är du säker/)).toBeInTheDocument()
})

test('navigerar till /purchaseplan efter bekräftad borttagning', async () => {
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Ta bort produkt' }))
  fireEvent.click(await screen.findByText('Ja, ta bort'))
  await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/purchaseplan'))
})

test('visar felmeddelande om borttagningen misslyckas', async () => {
  mockDeleteProduct.mockRejectedValueOnce(new Error('Supabase error'))
  renderItemDetail('1')
  fireEvent.click(await screen.findByRole('button', { name: 'Ta bort produkt' }))
  fireEvent.click(await screen.findByText('Ja, ta bort'))
  expect(await screen.findByRole('alert')).toHaveTextContent('Något gick fel. Försök igen.')
  expect(mockNavigate).not.toHaveBeenCalled()
})
