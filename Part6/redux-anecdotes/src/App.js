import Anecdotes from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdotesForm />
      <Filter />
      <Anecdotes />
    </div>
  );
}

export default App;
