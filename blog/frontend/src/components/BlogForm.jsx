import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    await createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Publish blog</h2>
      <form onSubmit={addBlog}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          type="text"
          placeholder="Url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit" id="blogFormSubmitButton">Publish</button>
      </form>
    </>
  )
}

export default BlogForm