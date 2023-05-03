import Notes from "./components/Notes";
import NewNote from "./components/NewNote"
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div >
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
}

export default App;
