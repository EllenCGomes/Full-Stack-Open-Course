import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        vote(state, action) {
            return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
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

export const updateVote = (id, object) => {
    return async dispatch => {
        const anecdoteToVote = {
            ...object,
            votes: object.votes + 1
        }
        const anecdoteVoted = await anecdoteService.updateVote(id, anecdoteToVote)
        dispatch(vote(anecdoteVoted))
    }
}

export default anecdoteSlice.reducer