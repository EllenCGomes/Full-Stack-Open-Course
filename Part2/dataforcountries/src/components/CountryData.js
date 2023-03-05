import { useEffect, useState } from "react";

import weatherService from "../services/weather"

const CountryData = ({ country }) => {

    const [weather, setWeather] = useState(null);

    //const api_key = process.env.REACT_APP_API_KEY

    const lat = country.latlng[0];
    const lon = country.latlng[1];

    //const url = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&units={metric}&appid=${api_key}`;

    useEffect(() => {
        weatherService.getWeather(lat, lon)
            .then(response => {
                setWeather(response);
            })
    }, [lat, lon])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p><b>Languages:</b></p>
            <ul>
                {
                    Object.values(country.languages).map((value, index) => {
                        return (
                            <li key={index}>{value}</li>
                        )
                    })
                }
            </ul>
            <img src={country.flags.svg} alt={country.name.common + "`s flag"} width={150} height={150} />
            {weather ? <>
                <h3>Weather in {country.name.common}</h3>
                <p>Temperature {weather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p>Wind {weather.wind.speed} m/s</p>
            </> : null}

        </div>
    )
}

export default CountryData;