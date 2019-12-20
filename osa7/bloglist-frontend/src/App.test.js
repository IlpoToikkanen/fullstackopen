import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    // expectations here
    expect(component.container.querySelectorAll('.blog').length).toBe(0)
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlB1c3NlMiIsImlkIjoiNWRjMTcxMjI4MzA2YmEwNTI0YTE4ZjIyIiwiaWF0IjoxNTc0NDE3ODQwfQ.5Zz-CK92mPGTUK1Bg_BWxRIocFY9CBgVO9HGRnfEruQ',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('logout'))

    expect(component.container.querySelectorAll('.blog').length).not.toBe(0)
  })
})
