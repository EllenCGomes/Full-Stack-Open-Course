
import { useAnecdoteDispatch } from "./AnecdoteContext"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnecdotes, updateVote } from "./requests"

const App = () => {
  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
    }
  })

  const result = useQuery("anecdotes", getAnecdotes, { retry: 1 })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service not available due to server issues</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
    dispatch({ type: "SET_MESSAGE", payload: `You voted the anecdote "${anecdote.content}"` })
    setTimeout(() => dispatch({ type: "REMOVE_MESSAGE" }), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id} style={{ border: "1px solid black", marginBottom: "15px", padding: "10px" }}>
          <div>
            "{anecdote.content}"
          </div>
          <div style={{ marginTop: "5px" }}>
            has {anecdote.votes} votes
            <button style={{ marginLeft: "15px" }} onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
