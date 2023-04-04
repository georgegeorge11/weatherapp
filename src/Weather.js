import React, { useState,useEffect } from "react";
import axios from "axios";
import './Weather.css';
import Forecast from "./Forecast";

const Weather = () => {

    const [city, setCity] = useState("Galați"); // setați orașul de afișat
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [windDirection, setWindDirection] = useState("");
    const [feelslike, setFeelsLike] = useState("");
    const [humidity, setHumidity] = useState("");
    const [uv, setUV] = useState("");
    const [precip_mm, setPrecip_mm] = useState("");
  
    useEffect(() => {
      const API_KEY = "1546e52c43544b829f771754230404"; // înlocuiți cu cheia API de la WeatherAPI
      const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
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
        })
        .catch((error) => {
          console.log(error);
        });
    }, [city]);
  
    return (
       
  
           <div className="container">
        <div className="header">
          <h1>{city}</h1>
          {icon && <img src={`https:${icon}`} alt={description} />}
        </div>
        <div className="body">
          <p className="temperature">{temperature}°C</p>
          <p className="description">{description}</p>
         <div className="bodycomponents">
      
          <p>Wind speed: {windSpeed} km/h</p>
          <p>Wind direction: {windDirection}</p> 
          <p>Humidity: {humidity} %</p>
          <p>Precip : {precip_mm} mm</p>
          <p>Feels like: {feelslike}°C</p>
          <p>UV: {uv}</p>
         
         </div>
        </div>
        <div className="footer">
          <input className="input" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="forecast24h">
        <Forecast city={city} />
      </div>
     
      </div>
     
      
    );


}

export default Weather;
