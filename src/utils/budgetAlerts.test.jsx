import { getBudgetAlerts } from './budgetAlerts'

// TC12.1 — boende > 30%
test('TC12.1 genererar alert för boende när andelen överstiger 30%', () => {
  const expenses = [{ category: 'boende', amount: 10000 }]
  const alerts = getBudgetAlerts(30000, expenses)
  expect(alerts).toEqual(expect.arrayContaining([expect.objectContaining({ category: 'boende' })]))
})

// TC12.2 — mat > 15%
test('TC12.2 genererar alert för mat när andelen överstiger 15%', () => {
  const expenses = [{ category: 'mat', amount: 5000 }]
  const alerts = getBudgetAlerts(30000, expenses)
  expect(alerts).toEqual(expect.arrayContaining([expect.objectContaining({ category: 'mat' })]))
})

// TC12.3 — transport > 15%
test('TC12.3 genererar alert för transport när andelen överstiger 15%', () => {
  const expenses = [{ category: 'transport', amount: 5000 }]
  const alerts = getBudgetAlerts(30000, expenses)
  expect(alerts).toEqual(
    expect.arrayContaining([expect.objectContaining({ category: 'transport' })]),
  )
})

// TC12.4 — ingen varning vid inkomst 0
test('TC12.4 returnerar tom array när inkomst är 0', () => {
  const expenses = [{ category: 'boende', amount: 5000 }]
  expect(getBudgetAlerts(0, expenses)).toEqual([])
})

// TC12.5 — total andel > 60%
test('TC12.5 genererar alert när total andel för boende, mat och transport överstiger 60%', () => {
  const expenses = [
    { category: 'boende', amount: 15000 },
    { category: 'mat', amount: 5000 },
    { category: 'transport', amount: 3000 },
  ]
  const alerts = getBudgetAlerts(20000, expenses)
  expect(alerts).toEqual(expect.arrayContaining([expect.objectContaining({ category: 'totalt' })]))
})

// TC12.6 — inga varningar när alla kategorier under gränsen
test('TC12.6 returnerar tom array när alla kategorier är under gränsen', () => {
  const expenses = [
    { category: 'boende', amount: 5000 },
    { category: 'mat', amount: 2000 },
    { category: 'transport', amount: 1000 },
  ]
  expect(getBudgetAlerts(20000, expenses)).toEqual([])
})
