import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getAnecdotes, createAnecdote, updateVote } from "./requests"

const App = () => {

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
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
