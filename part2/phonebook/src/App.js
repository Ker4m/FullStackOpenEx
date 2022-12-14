import { type } from "@testing-library/user-event/dist/type";
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

const Notification = ({ info }) => {
  if (info === null) {
    return null;
  }

  const { type, message } = info;
  return <div className={type}>{message}</div>;
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
  const [notifMessage, setNotifMessage] = useState(null);

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
        setNotifMessage({ type: "notif", message: `${newName} added` });
        setTimeout(() => {
          setNotifMessage(null);
        }, 5000);
        setNewName("");
        setNewNum("");
      });
    } else {
      if (newNum === "") alert(`${newName} is already added to phonebook`);
      else {
        const newPerson = persons.find((pers) => pers.name === newName);
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`
          )
        ) {
          personService
            .update(newPerson.id, {
              ...newPerson,
              number: newNum,
            })
            .then(() => {
              setPersons(
                persons.map((pers) =>
                  pers.id === newPerson.id
                    ? {
                        ...newPerson,
                        number: newNum,
                      }
                    : pers
                )
              );
            })
            .catch(() => {
              setNotifMessage({
                type: "error",
                message: `Information of ${newName} has already been removed from server`,
              });
              personService.getAll();
              setTimeout(() => {
                setNotifMessage(null);
              }, 5000);
            });

          setNotifMessage({
            type: "notif",
            message: `${newName}'s number updated`,
          });
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
          setNewName("");
          setNewNum("");
        }
      }
    }
  };

  const onDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .remove(id)
        .then((res) => {
          setNotifMessage({
            type: "notif",
            message: `${name} deleted`,
          });
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
          setPersons(persons.filter((pers) => pers.id !== id));
        })
        .catch((err) => {
          setNotifMessage({
            type: "error",
            message: `Information of ${name} has already been removed from server`,
          });
          personService.getAll();
          setTimeout(() => {
            setNotifMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification info={notifMessage} />
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
