import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'Test Url',
  likes: 0,
  user: {
    name: 'Test user',
    username: 'testuser'
  }
}

describe('<Blog />', () => {
  let container
  let mockLikeHandler = jest.fn()
  let mockDeleteHandler = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} />).container
  })

  test('renders only title and author when not shown', async () => {
    const div = container.querySelector('.blog')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking show, likes and url are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')

    await user.click(button)
    await user.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

  test('clicking the delete button calls event handler once', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Delete')

    await user.click(button)

    expect(mockDeleteHandler.mock.calls).toHaveLength(1)
  })
})

