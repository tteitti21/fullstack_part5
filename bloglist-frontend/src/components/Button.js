const Button = ({handler, text, blog=null }) => {
    return (
      <button value={blog ? blog.id : ''} onClick={handler} >
        {text}
      </button>
    )
}

export default Button