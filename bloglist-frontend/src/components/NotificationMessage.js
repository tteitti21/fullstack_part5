const NotificationMessage = ({ message, type=false }) => {
  
  const failStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    }

    if (message === null) {
      return null
    }
    else if (type) {
      return (
        <div style={successStyle}>
          {message}
        </div>
      )
    }
    else {
      return (
        <div className="error" style={failStyle}>
          {message}
        </div>
      )
    }
  }

export default NotificationMessage