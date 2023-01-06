const ShowBlogs = ({user, blogs, Blog, LogoutButton}) => {
    return (
      <div>
      <h2>blogs</h2>
      <p>Currenty logged in as {user.name}: {LogoutButton}</p>
      
      <p>All blogs:</p>
        <ul>
            {blogs.map( blog =>
                <li key={blog.id} style={{padding:'2%'}}>
                    <Blog key={blog.id} blog={blog} />
                </li>
            )}
        </ul>
      </div>
    )
}

export default ShowBlogs