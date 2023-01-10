import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible} className='OnlyTitleIsShown'>
        {props.title ? props.title: ''}
        <button onClick={toggleVisibility} className={'showButton'} >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='AllFieldsShown'>
        {props.title ? props.title: ''}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Togglable