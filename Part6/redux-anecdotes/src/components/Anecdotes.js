import { useDispatch, useSelector } from "react-redux"
import { updateVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div style={{ border: "1px solid black", marginBottom: "15px", padding: "10px" }}>
            "{anecdote.content}"
            <p>has {anecdote.votes} votes</p>
            <button onClick={handleClick}>Vote</button>
        </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter) {
            return anecdotes.filter(anecdote => anecdote.content.includes(filter))
        }
        return anecdotes
    })

    return (
        <>
            {anecdotes.slice().sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => {
                    dispatch(updateVote(anecdote.id, anecdote))
                    dispatch(setNotification(`You voted the anecdote '${anecdote.content}'`, 5))
                }} />
            )
            }
        </>
    )
}

export default Anecdotes