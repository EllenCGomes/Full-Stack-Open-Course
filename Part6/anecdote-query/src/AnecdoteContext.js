import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return action.payload
        case "REMOVE_MESSAGE":
            return null
        default:
            return state
    }
}

const AnecdoteContext = createContext()

export const useAnecdoteValue = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[1]
}

export const AnecdoteContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(messageReducer, null)

    return (
        <AnecdoteContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export default AnecdoteContext