import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrderToggler from './OrderToggler'

test('order toggler toggles order', () => {
  const { container, getByText } = render(
    <OrderToggler onChangeOrder={() => { }} />
  )
  userEvent.click(container.querySelector('button') as Element)
  expect(container.querySelector('span')?.innerHTML).toBe('DESC')
})