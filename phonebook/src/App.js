import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    for (let person of persons) {
      if (person.name === newName || person.number === newNumber) {
        alert(`${newName} or ${newNumber} already exists`);
        return;
      }
    }
    const name = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(name));
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
      <Persons persons={persons} searchValue={searchValue} />
    </div>
  );
};

export default App;
