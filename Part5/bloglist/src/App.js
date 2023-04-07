import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import "./index.css"
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");


  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const blog = await blogService.create(newBlog);

    setBlogs(blogs.concat(blog))
    setAddedMessage(`Saved blog "${newBlog.title}" by ${newBlog.author}!`)
    setTitle("")
    setAuthor("")
    setUrl("")
    setTimeout(() => {
      setAddedMessage(null)
    }, 5000)

  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      // values saved to the local storage are DOM string, so we cannot save a JS object. The object has to be parsed to JSON first with the method JSON.stringify. When a JSON object is read from the local storage, it has to be parsed back to JS with JSON.parse

      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    window.localStorage.clear()
    setUser(null)
    setUsername("")
    setPassword("")
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <input style={{ marginBottom: "10px" }} placeholder="username" type="text" value={username} name="username" onChange={({ target }) => {
        setUsername(target.value)
      }} />
      <br />
      <input style={{ marginBottom: "10px" }} placeholder="password" type="password" value={password} name="password" onChange={({ target }) => {
        setPassword(target.value)
      }} />
      <br />
      <button type="submit">Login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input style={{ marginBottom: "10px" }} placeholder="title" type="text" value={title} name="title" onChange={({ target }) => {
        setTitle(target.value)
      }} />
      <br />
      <input style={{ marginBottom: "10px" }} placeholder="author" type="text" value={author} name="author" onChange={({ target }) => {
        setAuthor(target.value)
      }} />
      <br />
      <input style={{ marginBottom: "10px" }} placeholder="url" type="text" value={url} name="url" onChange={({ target }) => {
        setUrl(target.value)
      }} />
      <br />
      <button type="submit" style={{ marginBottom: "10px" }}>Save</button>
    </form>
  )

  return (
    <div>
      <Notification message={addedMessage} />
      <Notification message={errorMessage} />

      {!user &&
        <div>
          <h3>Log in</h3>
          {loginForm()}
        </div>
      }
      {user &&
        <div>
          <div>
            {user.name} is logged in
            <button onClick={handleLogout} style={{ marginLeft: "20px" }}>Logout</button>
          </div>
          <h3>New Blog</h3>
          {blogForm()}
          <h3>Blogs</h3>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)}
        </div>
      }

    </div>
  );
}

export default App;
