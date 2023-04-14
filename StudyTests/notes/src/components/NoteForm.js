import { useState } from "react"

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState("")

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: true
        })

        setNewNote("")
    }

    return (
        <div className="formDiv">
            <h3>Create a new note</h3>
            <form onSubmit={addNote}>
                <input id="note-form-input" placeholder="write note content here" value={newNote} onChange={event => setNewNote(event.target.value)} />
                <button id="note-form-button" type="submit">Save</button>
            </form>
        </div>
    )
}

export default NoteForm