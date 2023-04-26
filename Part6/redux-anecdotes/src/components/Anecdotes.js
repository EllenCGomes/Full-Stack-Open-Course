import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"


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
    const anecdotes = useSelector(state => state)

    return (
        <>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(vote(anecdote.id))} />
            )
            }
        </>
    )
}

export default Anecdotes