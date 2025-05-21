import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "bdb7a8145a07166d73925a58ab83fd3c";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=${API_KEY}`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
          wind: data.wind.speed,
        });
      })
      .catch((err) => {
        console.error("Ошибка получения погоды:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!weather) return <p className="loading">Загрузка погоды...</p>;

  return (
    <div className="container">
      <h2>Погода в Москве</h2>
      <p>Температура: {weather.temp} °C</p>
      <p>Состояние: {weather.description}</p>
      <p>Скорость ветра: {weather.wind} м/с</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
