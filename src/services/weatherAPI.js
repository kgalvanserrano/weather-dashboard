async function getData(lat, lon, time) {
    if (lat === null || lon === null || time === null) { // input validation, making sure args are actually usable b4 making API call
      throw new Error("Missing parameters");
    }
  const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${import.meta.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function getWeatherbyCity(city) {
    // input validation
    if (!city) {
        throw new Error("Missing city parameter");
    }
    // call geocoding func to get coordinates (lat/lon)
    const geoData = await getData(city, 1); // 1 is the limit parameter, tells the api to return only 1 result
    if (!geoData || geoData.length === 0) {
        throw new Error("Geocoding failed");
    }
    const { lat, lon } = geoData[0]; // destructure lat/lon from geoData, geoData[0] is an object

    // pass coords to existing weather fetch
    const coordinates = { lat, lon };

    // call weather API using lat/lon -> get weather data
    const weatherData = await getData(lat, lon, Math.floor(Date.now() / 1000));
    // return combined result
    return { ...coordinates, weather: weatherData };
} 

export { getData, getWeatherbyCity };