import React from 'react';
import { formatWindSpeed, getWindDescription, getUVDescription } from '../helpers/weatherHelpers';
import './CurrentConditions.scss';

const CurrentConditions = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="current-conditions loading">
        <div className="loading-icon">
          <div className="spinner"></div>
          <div className="loading-text">Loading weather data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="current-conditions error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    temperature,
    feelsLikeTemperature,
    weatherCondition,
    wind,
    relativeHumidity,
    uvIndex,
    dewPoint,
    currentConditionsHistory,
  } = data;

  return (
    <div className="CurrentConditions">
      <h2>Current Conditions</h2>
      <div className="conditions-grid">
        <div className="condition-card temperature-card">
          <div className="card-column">
            <div className="now-label">Now</div>
            <div className="temp-container">
              {temperature?.degrees !== undefined && (
                <div className="main-temp">{Math.round(temperature.degrees)}°</div>
              )}
              <img
                className="current-weather-icon"
                src={`${weatherCondition?.iconBaseUri || ''}.png`}
                alt={weatherCondition?.description?.text || ''}
              />
            </div>
            <div className="high-low">
              {currentConditionsHistory?.maxTemperature?.degrees !== undefined && (
                <>High: {Math.round(currentConditionsHistory.maxTemperature.degrees)}° • </>
              )}
              {currentConditionsHistory?.minTemperature?.degrees !== undefined && (
                <>Low: {Math.round(currentConditionsHistory.minTemperature.degrees)}°</>
              )}
            </div>
          </div>
          <div className="card-column">
            <div className="weather-description">{weatherCondition?.description?.text || ''}</div>
            <div className="feels-like">
              {feelsLikeTemperature?.degrees !== undefined && (
                <>Feels like {Math.round(feelsLikeTemperature.degrees)}°</>
              )}
            </div>
          </div>
        </div>
        <div className="condition-card">
          <div className="card-title">Wind</div>
          <div className="card-value">
            {wind?.speed?.value !== undefined && (
              <>
                <span className="value">{wind.speed.value}</span>
                <span className="unit">{formatWindSpeed(wind.speed)}</span>
              </>
            )}
          </div>
          <div className="card-details">
            {wind?.speed?.value !== undefined && (
              <span style={{ paddingRight: 5 }}>
                {getWindDescription(wind.speed, wind?.direction)}
              </span>
            )}
            {wind?.direction?.cardinal && (
              <span className="wind-direction">
                {` • From ${wind.direction.cardinal.toLowerCase()}`}
              </span>
            )}
          </div>
        </div>
        <div className="condition-card">
          <div className="card-title">Humidity</div>
          <div className="card-value">
            {relativeHumidity !== undefined && (
              <>
                <span className="value">{relativeHumidity}</span>
                <span className="unit">%</span>
              </>
            )}
          </div>
          {dewPoint?.degrees && (
            <div className="card-details">Dew point {Math.round(dewPoint.degrees)}°</div>
          )}
        </div>
        <div className="condition-card">
          <div className="card-title">UV Index</div>
          <div className="card-value">
            {uvIndex !== undefined && <span className="value">{uvIndex}</span>}
          </div>
          {uvIndex !== undefined && <div className="card-details">{getUVDescription(uvIndex)}</div>}
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
