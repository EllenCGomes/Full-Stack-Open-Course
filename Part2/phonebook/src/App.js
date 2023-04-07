import { useState, useEffect } from "react";
import peopleService from "./services/people"
import Contact from "./components/Contact";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import "./index.css"

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [addedMessage, setAddedMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll().then(initialList => {
      setPeople(initialList)
    });
  }, [])

  const updateContact = (event) => {

    const replace = people.find(person => person.name.toLowerCase() === newName.toLowerCase());

    replace.number = newNumber;

    peopleService.update(replace.id, replace).then(() => {
      const newList = people.filter(person => event !== person.id);
      setPeople(newList);
    })
  }

  const addContact = (event) => {
    event.preventDefault();

    if (people.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to Phone Book. Would you like to replace the old number with a new one?`)) {
        updateContact(event);
      }

      setNewName("");
      setNewNumber("");

    } else {
      const personObject = {
        name: newName[0].toUpperCase() + newName.substring(1),
        number: newNumber
      };

      peopleService
        .create(personObject)
        .then(returnedPerson => {
          setPeople(people.concat(returnedPerson))
          setNewName("");
          setNewNumber("");
          setAddedMessage(`Added ${personObject.name}`)
          setTimeout(() => {
            setAddedMessage(null)
          }, 2000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
        })
    }
  };

  const deletePerson = (event) => {
    const newList = people.filter(person => event !== person.id);
    peopleService.getPerson(event).then(
      (returnedPerson) => {
        if (window.confirm(`Delete ${returnedPerson.data.name} ?`)) {

          peopleService.deletePerson(event)
            .then(() => {
              setPeople(newList)
            })

        }
      }
    )
      .catch(error => {
        const deletedPerson = people.find(person => person.id === event);
        setErrorMessage(`Information of ${deletedPerson.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
        setPeople(newList)
      })
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
      <Notification message={addedMessage} />
      <Notification message={errorMessage} />
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
