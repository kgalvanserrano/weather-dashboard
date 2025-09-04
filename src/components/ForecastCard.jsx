// props : { dateLabel, temp, iconUrl, description }
// layout: image at top, date, temp, keep it simple
// accessibility: add alt text for icon using desc or date ${description} icon

// destructured props
function ForecastCard({ dateLabel, temp, iconUrl, description }) {
  return (
    <div className="weather-card">
      {iconUrl ? (
        <img src={iconUrl} alt={`Weather icon for ${description} on ${dateLabel}`} />
      ) : (
        <div className="icon-placeholder">No icon</div>
      )}
      <h2>{dateLabel}</h2>
      <p>{temp}</p>
    </div>
  );
}

export default ForecastCard;
