import { useState } from 'react'
import Weather from './components/WeatherCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Weather temperature="72°F" city="San Jose" weatherIcon="☀️" />

  )
}

export default App
