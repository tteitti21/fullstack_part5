import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <NotificationMessage message={notificationMessage}/>
      {user !== null ?
        <ShowBlogs user={user} blogs={blogs} Blog={Blog}/> :
        <LoginForm handleLogin={handleLogin} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}/>
      }
    </div>
  )
}

export default App
