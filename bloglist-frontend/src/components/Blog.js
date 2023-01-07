const Blog = ({blog, Toggleable}) => (
  <>
    <div>{blog.url}</div>
    <div>{blog.likes}</div>
    <div>{blog.author}</div>
  </>
)

export default Blog