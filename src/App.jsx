import { useState, useEffect } from 'react'
import { getWeatherbyCity } from './services/weatherAPI';
import WeatherCard from './components/WeatherCard'
import './App.css'


function App() {
  const [city, setCity] = useState('San Jose') // city state
  const [weather, setWeather] = useState({
    temperature: '72°F',
    weatherIcon: '☀️'
  })

  useEffect(() => {
    getWeatherbyCity(city).then((data) => {
      console.log("Weather API returned: ", data);
      setWeather(data);
    });
  }, []); // empty dependency array to run only once on mount  

  return (
    <WeatherCard
      temperature={weather.temperature}
      city={city}
      weatherIcon={weather.weatherIcon}
    />
  )
}

export default App