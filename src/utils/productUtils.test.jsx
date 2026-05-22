import { countProducts, sumNewPrice, sumSecondHandPrice, getBestProduct } from './productUtils'

const products = [
  { name: 'Jacka', new_price: 1200, second_hand_price: 400, category: 'kläder' },
  { name: 'Cykel', new_price: 4000, second_hand_price: 1000, category: 'fritid' },
  { name: 'Fritidshus', new_price: 1200000, second_hand_price: 600000, category: 'bostad' },
]

// ### TC13.1 countProducts returns correct number of products (unit test)
test('räknar antal produkter', () => {
  expect(countProducts(products)).toBe(3)
})

// TC13.2 countProducts returns 0 for empty list (unit test)
test('countProducts returnerar 0 för tom lista', () => {
  expect(countProducts([])).toBe(0)
})

// TC13.3 sumNewPrice sums new prices correctly (unit test)
test('räknar summan av new_price', () => {
  expect(sumNewPrice(products)).toBe(1200 + 4000 + 1200000)
})

// TC13.4 sumNewPrice treats missing price as 0 (unit test)
test('sumNewPrice behandlar null-pris som 0', () => {
  const items = [{ new_price: null }, { new_price: 500 }]
  expect(sumNewPrice(items)).toBe(500)
})

// TC13.5 sumSecondHandPrice sums second-hand prices correctly (unit test)
test('räknar summan av second_hand_price', () => {
  expect(sumSecondHandPrice(products)).toBe(400 + 1000 + 600000)
})

// TC13.6 sumSecondHandPrice treats null price as 0 (unit test)
test('sumSecondHandPrice behandlar null-pris som 0', () => {
  const items = [{ second_hand_price: null }, { second_hand_price: 500 }]
  expect(sumSecondHandPrice(items)).toBe(500)
})

// TC13.7 sumSecondHandPrice returns 0 for empty list (unit test)
test('sumSecondHandPrice returnerar 0 för tom lista', () => {
  expect(sumSecondHandPrice([])).toBe(0)
})

// TC13.8 getBestProduct returns the first (highest-ranked) product (unit test)
test('getBestProduct returnerar första produkten i listan', () => {
  expect(getBestProduct(products)).toEqual(products[0])
})

// TC13.9 getBestProduct returns null for empty list (unit test)
test('getBestProduct returnerar null om inga produkter finns', () => {
  expect(getBestProduct([])).toBeNull()
})
