import React from 'react'
import { render, screen } from '@testing-library/react'
import InfoCard from './infoCard.js'

test('visar titel och värde', () => {
  render(<InfoCard title="Safe to spend" value="3 200 kr" />)
  expect(screen.getByText('Safe to spend')).toBeInTheDocument()
  // ONLY PLACEHOLDER VALUE
  expect(screen.getByText('3 200 kr')).toBeInTheDocument()
})

test('visar subtitle när den är angiven', () => {
  render(<InfoCard title="Budget" value="100" subtitle="av 500 kr" />)
  // ONLY PLACEHOLDER VALUE
  expect(screen.getByText('av 500 kr')).toBeInTheDocument()
})

test('visar – när value saknas', () => {
  render(<InfoCard title="Budget" />)
  expect(screen.getByText('–')).toBeInTheDocument()
})

test('applicerar rätt variant-klass', () => {
  const { container } = render(<InfoCard title="Test" variant="warning" />)
  expect(container.firstChild).toHaveClass('info-card--warning')
})
