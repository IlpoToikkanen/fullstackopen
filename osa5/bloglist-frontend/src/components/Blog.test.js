import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const testUser = {
    username: 'Tester',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1c3NlMiIsImlkIjoiNWRjMTcxMjI4MzA2YmEwNTI0YTE4ZjIyIiwiaWF0IjoxNTc0NDE3ODQwfQ.5Zz-CK92mPGTUK1Bg_BWxRIocFY9CBgVO9HGRnfEruQ'
  }

  const testBlog = {
    title: 'Test Blog',
    author: 'Test author',
    url: 'testurl.com',
    user: testUser
  }

  beforeEach(() => {
    component = render(<Blog blog={testBlog} user={testUser} />)
  })

  test('only blog name and author are initially visible', () => {
    const div1 = component.container.querySelector('.smallView')
    const div2 = component.container.querySelector('.extendedView')

    expect(div1).toHaveTextContent('Test Blog Test author')
    expect(div2).toHaveStyle('display: none')
  })

  test('by clicking the name and author, extended blog is shown', () => {
    const title = component.container.querySelector('.smallView')
    fireEvent.click(title)

    const extended = component.container.querySelector('.extendedView')
    expect(extended).not.toHaveStyle('display: none')
  })
})
