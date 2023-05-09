import { useState } from "react"
import {
    useNavigate
} from 'react-router-dom'

const AnecdoteForm = (props) => {
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            url,
            votes: 0
        })
        navigate("/")
    }

    return (
        <div style={{ width: "250px" }}>
            <h2>Create New Anecdote</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "15px", display: "flex", flexDirection: "column", padding: "10px" }}>
                <input name="content" value={content} placeholder="content" onChange={(e) => setContent(e.target.value)} style={{ marginBottom: "15px", paddingLeft: "5px" }} />
                <input name="author" value={author} placeholder="author" onChange={(e) => setAuthor(e.target.value)} style={{ marginBottom: "15px", paddingLeft: "5px" }} />
                <input name="url" value={url} placeholder="url" onChange={(e) => setUrl(e.target.value)} style={{ marginBottom: "15px", paddingLeft: "5px" }} />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm