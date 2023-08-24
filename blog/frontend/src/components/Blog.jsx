import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <span>{blog.title}</span>
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={showWhenVisible} className='blog'>
        <span>"{blog.title}" by {blog.author}</span>
        <button onClick={toggleVisibility}>Hide</button>
        <p>{blog.url}</p>
        <p>likes {blog.likes}<button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        {handleDelete && <button onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  )
}

export default Blog