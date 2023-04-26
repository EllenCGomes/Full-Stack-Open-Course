import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        dispatch(createNote(content))
    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">Save</button>
        </form>
    )
}

export default NewNote