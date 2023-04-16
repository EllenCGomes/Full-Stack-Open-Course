import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    BlogForm.propTypes = {
        createBlog: PropTypes.func.isRequired,
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle("");
        setAuthor("");
        setUrl("");
    }

    return (
        <div>
            <h3>New Blog</h3>
            <form onSubmit={addBlog}>
                <input id="blog-input-title" style={{ marginBottom: "10px" }} placeholder="title" type="text" value={title} name="title" onChange={event => setTitle(event.target.value)} />
                <br />
                <input id="blog-input-author" style={{ marginBottom: "10px" }} placeholder="author" type="text" value={author} name="author" onChange={event => setAuthor(event.target.value)} />
                <br />
                <input id="blog-input-url" style={{ marginBottom: "10px" }} placeholder="url" type="text" value={url} name="url" onChange={event => setUrl(event.target.value)} />
                <br />
                <button id="newBlog-submit-button" type="submit" style={{ marginBottom: "10px" }}>Save</button>
            </form>
        </div>
    )
}

export default BlogForm