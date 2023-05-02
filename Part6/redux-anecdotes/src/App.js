import Anecdotes from "./components/Anecdotes";
import AnecdotesForm from "./components/AnecdotesForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
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
