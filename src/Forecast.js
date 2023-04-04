import React,{useState, useEffect} from 'react'
import axios from "axios";
import './Forecast.css';

const Forecast = ({city}) =>{
    const [data, setData] = useState([]);

    useEffect(() => {
      const API_KEY = "1546e52c43544b829f771754230404";
      
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&hours=24`;
  
      axios
        .get(API_URL)
        .then((response) => {
          setData(response.data.forecast.forecastday[0].hour);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [city]);

    const now = new Date();
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    const currentIndex = data.findIndex((hour) => new Date(hour.time) >= now );
    const current = data.findIndex((hour) => new Date(hour.time) < tommorow );
    const next24Hours = data.slice(currentIndex,currentIndex+24).concat(data.slice(current,currentIndex)) ;
    console.log(tommorow)

    return (
        <div className="hourly-forecast">
        {next24Hours.map((hour) => (
          
          <div key={hour.time_epoch} className="forecast-item-container">
            <p className="hour">{hour.time.slice(10, 16)}</p>
            <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} />
            <p className="temp">{Math.floor(hour.temp_c)}°</p>
            <p className="condition">{hour.condition.text}</p>
          
          </div>
        ))}
      </div>
    );
}

export default  Forecast;