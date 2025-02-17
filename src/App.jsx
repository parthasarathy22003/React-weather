import { useState } from "react";
import "./App.css";
import SearchIcon from "../src/assets/search.png";
import ClearIcon from "../src/assets/clear.webp";
import CloudIcon from "../src/assets/cloud.jpg";
import DrizzleIcon from "../src/assets/drizzle.webp";
import HumidityIcon from "../src/assets/humidity.webp";
import RainIcon from "../src/assets/rain.webp";
import SnowIcon from "../src/assets/snow.webp";
import WindIcon from "../src/assets/wind.webp";

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude:</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude:</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={HumidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WindIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let api_key = "0a8beb06eed9c372c610c4b16fac24ac";
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(SnowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState("0");
  const [log, setLog] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [wind, setWind] = useState("0");

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIconMap = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  };

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);

      if (data.cod === "404") {
        console.error("City Not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      let weatherCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherCode] || ClearIcon);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" className="cityInput" placeholder="Search City" onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className="search-icon" onClick={search}>
            <img src={SearchIcon} alt="Search" height="20" width="20" />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} humidity={humidity} wind={wind} lat={lat} log={log} />
        <p className='copyright'>
          Designed by <span>Parthasarathy</span>
        </p>
      </div>
    </>
  );
}

export default App;
