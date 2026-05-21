import { countProducts, sumNewPrice, sumSecondHandPrice, getBestProduct } from './productUtils'

const products = [
  { name: 'Jacka', new_price: 1200, second_hand_price: 400, category: 'kläder' },
  { name: 'Cykel', new_price: 4000, second_hand_price: 1000, category: 'fritid' },
  { name: 'Fritidshus', new_price: 1200000, second_hand_price: 600000, category: 'bostad' },
]

test('räknar antal produkter', () => {
  expect(countProducts(products)).toBe(3)
})

test('räknar summan av new_price', () => {
  expect(sumNewPrice(products)).toBe(1200 + 4000 + 1200000)
})

test('sumNewPrice behandlar null-pris som 0', () => {
  const items = [{ new_price: null }, { new_price: 500 }]
  expect(sumNewPrice(items)).toBe(500)
})

test('countProducts returnerar 0 för tom lista', () => {
  expect(countProducts([])).toBe(0)
})

test('räknar summan av second_hand_price', () => {
  expect(sumSecondHandPrice(products)).toBe(400 + 1000 + 600000)
})

test('sumSecondHandPrice behandlar null-pris som 0', () => {
  const items = [{ second_hand_price: null }, { second_hand_price: 500 }]
  expect(sumSecondHandPrice(items)).toBe(500)
})

test('sumSecondHandPrice returnerar 0 för tom lista', () => {
  expect(sumSecondHandPrice([])).toBe(0)
})

test('getBestProduct returnerar första produkten i listan', () => {
  expect(getBestProduct(products)).toEqual(products[0])
})

test('getBestProduct returnerar null om inga produkter finns', () => {
  expect(getBestProduct([])).toBeNull()
})
