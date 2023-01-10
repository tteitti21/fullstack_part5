import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import ShowBlogs from './ShowBlogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

describe('Tests for blogs visibility functionality and forms call acting.', () => {
  let emptyHandler
  let blogs
  let user

  beforeEach(() => {
    emptyHandler = () => null
    blogs = [
      {
        id: '1',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: {
          id: '111'
        },
      }
    ]
    user = {
      id: '111',
      username: 'test',
    }
  })

  test('5.13. By default, only title should be rendered.', () => {

    const { container } = render(<ShowBlogs user={user} blogs={blogs} Blog={Blog}
      handleLogout={emptyHandler}
      handleLike={emptyHandler}
      handleRemove={emptyHandler}
      createBlog={<BlogForm handlePost={emptyHandler} />}
      Togglable={Togglable}
      userID={user.id}
    />)

    const onlyTitleIsShown = container.querySelector('.OnlyTitleIsShown')
    const allFieldsShown = container.querySelector('.AllFieldsShown')
    expect(allFieldsShown).toHaveStyle('display: none')
    expect(onlyTitleIsShown).not.toHaveStyle('display: none')
  })

  test('5.14. URL and likes are rendered when corresponding button is clicked.', async () => {

    const { container } = render(<ShowBlogs user={user} blogs={blogs} Blog={Blog}
      handleLogout={emptyHandler}
      handleLike={emptyHandler}
      handleRemove={emptyHandler}
      createBlog={<BlogForm handlePost={emptyHandler} />}
      Togglable={Togglable}
      userID={user.id}
    />)


    const mockUser = userEvent.setup()
    const button = container.querySelector('.showButton')
    await mockUser.click(button)

    const onlyTitleIsShown = container.querySelector('.OnlyTitleIsShown')
    const allFieldsShown = container.querySelector('.AllFieldsShown')
    expect(onlyTitleIsShown).toHaveStyle('display: none')
    expect(allFieldsShown).not.toHaveStyle('display: none')

  })

  test('5.15. If like-button is clicked twice, its handler gets also called twice', async () => {

    const mockHandler = jest.fn()

    render(<ShowBlogs user={user} blogs={blogs} Blog={Blog}
      handleLogout={emptyHandler}
      handleLike={mockHandler}
      handleRemove={emptyHandler}
      createBlog={<BlogForm handlePost={emptyHandler} />}
      Togglable={Togglable}
      userID={user.id}
    />)

    const mockUser = userEvent.setup()
    const likeButton = screen.getByText('like')

    await mockUser.click(likeButton)
    await mockUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

  test('5.16. Forms even handler should be called with proper details', async () => {

    const handlePost = jest.fn(e => e.preventDefault())
    const mockUser = userEvent.setup()

    render(<BlogForm handlePost={handlePost} />)

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('create')

    await mockUser.type(inputTitle, 'title test')
    await mockUser.type(inputAuthor, 'author test')
    await mockUser.type(inputUrl, 'url test')


    await userEvent.click(sendButton)


    const formData = new FormData(handlePost.mock.calls[0][0].target)
    const newBlog = Object.fromEntries(formData)

    expect(handlePost).toHaveBeenCalled()
    expect(handlePost.mock.calls).toHaveLength(1)
    expect(newBlog.title).toBe('title test')
    expect(newBlog.author).toBe('author test')
    expect(newBlog.url).toBe('url test')
  })
})