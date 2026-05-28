import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import JoyScoreSlider from './joyScoreSlider'

// TC-XX.1 visar rätt värde och emoji för givet score
test('visar score och emoji för value=7', () => {
  render(<JoyScoreSlider value={7} onChange={() => {}} />)
  expect(screen.getByText('😃 7/10')).toBeInTheDocument()
})

// TC-XX.2 använder defaultvärde 5 om value saknas
test('använder 5 som default om value är undefined', () => {
  render(<JoyScoreSlider value={undefined} onChange={() => {}} />)
  expect(screen.getByText('😊 5/10')).toBeInTheDocument()
})

// TC-XX.3 anropar onChange med korrekt nummer vid slidning
test('anropar onChange med tal när slider ändras', () => {
  const mockOnChange = vi.fn()
  render(<JoyScoreSlider value={5} onChange={mockOnChange} />)
  fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } })
  expect(mockOnChange).toHaveBeenCalledWith(8)
})

// TC-XX.4 slider har min=1 och max=10
test('slider har min 1 och max 10', () => {
  render(<JoyScoreSlider value={5} onChange={() => {}} />)
  const slider = screen.getByRole('slider')
  expect(slider).toHaveAttribute('min', '1')
  expect(slider).toHaveAttribute('max', '10')
})
