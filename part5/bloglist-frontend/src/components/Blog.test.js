import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blogs', () => {
  const currentUser = {
    name: 'walter',
    username: 'walli'
  }
  const blog = {
    title: 'Test blog title',
    author: 'Test author',
    url: 'Test url',
    likes: 5,
    user: currentUser
  }
  const blogLike = jest.fn()
  const blogRemove = jest.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        currentUser={currentUser}
        blogLike={blogLike}
        blogRemove={blogRemove}
      />
    )
  })

  test('renders the blog title and author, but not its URL and likes by default', async () => {
    const elementTitle = screen.getByText('Test blog title', { exact: false })
    const elementAuthor = screen.getByText('Test author', { exact: false })
    const elementUrl = screen.queryByText('Test author')
    const elementLikes = screen.queryByText('Likes:')

    expect(elementTitle).toBeDefined()
    expect(elementAuthor).toBeDefined()
    expect(elementUrl).toBeNull()
    expect(elementLikes).toBeNull()
  })

  test('renders the blog URL and likes when clicking "view" button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const elementUrl = screen.getByText('Test url', { exact: false })
    const elementLikes = screen.getByText('likes:', { exact: false })

    expect(elementUrl).toBeDefined()
    expect(elementLikes).toBeDefined()
  })

  test('"like" button is clicked twice, event handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogLike.mock.calls).toHaveLength(2)
  })

})