import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notifyNewAnecdote } from "../reducers/notificationReducer"

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ""
        dispatch(createAnecdote(content))
        dispatch(notifyNewAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote} style={{ marginBottom: "15px" }}>
            <input placeholder="Write your anecdote here..." style={{ marginRight: "10px" }} name="content" />
            <button type="submit">Save</button>
        </form>
    )
}

export default AnecdotesForm