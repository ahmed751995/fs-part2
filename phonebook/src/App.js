import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
        })
        .catch((e) => alert(`can't add ${newName}`));
    }
    setNewName("");
    setNewNumber("");
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
    personService
      .getPersonById(id)
      .then((response) => {
        if (
          window.confirm(
            `are you sure you want to delete ${response.data.name}`
          )
        ) {
          personService
            .deletePerson(id)
            .then(() => setPersons(persons.filter((p) => p.id !== id)));
        }
      })
      .catch((e) => alert("person doesn't exists"));
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
