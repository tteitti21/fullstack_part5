const Button = ({ handler, text, blog = null, color, visible = '', id=null }) => {
  const buttonStyle = {
    paddingLeft: 1,
    borderWidth: 1,
    marginBottom: 5,
    background: color,
    borderColor: 'black',
    display: visible,
  }

  return (
    <button id={id} value={blog ? blog.id : ''} onClick={handler} style={buttonStyle}>
      {text}
    </button>
  )
}

export default Button