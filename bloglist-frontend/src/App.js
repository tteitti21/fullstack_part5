import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

 const handleLogout = async (event) => {
  event.preventDefault()

  window.localStorage.removeItem('loggedInUser')
  setUser(null)
  setNotificationMessage('Logged out')
  setTimeout(() => {
    setNotificationMessage(null)
  }, 3000)
 }

  return (
    <div>
      <NotificationMessage message={notificationMessage}/>
      {user !== null ?
        <ShowBlogs user={user} blogs={blogs} Blog={Blog} 
        LogoutButton={<LogoutButton handleLogout={handleLogout}/>}/> :
        <LoginForm handleLogin={handleLogin} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}/>
      }
    </div>
  )
}

export default App
