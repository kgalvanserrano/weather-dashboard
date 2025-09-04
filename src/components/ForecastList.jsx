// single card
// renders a div and maps items to forecastcard

import ForecastCard from "./ForecastCard";
import { useState } from "react";

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
          dateLabel={day.date}
          temp={day.temperature}
          iconUrl={day.icon}
          description={day.description}
        />
      ))}
    </div>
  );
}

export default ForecastList;
