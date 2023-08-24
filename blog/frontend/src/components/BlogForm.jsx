const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <form onSubmit={addBlog}>
      Title: <input
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      Author: <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      Url: <input
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">Publish</button>
    </form>  
  )
}

export default BlogForm