import { useState } from 'react'
import Weather from './components/WeatherCard'
import './App.css'

function App() {
  const [city, setCity] = useState('San Jose')
  const [weather, setWeather] = useState({
    temperature: '72°F',
    weatherIcon: '☀️'
  })

  return (
    <WeatherCard
      temperature={weather.temperature}
      city={city}
      weatherIcon={weather.weatherIcon}
    />
  )
}

export default App