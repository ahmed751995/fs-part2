import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (country) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setTemp(response.data.main.temp);
          setIcon(response.data.weather[0].icon);
        });
    }
  }, [lat, lon, country, api_key]);

  return (
    <div>
      <h3>Weather in {country.name.official}</h3>
      <p>temperature {temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather"
      />
    </div>
  );
};

export default Weather;
