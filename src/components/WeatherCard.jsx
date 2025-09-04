// destructured props
function WeatherCard({ temperature, city, weatherIcon }) {
  return (
    <div className="weather-card">
      <h1>{temperature}</h1>
      <h1>{city}</h1>
      {weatherIcon ? (
        <img src={weatherIcon} alt="weather icon" />
      ) : (
        <h1>No icon</h1>
      )}
    </div>
  );
}


export default WeatherCard;