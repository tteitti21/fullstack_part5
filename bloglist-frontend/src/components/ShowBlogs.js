import Button from './Button'
import PropTypes from 'prop-types'

const ShowBlogs = ({
  user, blogs, Blog, handleLogout,
  createBlog, Togglable,
  handleLike,
  handleRemove,
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
      <p>Currenty logged in as {user.name}: <Button handler={handleLogout} text='logout' /></p>
      <p>All blogs:</p>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id} style={blogStyle}>
            <div>
              <Togglable buttonLabel='view' title={blog.title}>
                <Blog key={blog.id} blog={blog} handleLike={handleLike}
                  handleRemove={handleRemove} userID={user.id} />
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

ShowBlogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  Blog: PropTypes.elementType.isRequired,
  handleLogout: PropTypes.func.isRequired,
  createBlog: PropTypes.node.isRequired,
  Togglable: PropTypes.elementType.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default ShowBlogs