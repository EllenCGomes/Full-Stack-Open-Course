import Anecdotes from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesForm />
      <Anecdotes />
    </div>
  );
}

export default App;
