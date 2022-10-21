import { useState, useEffect } from "react";
import personService from "./Services/persons";

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

const PersonItem = ({ person, onDelete }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          onDelete(person.id, person.name);
        }}
      >
        Delete
      </button>
    </div>
  );
};

const PersonList = ({ persons, search, onDelete }) => {
  return (
    <div>
      {search === ""
        ? persons.map((person) => (
            <PersonItem key={person.id} person={person} onDelete={onDelete} />
          ))
        : persons
            .filter((person) => {
              return person.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((person) => (
              <PersonItem key={person.id} person={person} onDelete={onDelete} />
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
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

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
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNum("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  };

  const onDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService.remove(id);
      setPersons(persons.filter((pers) => pers.id !== id));
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
      <PersonList persons={persons} search={search} onDelete={onDelete} />
    </div>
  );
};

export default App;
