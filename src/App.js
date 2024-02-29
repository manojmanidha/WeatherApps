import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiKey = 'c22d605561dd453b86f180252232812'
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
        alert('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      {/* <h1>Weather Application</h1> */}
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="green-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && (
        <div className='weather-div'>

          <div className='weather-card'>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>

          <div className='weather-card'>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>

          <div className='weather-card'>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
           
          <div className='weather-card'>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;