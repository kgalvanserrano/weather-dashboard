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