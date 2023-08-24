import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')  

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url })

      setBlogs(blogs.concat(blog))

      setTitle('')
      setAuthor('')
      setUrl('')

      setNotificationMessage(`Blog "${blog.title}" published!`)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return <LoginForm 
      handleLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password} 
      setPassword={setPassword} 
    />
  }

  const blogForm = () => {
    return <BlogForm 
      addBlog={addBlog}
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      url={url}
      setUrl={setUrl}
    />
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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
    </div>
  )
}

export default App