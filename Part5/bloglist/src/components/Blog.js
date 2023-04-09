import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLike, deleteBlog }) => {
    const [visible, setVisible] = useState(false);

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        updateLike: PropTypes.func.isRequired,
        deleteBlog: PropTypes.func.isRequired
    }

    const showDetails = () => {
        setVisible(!visible)
    };

    const addLike = (event) => {
        event.preventDefault()

        updateLike({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        }, blog.id)
    }

    const removeBlog = (event) => {
        event.preventDefault()

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            deleteBlog(blog.id)
        }

    }

    const display = { display: visible ? "" : "none" };

    return (
        <div style={{ marginBottom: "10px", border: "1px solid black", padding: 8 }}>
            <div style={{ marginBottom: "5px" }}>
                {blog.title} - {blog.author}
                <button onClick={showDetails} style={{ marginLeft: "10px" }}>{visible ? "hide" : "view"}</button>
            </div>
            <div style={display}>
                <div style={{ marginBottom: "10px" }}>{blog.url}</div>
                <div style={{ marginBottom: "5px" }}>
                    Likes:
                    {blog.likes}
                    <button onClick={addLike} style={{ marginLeft: "10px" }}>like</button>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    {blog.user.name}
                </div>
                <button onClick={removeBlog}>Remove</button>
            </div>
        </div>
    )
}

export default Blog