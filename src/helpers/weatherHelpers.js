export const formatDate = dateObj => {
  if (!dateObj) return '';
  const { year, month, day } = dateObj;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatWindSpeed = speed => {
  if (speed?.unit === 'KILOMETERS_PER_HOUR') {
    return 'km/h';
  }
  return speed?.unit || '';
};

export const getWindDescription = (speed, direction) => {
  const windSpeed = speed?.value || 0;

  // Using Beaufort Wind Scale (adapted for km/h)
  if (windSpeed < 2) return 'Calm';
  if (windSpeed < 6) return 'Light Air';
  if (windSpeed < 12) return 'Light Breeze';
  if (windSpeed < 20) return 'Gentle Breeze';
  if (windSpeed < 29) return 'Moderate Breeze';
  if (windSpeed < 39) return 'Fresh Breeze';
  if (windSpeed < 50) return 'Strong Breeze';
  if (windSpeed < 62) return 'High Wind';
  if (windSpeed < 75) return 'Gale';
  if (windSpeed < 89) return 'Strong Gale';
  if (windSpeed < 103) return 'Storm';
  if (windSpeed < 118) return 'Violent Storm';
  return 'Hurricane Force';
};

export const getUVDescription = uvIndex => {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
};
