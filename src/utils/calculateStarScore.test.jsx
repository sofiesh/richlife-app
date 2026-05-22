import { calculateStarScore } from './calculateStarScore'

test('läser value_rating, inte valueRating', () => {
  expect(calculateStarScore({ value_rating: 5, price: 1000 })).toBe(5)
})

test('högre value_rating ger högre score', () => {
  const low = calculateStarScore({ value_rating: 1, price: 1000 })
  const high = calculateStarScore({ value_rating: 5, price: 1000 })
  expect(high).toBeGreaterThan(low)
})

test('lägre pris ger högre score', () => {
  const expensive = calculateStarScore({ value_rating: 3, price: 5000 })
  const cheap = calculateStarScore({ value_rating: 3, price: 500 })
  expect(cheap).toBeGreaterThan(expensive)
})
