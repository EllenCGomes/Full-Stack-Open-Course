import { useState } from "react";
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName("");
      setNewNumber("");
    } else {
      const personObject = {
        name: newName,
        phone: newNumber,
      }
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilter = (event) => {
    setFilter(event.target.value)
  };

  const personsToShow = filter === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>New Contact</h2>
      <Form onSubmit={addContact} onChangeName={handleNameChange} nameValue={newName} onChangeNumber={handleNumberChange} numberValue={newNumber} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} value={filter} />
      <br />
      <Contact persons={personsToShow} />
    </div>
  );
}

export default App;
