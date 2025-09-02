import { useState, useEffect } from 'react'
import { getWeatherbyCity } from './services/weatherAPI';
import WeatherCard from './components/WeatherCard'
import './App.css'


function App() {
  const [city, setCity] = useState('San Jose') // city state
  const [weather, setWeather] = useState({ // weather state, with placeholder null values
    temperature: null,
    weatherIcon: null
  })

  useEffect(() => {
    getWeatherbyCity(city).then((resp) => {
      console.log("Weather API returned: ", resp);

      // resp.weather is the full API response from getWeatherData
      const raw = resp.weather;

      // pick the most likely entry: data[0] (timemachine) or current or hourly[0]
      const entry = raw?.data?.[0] ?? raw?.current ?? raw?.hourly?.[0] ?? null; // if raw.data exists, grab the first item, otherwise return undefined → “nullish coalescing operator” → means “if the thing on the left is null or undefined, use the thing on the right.”

  const temp = entry?.temp; // temperature (units=imperial -> Fahrenheit) - safe lookup. If entry doesn’t exist, temp will be undefined instead of crashing your app.
      const iconCode = entry?.weather?.[0]?.icon; // digs into the weather array only if it exists.

      console.log('extracted entry/temp/icon ->', entry, temp, iconCode);

  const temperature = temp != null ? `${Math.round(temp)} °F` : 'N/A'; // if temp exists, round it and add F, if it doesnt fall back to N/A
      const weatherIcon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null; // if iconCode exists, build the URL string. If not, weatherIcon is null.

      setWeather({
        temperature,
        weatherIcon
      });
    }).catch(err => {
      console.error('Failed to get weather:', err);
      setWeather({ temperature: 'N/A', weatherIcon: null });
    });
  }, [city]); // city dependency array to run when city name is changed

  return (
    <WeatherCard
      temperature={weather.temperature}
      city={city}
      weatherIcon={weather.weatherIcon}
    />
  )
}

export default App