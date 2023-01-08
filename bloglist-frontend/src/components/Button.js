const Button = ({handler, text, blog=null, color, visible='' }) => {
  const buttonStyle = {
    paddingLeft: 1,
    borderWidth: 1,
    marginBottom: 5,
    background: color,
    borderColor: 'black',
    display: visible,
    
  }

    return (
      <button value={blog ? blog.id : ''} onClick={handler} style={buttonStyle}>
        {text}
      </button>
    )
}

export default Button