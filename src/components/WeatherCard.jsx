import { useState } from "react";

function Weather(props) {
    return (
        <>
        <h1>{props.temperature}</h1>
        <h1>{props.city}</h1>
        <h1>{props.weatherIcon}</h1>
        </>
    )
}

export default Weather;