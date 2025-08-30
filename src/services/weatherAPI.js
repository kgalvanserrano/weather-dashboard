async function getData(lat, lon, time) {
  const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${import.meta.env.WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}