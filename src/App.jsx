import { useState, useEffect } from "react";
import { getWeatherbyCity } from "./services/weatherAPI";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import ForecastList from "./components/ForecastList";

function App() {
  const [city, setCity] = useState("San Jose"); // city state
  const [forecast, setForecast] = useState([]); // forecast state
  const [weather, setWeather] = useState({
    // weather state, with placeholder null values
    temperature: null,
    weatherIcon: null,
  });
  const [debounceTimeout, setdebounceTimeout] = useState(null); // state to hold the debounce timeout ID
  const [debounceCity, setDebounceCity] = useState(city); // state to hold the debounced city value
  useEffect(() => {
    // seperate useEffect to debounce city input changes
    if (debounceTimeout) clearTimeout(debounceTimeout); // clear existing timeout if user is still typing
    const timeoutId = setTimeout(() => {
      setDebounceCity(city);
    }, 500); // 500ms debounce time
    setdebounceTimeout(timeoutId);
    return () => clearTimeout(timeoutId); // cleanup on unmount or before next effect run
  }, [city]);

  useEffect(() => {
    getWeatherbyCity(city)
      .then((resp) => {
        // current weather stuff
        console.log("Weather API returned: ", resp);
        // resp.weather is the full API response from getWeatherData
        const raw = resp.weather;
        // pick the most likely entry: data[0] (timemachine) or current or hourly[0]
        const entry =
          raw?.data?.[0] ?? raw?.current ?? raw?.hourly?.[0] ?? null; // if raw.data exists, grab the first item, otherwise return undefined → “nullish coalescing operator” → means “if the thing on the left is null or undefined, use the thing on the right.”
        const temp = entry?.temp; // temperature (units=imperial -> Fahrenheit) - safe lookup. If entry doesn’t exist, temp will be undefined instead of crashing your app.
        const iconCode = entry?.weather?.[0]?.icon; // digs into the weather array only if it exists.
        console.log("extracted entry/temp/icon ->", entry, temp, iconCode);
        const temperature = temp != null ? `${Math.round(temp)} °F` : "N/A"; // if temp exists, round it and add F, if it doesnt fall back to N/A
        const weatherIcon = iconCode
          ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
          : null; // if iconCode exists, build the URL string. If not, weatherIcon is null.

        // forecast stuff
        const dailyData = resp.weather?.daily ?? []; // safe lookup, if resp.weather or resp.weather.daily is null/undefined, dailyData will be an empty array
        const nextFiveDays = dailyData.slice(0, 5); // get first 5 items from daily array
        const forecastArray = nextFiveDays.map((day) => {
          const rounded = Math.round(day.temp?.day ?? NaN); // safe lookup for day.temp.day, if day.temp is null/undefined, rounded will be NaN
          return {
            dateLabel: new Date(day.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            }),
            temp: Number.isFinite(rounded) ? `${rounded} °F` : "N/A", // handle NaN case - if day.temp.day is undefined, rounded will be NaN, and we want to avoid displaying "NaN °F"
            iconUrl: day.weather?.[0]?.icon
              ? `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              : null, // if icon code exists, build the URL string. If not, iconUrl is null.
            description: day.weather?.[0]?.description || "No description", // fallback description - if day.weather or day.weather[0] or day.weather[0].description is null/undefined, use 'No description' as fallback
          };
        });

        setForecast(forecastArray);
        setWeather({
          temperature,
          weatherIcon,
        });
      })
      .catch((err) => {
        console.error("Failed to get weather:", err);
        setWeather({ temperature: "N/A", weatherIcon: null });
      });
  }, [debounceCity]); // city dependency array to run when city name is changed

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={() => setDebounceCity(city)}>Search</button>
      <WeatherCard
        temperature={weather.temperature}
        city={city}
        weatherIcon={weather.weatherIcon}
      />
      <ForecastList forecastData={forecast} />
    </>
  );
}

export default App;
