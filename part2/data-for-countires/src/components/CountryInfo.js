import { useState, useEffect } from 'react'
import axios from 'axios'

const Language = ({ language }) => <li>{language} </li>

const Weather = ({ weather }) => {
  const iconApiUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h2>Weather in {weather.name} </h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={iconApiUrl} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({})

  const API_KEY = process.env.REACT_APP_API_KEY
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}&units=metric`

  useEffect(() => {
    axios
      .get(weatherApiUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <>
      <h1>{country.name.common} </h1>
      <p>capital {country.capital[0]} </p>
      <p>area {country.area} </p>

      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([adv, lan]) => <Language key={adv} language={lan} />)}
      </ul>
      <img src={country.flags['png']} alt={`${country.name.common} Official flag`} />
      {Object.keys(weather).length === 0 ? '' : <Weather weather={weather} />}
    </>
  )
}

export default CountryInfo