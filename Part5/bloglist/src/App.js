import { useEffect, useState, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Toggle from "./components/Toggle";
import BlogForm from "./components/BlogForm";
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


  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef();

  const addBlog = async (newBlog) => {

    blogFormRef.current.toggleVisibility()

    await blogService.create(newBlog);


    // setBlogs(blogs.concat(blog))
    // console.log("blogs", blogs);
    setAddedMessage(`Saved blog "${newBlog.title}" by ${newBlog.author}!`)
    setTimeout(() => {
      setAddedMessage(null)
    }, 5000)

  }

  const addLike = async (blog, id) => {

    await blogService.update(blog, id);

  }

  const deleteBlog = async (id) => {

    await blogService.remove(id);

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

  const handleLogout = () => {
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
          <br />
          <Toggle buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggle>
          <h3>Blogs</h3>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} updateLike={addLike} deleteBlog={deleteBlog} />)}
        </div>
      }

    </div>
  );
}

export default App;
