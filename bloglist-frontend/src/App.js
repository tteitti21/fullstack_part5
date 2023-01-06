import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotificationMessage('Logged in')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)

    } catch (exception) {
      setNotificationMessage('Wrong username or password')
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

 const handlePost = async (event) => {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const newBlog = Object.fromEntries(formData)
  const response = blogService.postBlog(newBlog)

  if (response) {
    const refreshBlogs = await blogService.getAll()
    setBlogs(refreshBlogs)
    setNotificationMessage('New blog created')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }
 }

  return (
    <div>
      <NotificationMessage message={notificationMessage}/>
      {user !== null ?
        <ShowBlogs user={user} blogs={blogs} Blog={Blog} 
        LogoutButton={<LogoutButton handleLogout={handleLogout}/>}
        createBlog={<BlogForm handlePost={handlePost} title={title} author={author} url={url} 
        setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>}
        /> 
        :
        <LoginForm handleLogin={handleLogin} username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        />
      }
    </div>
  )
}

export default App
