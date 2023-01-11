import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import NotificationMessage from './components/NotificationMessage'
import LoginForm from './components/LoginForm'
import ShowBlogs from './components/ShowBlogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [messageType, setMessageType] = useState(null)
  const [refresher, setRefresher] = useState(false)

  /** Fetches blogs */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [refresher])

  /** Gets auth-token from localstorage during first render if possible. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /** Reusable notification format */
  const notificationHandler = (text, type) => {
    setMessageType(type)
    setNotificationMessage(text)
    setTimeout(() => {
      setNotificationMessage(null)
      setMessageType(null)
    }, 3000)
   }

  /** Handler for LOGIN */
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
      notificationHandler('Logged in', true)
    } catch (exception) {
      notificationHandler('Wrong username or password', false)
    }
  }

 /** Handler for LOGOUT */
 const handleLogout = async (event) => {
  event.preventDefault()

  window.localStorage.removeItem('loggedInUser')
  setUser(null)
  notificationHandler('Logged out', true)
 }

 /** Handler for POST */
 const handlePost = async (event) => {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const newBlog = Object.fromEntries(formData)
  const response = blogService.postBlog(newBlog)

  if (response) {
    setRefresher(!refresher)
    notificationHandler('New blog created', true)
  }
 }

  /** Handler for LIKES */
  const handleLike = async (event) => {
    event.preventDefault()

    const oldBlog = blogs.filter(blog => blog.id === event.target.value)
 
    const updatedBlog = {
      title: oldBlog[0].title,
      author: oldBlog[0].author,
      url: oldBlog[0].url,
      likes: oldBlog[0].likes + 1,
      user: oldBlog[0].user,
      id: oldBlog[0].id
    }
    const response = await blogService.updateBlog(updatedBlog)

    if (response) {
      const array = blogs.filter(b => b.id !== updatedBlog.id)
      setBlogs(array.concat(updatedBlog))
      setRefresher(!refresher)
      notificationHandler('your like has been added', true)
    } 
 }

   /** Handler for DELETE */
   const handleRemove = async (event) => {
    event.preventDefault()

    const blog = blogs.filter(blog => blog.id === event.target.value)
    
    if (window.confirm(`Delete blog ${blog[0].title} ?`)) {
    try {
      const response = await blogService.deleteBlog(blog[0])
      if (response) {
        setRefresher(!refresher)
        notificationHandler('blog has been deleted', true)
      } 
    } catch (error) {
      notificationHandler('failed to delete blog', false)
    }
  }
 }

  return (
    <div>
      <NotificationMessage message={notificationMessage} type={messageType}/>
      {user !== null ?
        <ShowBlogs user={user} blogs={blogs} Blog={Blog} 
          handleLogout={handleLogout}
          handleLike={handleLike}
          handleRemove={handleRemove}
          createBlog={<BlogForm handlePost={handlePost}/>}
          Togglable={Togglable}
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
