import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { searchPlaces, getPlaceDetails } from '../services/placesService';
import './LocationSearch.css';

const LocationSearch = ({ currentLocation, onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const searchTimeout = useRef(null);

  const handleSearch = async value => {
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      try {
        const predictions = await searchPlaces(value);
        setResults(predictions);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching places:', error);
        setResults([]);
      }
    }, 300);
  };

  const handleSelectPlace = async place => {
    try {
      const details = await getPlaceDetails(place.place_id);
      if (details?.geometry?.location) {
        onLocationSelect({
          name: place.description,
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
        });
        setQuery(place.description);
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  return (
    <div className="location">
      <h1 className="location-title">{currentLocation}</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search location..."
          autoComplete="off"
        />
        {isOpen && results.length > 0 && (
          <div className="autocomplete-results">
            {results.map((place, index) => (
              <div
                key={place.place_id}
                className={`autocomplete-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSelectPlace(place)}
                onMouseOver={() => setSelectedIndex(index)}
              >
                <span className="location-icon">📍</span>
                <div>
                  <div className="main-text">{place.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

LocationSearch.propTypes = {
  currentLocation: PropTypes.string.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
};

export default LocationSearch;
