const ShowBlogs = ({user, blogs, Blog, LogoutButton, createBlog, Togglable}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
    return (
      <div>
      <h2>blogs</h2>
      <p>Currenty logged in as {user.name}: {LogoutButton}</p>
      
      <p>All blogs:</p>
        <ul>
          {blogs.map( blog =>
            <li key={blog.id} style={blogStyle}>
              <div>
              <Togglable buttonLabel='view' title={blog.title}>
                <Blog key={blog.id} blog={blog} Togglable={Togglable}/>
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