import React, { useState, useEffect } from 'react';
import LocationSearch from './components/LocationSearch';
import CurrentConditions from './components/CurrentConditions';
import Forecast from './components/Forecast';
import { fetchCurrentConditions, fetchWeatherData } from './services/weatherService';
import './App.css';

const App = () => {
  const [location, setLocation] = useState({
    name: 'Vancouver BC',
    lat: 49.242387369932594,
    lng: -123.11504674837929,
  });
  const [currentConditions, setCurrentConditions] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lng) => {
    setLoading(true);
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentConditions(lat, lng),
        fetchWeatherData(lat, lng),
      ]);

      setCurrentConditions(currentData);
      setForecastData(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = ({ name, lat, lng }) => {
    setLocation({ name, lat, lng });
    fetchWeather(lat, lng);
  };

  // Initial load with default location (Vancouver)
  useEffect(() => {
    fetchWeather(location.lat, location.lng);
  }, []);

  return (
    <div className="app">
      <LocationSearch currentLocation={location.name} onLocationSelect={handleLocationSelect} />
      <CurrentConditions data={currentConditions} loading={loading} error={error} />
      <Forecast forecastDays={forecastData?.forecastDays} loading={loading} error={error} />
    </div>
  );
};

export default App;
