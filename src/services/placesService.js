import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URI;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchPlaces = async input => {
  try {
    const response = await api.get('/places', {
      params: {
        input
      },
    });
    return response.data.predictions;
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const getPlaceDetails = async placeId => {
  try {
    const response = await api.get('/place-details', {
      params: {
        placeId,
      },
    });
    return response.data.result;
  } catch (error) {
    if (error.response) {
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
