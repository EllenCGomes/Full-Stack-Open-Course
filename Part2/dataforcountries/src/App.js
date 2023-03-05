
import { useState, useEffect } from "react";

import CountrySearch from "./components/CountrySearch";
import countryService from "./services/country"

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    countryService.getCountry()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const countriesToShow = value === "" ? null : countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  console.log("countries to show", countriesToShow);


  return (
    <div>
      <h1>Find Countries</h1>
      <br />
      <input placeholder="Search" value={value} onChange={handleChange} />
      <br />
      <br />
      <CountrySearch countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;
