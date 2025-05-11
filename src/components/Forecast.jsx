import React from 'react';
import { formatDate, formatWindSpeed } from '../helpers/weatherHelpers';
import './Forecast.scss';

const Forecast = ({ forecastDays, loading, error }) => {
  if (loading) {
    return (
      <div className="forecast loading">
        <div className="loading-icon">
          <div className="spinner"></div>
          <div className="loading-text">Loading forecast data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="forecast error">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!forecastDays || forecastDays.length === 0) return null;

  return (
    <div className="Forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{formatDate(day.displayDate)}</div>

            {/* Day Section */}
            <div className="forecast-temp day-temp">
              {day.maxTemperature?.degrees !== undefined && (
                <>{Math.round(day.maxTemperature.degrees)}°</>
              )}
              <img
                className="weather-icon"
                src={`${day.daytimeForecast?.weatherCondition?.iconBaseUri || ''}.png`}
                alt={day.daytimeForecast?.weatherCondition?.description?.text || ''}
              />
            </div>
            <div className="forecast-description day-description">
              {day.daytimeForecast?.weatherCondition?.description?.text || ''}
            </div>

            <div className="break-line"></div>

            {/* Night Section */}
            <div className="night-label">Night</div>
            <div className="forecast-temp night-temp">
              {day.minTemperature?.degrees !== undefined && (
                <>{Math.round(day.minTemperature.degrees)}°</>
              )}
              <img
                className="weather-icon"
                src={`${day.nighttimeForecast?.weatherCondition?.iconBaseUri || ''}.png`}
                alt={day.nighttimeForecast?.weatherCondition?.description?.text || ''}
              />
            </div>
            <div className="forecast-description night-description">
              {day.nighttimeForecast?.weatherCondition?.description?.text || ''}
            </div>

            {/* Additional Details */}
            <div className="forecast-details">
              {day.daytimeForecast?.wind?.speed?.value !== undefined && (
                <div className="detail-item">
                  <span className="label">Wind:</span>
                  <span className="value">
                    {day.daytimeForecast.wind.speed.value}{' '}
                    {formatWindSpeed(day.daytimeForecast.wind.speed)}
                  </span>
                </div>
              )}
              {day.daytimeForecast?.relativeHumidity !== undefined && (
                <div className="detail-item">
                  <span className="label">Humidity:</span>
                  <span className="value">{day.daytimeForecast.relativeHumidity}%</span>
                </div>
              )}
              {day.daytimeForecast?.uvIndex !== undefined && (
                <div className="detail-item">
                  <span className="label">UV Index:</span>
                  <span className="value">{day.daytimeForecast.uvIndex}</span>
                </div>
              )}
              {day.daytimeForecast?.precipitation?.probability?.percent !== undefined && (
                <div className="detail-item">
                  <span className="label">Precip:</span>
                  <span className="value">
                    {day.daytimeForecast.precipitation.probability.percent}%
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
