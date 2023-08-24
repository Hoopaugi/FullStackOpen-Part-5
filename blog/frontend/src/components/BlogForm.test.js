import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'Test Url'
}

test('<BlogForm /> updates parent state and calls onSubmit with right parameters', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')

  const publishButton = container.querySelector('#blogFormSubmitButton')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  await user.click(publishButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})