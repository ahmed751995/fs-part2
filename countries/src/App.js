import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  useEffect(() => {
    if (search.length > 0) {
      setTimeout(() => {
        axios
          .get(`https://restcountries.com/v3.1/name/${search}`)
          .then((response) => {
            setCountries(response.data);
          })
          .catch((err) => setCountries([]));
      }, 2000);
    } else {
      setCountries([]);
    }
  }, [search]);

  return (
    <div>
      <input value={search} onChange={onSearchChange} />
      <Countries countries={countries} />
    </div>
  );
}

export default App;
