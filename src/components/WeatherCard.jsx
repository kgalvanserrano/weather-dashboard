import { useState } from "react";

// destructured props
function WeatherCard({ temperature, city, weatherIcon }) {
  return (
    <div className="weather-card">
      <h1>{temperature}</h1>
      <h1>{city}</h1>
      <h1>{weatherIcon}</h1>
    </div>
  );
}


export default WeatherCard;