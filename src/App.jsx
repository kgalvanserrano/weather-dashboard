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
      const entry = raw?.data?.[0] ?? raw?.current ?? raw?.hourly?.[0] ?? null;

  const temp = entry?.temp; // temperature (units=imperial -> Fahrenheit)
      const iconCode = entry?.weather?.[0]?.icon;

      console.log('extracted entry/temp/icon ->', entry, temp, iconCode);

  const temperature = temp != null ? `${Math.round(temp)} °F` : 'N/A';
      const weatherIcon = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;

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