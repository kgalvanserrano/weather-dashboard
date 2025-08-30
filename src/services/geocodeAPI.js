async function getData(q, limit) {
    if (!q || !limit) { // input validation, making sure args are actually usable b4 making API call
      throw new Error("Missing parameters");
    }
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=${limit}&appid=${import.meta.env.WEATHER_API_KEY}`;
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