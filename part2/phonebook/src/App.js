import { useState } from "react";

const PersonForm = ({ addName, newName, setNewName, newNum, setNewNum }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input value={newNum} onChange={(e) => setNewNum(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonList = ({ persons, search }) => {
  return (
    <div>
      {search === ""
        ? persons.map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
        : persons
            .filter((person) => {
              return person.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((person) => (
              <p key={person.id}>
                {person.name} {person.number}
              </p>
            ))}
    </div>
  );
};

const Filter = ({ search, setSearch }) => (
  <div>
    Filter shown with{" "}
    <input value={search} onChange={(e) => setSearch(e.target.value)} />
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [search, setSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
    };
    if (!persons.some((elem) => elem.name === newName)) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNum("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNum={newNum}
        setNewNum={setNewNum}
      />

      <h2>Numbers</h2>
      <PersonList persons={persons} search={search} />
    </div>
  );
};

export default App;
