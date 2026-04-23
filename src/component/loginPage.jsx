import React, { useState } from "react";
import './loginPage.css';
import axios from 'axios';

const Weatherapp = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (city === "") {
            alert("Enter a city name")
            return
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: '1bea9fa379a24f6c01aa649ef6818b81', // Replace with your actual API key
                    units: 'imperial' // Use 'metric' for Celsius
                }
            });
            setWeather(response.data);
        } catch (err) {
            setError('Failed to fetch weather data');
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-app">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    onChange={handleCityChange}
                    value={city}
                />
                <button type="submit">Get Weather</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°F</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} mph</p>
                    <p>{weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt="weather icon"
                    />
                </div>
            )}
        </div>
    );
};

export default Weatherapp;