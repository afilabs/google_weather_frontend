import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URI;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCurrentConditions = async (latitude, longitude) => {
  try {
    const response = await api.get('/current-conditions', {
      params: {
        latitude,
        longitude,
      },
    });

    if (!response.data) {
      throw new Error('No current conditions data available');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await api.get('/forecast', {
      params: {
        latitude,
        longitude,
        days: 5,
      },
    });

    if (!response.data.forecastDays || response.data.forecastDays.length === 0) {
      throw new Error('No forecast data available');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
