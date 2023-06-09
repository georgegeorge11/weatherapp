import React, { useState,useEffect } from "react";
import axios from "axios";

import './Weather.css';
import Forecast from "./Forecast";
import Forecast7days from "./Forecast7days";

const Weather = () => {

    const [city, setCity] = useState("Galați"); 
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [windDirection, setWindDirection] = useState("");
    const [feelslike, setFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");
    const [uv, setUV] = useState("");
    const [precip_mm, setPrecip_mm] = useState("");
    const [error, setError] = useState(false);
    
  
    useEffect(() => {
     
      const API_KEY = "1546e52c43544b829f771754230404"; 
      const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
      if (city.trim() === "") { // verificam daca input-ul este gol sau contine doar spatii
        setTemperature("");
        setDescription("");
        setIcon("");
        setWindSpeed("");
        setFeelsLike("");
        setWindDirection("");
        setHumidity("");
        setUV("");
        setPrecip_mm("");
        setError(false);
        return; // ne oprim din efectul curent, nu mai facem request-ul
      }

     
      axios
        .get(API_URL)
        .then((response) => {
            
        const { temp_c, condition, condition: { icon },wind_kph, feelslike_c,
        wind_dir,humidity, uv, precip_mm} = response.data.current;
        setTemperature(temp_c);
        setDescription(condition.text);
        setIcon(icon);
        setWindSpeed(wind_kph);
        setFeelsLike(feelslike_c);
        setWindDirection(wind_dir);
        setHumidity(humidity);
        setUV(uv);
        setPrecip_mm(precip_mm);
        setError(false);
        })
        .catch((error) => {
          
          console.log(error);
          setError(true);
          setTemperature("");
          setDescription("");
          setIcon("");
          setWindSpeed("");
          setFeelsLike("");
          setWindDirection("");
          setHumidity("");
          setUV("");
          setPrecip_mm("");
        });
    }, [city]);
  
    return (
      <div className="content">
         <div className="container">
      <div className="weather">
         <div className="weatherInformation">
        <div className="temperature">
        <h1 className={city.length > 12 ? "long-text" : ""}>{city}</h1>
          {icon && <img src={`https:${icon}`} alt={description} />}
          {error ? (
                <p className="error-message">City not found</p>
              ) : (
                <p className="temperature">{Math.round(temperature)}°C</p>
              )}
              {!error && (
                <p className="description">{description}</p>
              )}
        </div>
        <div className="information">
        <p>Wind speed: {windSpeed} km/h</p>
        <p>Wind direction: {windDirection}</p> 
        <p>Humidity: {humidity} %</p>
        <p>Precip : {precip_mm} mm</p>
        <p>Feels like: {feelslike}°C</p>
        <p>UV: {uv}</p>
        </div> 
    </div>
    <div className="footer">
          <input className="input" type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
        </div>
    </div>
    <div className="forecast24h">
        <Forecast city={city} />
      </div>
    </div>
    <div className="forecast7days">
          <Forecast7days city={city} />
        </div>
      </div>
   
    );


}

export default Weather;
