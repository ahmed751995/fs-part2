import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";
import Notification from "./components/Noteification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState({ message: null });

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const addNewName = (event) => {
    event.preventDefault();

    //personService.getPersonByName(newName).then((response) => {
    //   if (response.data.length > 0) {
    //     const person = { ...response.data[0], number: newNumber };
    //     personService.updatePerson(person).then((response) => {
    //       setPersons(
    //         persons.map((person) =>
    //           person.id !== response.data.id ? person : { ...response.data }
    //         )
    //       );
    //     });
    //   } else {
    //     const person = {
    //       name: newName,
    //       number: newNumber,
    //     };
    //     personService
    //       .postPerson(person)
    //       .then((response) => {
    //         setPersons(persons.concat(response.data));
    //       })
    //       .catch((e) => alert(`can't add ${newName}`));
    //   }
    //   setNewName("");
    //   setNewNumber("");
    // });

    //other implementation

    const person = persons.find((person) => person.name === newName);
    if (person) {
      const updatedPerson = { ...person, number: newNumber };
      personService.updatePerson(updatedPerson).then((response) => {
        setPersons(
          persons.map((person) =>
            person.id !== response.data.id ? person : { ...response.data }
          )
        );
        setMessage({
          message: `person ${response.data.name} updated successfully`,
          type: "success",
        });
      });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .postPerson(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setMessage({
            message: `person ${response.data.name} added successfully`,
            type: "success",
          });
        })
        .catch((e) => setMessage(`somthing wrong happened`));
    }
    setNewName("");
    setNewNumber("");
    setTimeout(() => setMessage({message: null}), 3000);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person) {
      if (window.confirm(`are you sure you want to delete ${person.name}`)) {
        personService
          .deletePerson(person.id)
          .then(() => setPersons(persons.filter((p) => p.id !== person.id)))
          .catch((e) => {
            setMessage({message: `person ${person.name} already deleted from database` , type: "fail"});
            setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => setMessage({message: null}), 3000);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter value={searchValue} onChange={handleSearchValue} />
      <br />
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchValue={searchValue}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
