import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            const anecdoteToVote = state.find(anecdote => anecdote.id === id)
            const anecdoteVoted = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteVoted)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const initialAnecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(initialAnecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export default anecdoteSlice.reducer