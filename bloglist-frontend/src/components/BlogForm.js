import { useState } from 'react'

const BlogForm = ({ handlePost }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form onSubmit={handlePost}>
      <h2>Create new blog</h2>
      <div>title
        <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>author
        <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>url
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button id='create-button' type="submit">create</button>
    </form>
  )
}

export default BlogForm