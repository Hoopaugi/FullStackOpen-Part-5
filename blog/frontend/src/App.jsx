import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)

      setBlogs(blogs.concat(blog))

      setNotificationMessage(`Blog "${blog.title}" published!`)
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Something went wrong: ${error.response.data.error}`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')

    blogService.setToken(null)

    setUser(null)

    setNotificationMessage('Logged out')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    console.log(`Blog ${blog.id} liked`)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          login={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm 
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)

      setUser(loggedInUser)

      blogService.setToken(loggedInUser.token)
    }
  }, [])

  return (
    <div>
      <h1>Blog app</h1>
      <Notification message={notificationMessage} />
      <Notification message={errorMessage} error={true}/>
      {!user && loginForm()} 
      {user && <div>
        <span>{user.name} logged in</span><button onClick={handleLogout}>Logout</button>
          {blogForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)}/>
        )}
      </div>}
    </div>
  )
}

export default App