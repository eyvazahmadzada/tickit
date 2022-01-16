import React from 'react'
import { render } from '@testing-library/react'
import Dropdown from './Dropdown'

test('dropdown renders correctly', () => {
  const dropdownItems = [
    { key: 'item-1', name: 'Item 1' },
    { key: 'item-2', name: 'Item 2' },
    { key: 'item-3', name: 'Item 3' }
  ]
  const { container, getByText } = render(
    <Dropdown name='Test dropdown' icon='test' items={dropdownItems} onSelectItem={() => { }} />
  )
  expect(getByText('Test dropdown')).toBeInTheDocument()
  // Test that first img in dropdown is the icon we passed
  expect(container.querySelector('img')?.src.indexOf('test')).toBeGreaterThan(-1)
  // Test that number of dropdown items match 
  expect(container.querySelector('.menu')?.querySelectorAll('button').length).toBe(3)
})