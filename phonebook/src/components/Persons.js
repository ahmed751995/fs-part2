const Persons = ({ persons, searchValue }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ));

export default Persons;