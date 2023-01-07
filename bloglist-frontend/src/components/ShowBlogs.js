import Button from './Button'

const ShowBlogs = ({
  user, blogs, Blog, handleLogout, 
  createBlog, Togglable,
  handleLike 
  }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  
    return (
      <div>
      <h2>blogs</h2>
      <p>Currenty logged in as {user.name}: <Button handler={handleLogout} text='logout'/></p>
      <p>All blogs:</p>
        <ul>
          {sortedBlogs.map( blog =>
            <li key={blog.id} style={blogStyle}>
              <div>
              <Togglable buttonLabel='view' title={blog.title}>
                <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
              </Togglable>
              </div>
            </li>
          )}
        </ul> 
        <Togglable buttonLabel='new blog'>
          {createBlog}
        </Togglable>
      </div>
    )
}

export default ShowBlogs