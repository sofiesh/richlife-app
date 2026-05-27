import { calculateStarScore } from './calculateStarScore'

test('dagligen + joy 10 ger högt score', () => {
  expect(calculateStarScore({ usage_frequency: 'dagligen', joy_score: 10 })).toBe(40)
})

test('högre joy_score ger högre score', () => {
  const low = calculateStarScore({ usage_frequency: 'varje vecka', joy_score: 2 })
  const high = calculateStarScore({ usage_frequency: 'varje vecka', joy_score: 8 })
  expect(high).toBeGreaterThan(low)
})

test('högre frekvens ger högre score', () => {
  const seldom = calculateStarScore({ usage_frequency: 'mer sällan', joy_score: 5 })
  const daily = calculateStarScore({ usage_frequency: 'dagligen', joy_score: 5 })
  expect(daily).toBeGreaterThan(seldom)
})

test('saknade värden använder defaults', () => {
  expect(calculateStarScore({})).toBe(10)
})
