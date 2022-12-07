import Weather from "./Weather";

function Country({ country }) {
  
  return (
    <div>
      <h1>{country.translations.ara.official}</h1>
      <h1>{country.name.official}</h1>
      <p>
        <strong>Capital</strong> {country.capital?.[0]}
      </p>
      <p>Area {country.area}</p>
      <p>
        <strong>Languages: </strong>
      </p>
      <ul>
        {Object.keys(country.languages).map((lang, i) => (
          <li key={i}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt="flag" width="300" height="200" />
      <Weather
        country={country}
      />
    </div>
  );
}

export default Country;
