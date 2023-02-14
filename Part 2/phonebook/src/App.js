import { useState, useEffect } from "react";
import peopleService from "./services/people"
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Form from "./components/Form";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    peopleService.getAll().then(initialList => {
      setPeople(initialList)
    });
  }, [])

  const updateContact = (event) => {

    const replace = people.find(person => person.name === newName);

    replace.number = newNumber;

    peopleService.update(replace.id, replace).then(() => {
      const newList = people.filter(person => event !== person.id);
      setPeople(newList);
    })
  }

  const addContact = (event) => {
    event.preventDefault();

    if (people.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to Phone Book. Would you like to replace the old number with a new one?`)) updateContact(event);

      setNewName("");
      setNewNumber("");

    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNewName("");
          setNewNumber("");
        })
    }
  };

  const deletePerson = (event) => {
    peopleService.getPerson(event).then(
      (returnedPerson) => {
        if (window.confirm(`Delete ${returnedPerson.data.name} ?`)) {
          peopleService.deletePerson(event).then(
            () => {
              const newList = people.filter(person => event !== person.id);
              setPeople(newList);
            }
          )
        }
      }
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilter = (event) => {
    setFilter(event.target.value)
  };

  const peopleToShow = filter === "" ? people : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phone Book</h1>
      <h2>New Contact</h2>
      <Form onSubmit={addContact} onChangeName={handleNameChange} nameValue={newName} onChangeNumber={handleNumberChange} numberValue={newNumber} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} value={filter} />
      <br />
      <Contact people={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
