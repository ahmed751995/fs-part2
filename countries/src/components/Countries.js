import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {

  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const toggleShow = (country) => {
    setSelectedCountry({...country});
  };
  
  if (countries.length === 0) {
    if(selectedCountry) setSelectedCountry(null);
    return <div></div>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div>
              <p key={country.area}>{country.name.official}
                <button onClick={() => toggleShow(country)}>"Show"</button>
              </p>
            </div>
          );
        })}
        {selectedCountry? <Country country={selectedCountry}/>: ''}
      </div>
    );
  } else {
    return <div>Too many cities to display</div>;
  }
};

export default Countries;
