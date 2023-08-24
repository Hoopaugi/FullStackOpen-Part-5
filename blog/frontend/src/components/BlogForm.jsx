const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
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
        <button type="submit">Publish</button>
      </form>
    </>
  )
}

export default BlogForm