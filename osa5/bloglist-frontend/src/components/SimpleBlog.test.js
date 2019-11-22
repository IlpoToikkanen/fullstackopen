import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    likes: '10'
  }
  const component = render(<SimpleBlog blog={blog} />)

  const div1 = component.container.querySelector('.blogInfo')

  const div2 = component.container.querySelector('.likes')

  expect(div1).toHaveTextContent('Test blog Test author')
  expect(div2).toHaveTextContent('blog has 10 likes')
})

test('event handler is called twice', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    likes: '10'
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
