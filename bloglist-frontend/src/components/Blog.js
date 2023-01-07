import Button from './Button'

const Blog = ({ blog, handleLike }) => {

  return (
  <>
    <div>{blog.url}</div>
    <div>{blog.likes}</div>
    <div>{blog.author}</div>
    <Button handler={handleLike} text='like' blog={blog} />
  </>
  )
}

export default Blog