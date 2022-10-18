import axios from "axios";
import { useState, useEffect } from "react";

const Filter = ({ search, setSearch }) => (
  <div>
    Find a country{" "}
    <input value={search} onChange={(e) => setSearch(e.target.value)} />
  </div>
);

const CountriesList = ({ countries, search, setSearch }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDisplay country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            {country.name.common + "  "}
            <button onClick={() => setSearch(country.name.common)}>show</button>
          </div>
        ))
      )}
    </div>
  );
};

const CountryDisplay = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital : {country.capital.join(", ")}</p>
      <p>Area : {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter search={search} setSearch={setSearch} />
      <CountriesList
        search={search}
        countries={countries}
        setSearch={setSearch}
      />
    </div>
  );
}

export default App;
