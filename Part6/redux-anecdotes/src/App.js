import Anecdotes from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesForm />
      <Filter />
      <Anecdotes />
    </div>
  );
}

export default App;
