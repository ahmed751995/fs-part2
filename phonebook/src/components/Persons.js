const Persons = ({ persons, searchValue, handleDeletePerson }) =>
  persons
    .filter((person) =>
      searchValue
        ? person.name.toLowerCase().includes(searchValue.toLowerCase())
        : person
    )
    .map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDeletePerson(person.id)}>delete</button>
      </p>
    ));

export default Persons;
