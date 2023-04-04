import React,{useState, useEffect} from 'react'
import axios from "axios";
import './Forecast7days.css';

const Forecast7days = ({city}) =>{
    const [data, setData] = useState([]);

  useEffect(() => {
    const API_KEY = "1546e52c43544b829f771754230404";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data.forecast.forecastday);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const next7days = [today].concat(
    Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i + 1);
      return date;
    })
  );

  const filteredData = data.filter((day) => {
    const dayDate = new Date(day.date);
    return (
      dayDate.getFullYear() === today.getFullYear() &&
      dayDate.getMonth() === today.getMonth() &&
      dayDate.getDate() >= today.getDate() &&
      dayDate <= next7days[6]
    );
  });

  return (
    <div className="forecast">
      
      {filteredData.map((day) => (
        <div key={day.date} className="forecast-item-container">
          <p className="date">{day.date}</p>
          <img src={day.day.condition.icon} alt={day.day.condition.text} />
          <p className="temp">
            {day.day.mintemp_c}°C / {day.day.maxtemp_c}°C
          </p>
          <p className="condition">{day.day.condition.text}</p>
        </div>
      ))}
    </div>
  );
}

export default  Forecast7days;