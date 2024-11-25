import React, { useState } from 'react';
import './App.css';

function WeatherReport() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError('');
    setLoading(true);

    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch weather data. Try again.');
        setLoading(false);
      });
  };

  return (
    <div className="app">

<video
        autoPlay
        loop
        muted
        className="video-background"
        src="https://cdn.pixabay.com/video/2024/09/13/231076_large.mp4"
        type="video/mp4"
      ></video>


      <h1>Weather Now</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather.current_weather && (
        <div className="weather-info">
          <h2>Current Weather in {city}</h2>
          <p>Temperature: {weather.current_weather.temperature}°C</p>
          <p>Weather Code: {weather.current_weather.weathercode}</p>
          <p>Wind Speed: {weather.current_weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherReport;
