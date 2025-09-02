const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
if (!API_KEY) {
  console.error('Missing VITE_WEATHER_API_KEY in import.meta.env — add it to .env and restart the dev server');
  throw new Error('Missing VITE_WEATHER_API_KEY');
}

async function getGeoData(q, limit) {
    if (!q || limit == null) { // input validation, making sure args are actually usable b4 making API call
      throw new Error("Missing parameters");
    }
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('getGeoData result:', result);
    return result;
  } catch (error) {
    console.error('getGeoData error:', error.message || error);
    throw error; // rethrow so callers can handle failures explicitly
  }
}

export default {
  getGeoData
};