import { useState, useEffect } from 'react'
import { getWeatherbyCity } from './services/weatherAPI';
import WeatherCard from './components/WeatherCard'
import './App.css'


function App() {
  const [city, setCity] = useState('San Jose') // city state
  const [weather, setWeather] = useState({ // weather state, with placeholder values, could change to null
    temperature: null,
    weatherIcon: null
  })

  useEffect(() => {
    getWeatherbyCity(city).then((data) => {
      console.log("Weather API returned: ", data);
      setWeather(data);
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