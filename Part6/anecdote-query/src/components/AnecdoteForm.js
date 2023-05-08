import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useAnecdoteDispatch } from "../AnecdoteContext"

const AnecdoteForm = () => {
    const dispatch = useAnecdoteDispatch()
    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation(createAnecdote, {
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData("anecdotes")
            queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
        },
        onError: () => {
            dispatch({ type: "SET_MESSAGE", payload: "Error! Anecdote must have at least 5 characters" })
            setTimeout(() => dispatch({ type: "REMOVE_MESSAGE" }), 5000)
        }
    })

    const onCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({
            content: content,
            votes: 0
        })
        dispatch({ type: "SET_MESSAGE", payload: `You added the anecdote "${content}"` })
        setTimeout(() => dispatch({ type: "REMOVE_MESSAGE" }), 5000)

    }

    return (
        <div>
            <form onSubmit={onCreate} style={{ marginBottom: "15px" }}>
                <input name='anecdote' />
                <button style={{ marginLeft: "15px" }} type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm