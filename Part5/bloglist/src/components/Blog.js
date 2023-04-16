import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLike, deleteBlog }) => {
    const [visible, setVisible] = useState(false);
    const [isUser, setIsUser] = useState(false);

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        // updateLike: PropTypes.func.isRequired,
        // deleteBlog: PropTypes.func.isRequired
    }

    const showDetails = () => {
        setVisible(!visible)

        checkUser()
    };

    const checkUser = () => {
        const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))

        if (loggedUser.username === blog.user.username) setIsUser(!isUser)
        console.log(loggedUser);
    }

    const addLike = (event) => {
        event.preventDefault()

        updateLike({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        })
    }

    const removeBlog = (event) => {
        event.preventDefault()

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
            deleteBlog(blog.id)
        }

    }

    const display = { display: visible ? "" : "none" };

    const displayDeleteButton = { display: isUser ? "" : "none" }

    return (
        <div style={{ marginBottom: "10px", border: "1px solid black", padding: 8 }} className="blog">
            <div style={{ marginBottom: "5px" }}>
                {blog.title} - {blog.author}
                <button className="button" onClick={showDetails} style={{ marginLeft: "10px" }}>{visible ? "hide" : "view"}</button>
            </div>
            <div style={display} className="blogDetails">
                <div style={{ marginBottom: "10px" }}>{blog.url}</div>
                <div id="div-like" style={{ marginBottom: "5px" }}>
                    Likes:
                    {blog.likes}
                    <button className="buttonLike" onClick={addLike} style={{ marginLeft: "10px" }}>like</button>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    {blog.user.name}
                </div>
                <button style={displayDeleteButton} id="remove-button" onClick={removeBlog}>Remove</button>
            </div>
        </div>
    )
}

export default Blog