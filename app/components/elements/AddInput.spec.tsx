import React from 'react'
import { render } from '@testing-library/react'
import AddInput from './AddInput'

test('add input renders correctly', () => {
  const { container, getByText } = render(
    <AddInput onAddTask={() => { }} />
  )
  // Test that value of input field is initially empty
  expect(container.querySelector('input')?.value).toBe('')
  // Test that we have a add button
  expect(container.querySelector('button')).toBeDefined()
})