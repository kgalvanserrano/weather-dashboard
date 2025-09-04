// single card
// renders a div and maps items to forecastcard

import ForecastCard from "./ForecastCard";

function ForecastList({ forecastData }) {
  // forecastData is expected to be an array of daily forecast objects from the weather API
  if (!forecastData || forecastData.length === 0) {
    return <p>No forecast data available</p>;
  }

  return (
    <div className="forecast-list">
      {forecastData.map((day, index) => (
        <ForecastCard
          key={index}
          dateLabel={day.dateLabel}
          temp={day.temp}
          iconUrl={day.iconUrl}
          description={day.description}
        />
      ))}
    </div>
  );
}

export default ForecastList;
