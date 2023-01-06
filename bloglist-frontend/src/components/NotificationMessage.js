const NotificationMessage = ({ message, type=false }) => {
    if (message === null) {
      return null
    }
    else if (type) {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
    else {
      return (
        <div className='fail'>
          {message}
        </div>
      )
    }
  }



export default NotificationMessage