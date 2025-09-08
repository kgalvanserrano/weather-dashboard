// props : { dateLabel, temp, iconUrl, description }
// layout: image at top, date, temp, keep it simple
// accessibility: add alt text for icon using desc or date ${description} icon

// destructured props
function ForecastCard({ dateLabel, temp, iconUrl, description }) {
  return (
    <div className="forecast-card">
      {iconUrl ? (
        <img src={iconUrl} alt={`Weather icon for ${description} on ${dateLabel}`} />
      ) : (
        <div className="icon-placeholder">No icon</div>
      )}
      <h3 style={{ margin: "6px 0 4px" }}>{dateLabel}</h3>
      <p style={{ margin: 0, fontSize: "0.9rem" }}>{temp}</p>
    </div>
  );
}

export default ForecastCard;
