import geocodeAPI from "./geocodeAPI";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!API_KEY) {
  // Fail fast with a clear message so the dev sees why requests are unauthorized
  console.error('Missing VITE_WEATHER_API_KEY in import.meta.env — add it to .env and restart the dev server');
  throw new Error('Missing VITE_WEATHER_API_KEY');
}

async function getWeatherData(lat, lon, time) {
    // accept undefined/null checks in a single place
      // validate lat/lon; time is optional (if provided we'll call the timemachine endpoint)
      if (lat == null || lon == null) {
        throw new Error("Missing parameters: lat and lon are required");
      }

    // One Call 3.0 endpoints:
    // - current/forecast: /data/3.0/onecall?lat=...&lon=...&appid=API_KEY
    // - historical: /data/3.0/onecall/timemachine?lat=...&lon=...&dt=UNIX_SECONDS&appid=API_KEY
    let url;
    if (time == null) {
      // fetch current/forecast data
      url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    } else {
      // fetch historical data for a specific unix timestamp (seconds)
      url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${API_KEY}`;
    }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('getWeatherData result:', result);
    return result;
  } catch (error) {
    console.error('getWeatherData error:', error.message || error);
    throw error; // rethrow so callers can handle failures explicitly
  }
}

async function getWeatherbyCity(city) {
    // input validation
    if (!city) {
        throw new Error("Missing city parameter");
    }
    // call geocoding func to get coordinates (lat/lon)
    const geoData = await geocodeAPI.getGeoData(city, 1); // 1 is the limit parameter, tells the api to return only 1 result
    if (!geoData || geoData.length === 0) {
        throw new Error("Geocoding failed");
    }
    const { lat, lon } = geoData[0]; // destructure lat/lon from geoData, geoData[0] is an object

    // call weather API using lat/lon -> get weather data
    const weatherData = await getWeatherData(lat, lon, Math.floor(Date.now() / 1000));
    // return combined result
    return { lat, lon, weather: weatherData };
} 

export { getWeatherData, getWeatherbyCity };