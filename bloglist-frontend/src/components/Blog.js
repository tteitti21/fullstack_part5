import Button from './Button'

const Blog = ({ blog, handleLike, handleRemove, userID }) => {

  const visible = userID === blog.user.id ? '' : 'none'

  return (
    <div>
      <div>{blog.url}</div>
      <div id='likes' >{blog.likes}</div>
      <div>{blog.author}</div>
      <Button handler={handleLike} text='like' blog={blog}
        color='green' id='like-button' />
      <Button handler={handleRemove} text='remove' blog={blog}
        color='red' visible={visible} id='remove-button' />
    </div>
  )
}

export default Blog