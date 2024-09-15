import React, { useEffect, useRef, useState } from "react";
import "@fontsource/poppins/400.css"; // Normal weight
import "@fontsource/poppins/700.css"; // Bold weight
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/clouds.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null); // Change to null
    const [error, setError] = useState(""); // State to handle error

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": clearIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    };

    const search = async (city) => {
        try {
            if (!city) return;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID
                }`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clearIcon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
            });
            setError(""); // Clear any previous errors
        } catch (error) {
            setWeatherData(false);
            setError("City not found");
            console.error("Error fetching weather data");
        }
    };

    // This useEffect can be used if you want a default city to load on mount
    useEffect(() => {
        // Uncomment the following line if you want to load a default city
        // search('London');
    }, []);

    const clearSearch = () => {
        inputRef.current.value = ""; // Clear input field
        setWeatherData(null); // Clear weather data
        setError(""); // Clear any errors
    };

    return (
        <div
            className="place-self-center p-[40px] rounded-[10px]
            bg-gradient-to-r from-[#2f4680] to-[#500ae4] flex flex-col items-center"
        >
            <div className="search-bar flex items-center gap-[12px]">
                <input
                    ref={inputRef}
                    className="h-[50px] border-none rounded-[40px] pl-[25px]
                text-[#626262] bg-[#ebfffc] outline-none"
                    type="text"
                    placeholder="Search city..."
                />
                <img
                    className="w-[50px] p-[15px] rounded-full bg-[#ebfffc] flex items-center justify-center cursor-pointer"
                    src={searchIcon}
                    alt="search"
                    onClick={() => search(inputRef.current.value)}
                />
                <img
                    className="w-[50px] p-[15px] rounded-full bg-[#ebfffc] flex items-center justify-center cursor-pointer"
                    src={clearIcon}
                    alt="clear"
                    onClick={clearSearch}
                />
            </div>

            {error && <p className="text-red-500 mt-[20px]">{error}</p>}

            {weatherData ? (
                <>
                    <img
                        src={weatherData.icon}
                        alt="weather icon"
                        className="w-[150px] mt-[30px] mb-[30px]"
                    />
                    <p className="text-[#fff] text-[80px] leading-[1] font-poppins">
                        {weatherData.temperature}°c
                    </p>
                    <p className="text-white text-[40px] font-poppins">
                        {weatherData.location}
                    </p>
                    <div
                        className="weather-data w-full mt-[40px] text-white
                            flex justify-between gap-20"
                    >
                        <div className="col flex items-start gap-[12px] text-[22px]">
                            <img
                                className="w-[26px] mt-[10px]"
                                src={humidityIcon}
                                alt="humidityIcon"
                            />
                            <div>
                                <p className="font-poppins">{weatherData.humidity} %</p>
                                <span className="block">Humidity</span>
                            </div>
                        </div>
                        <div className="col flex items-start gap-[12px] text-[22px]">
                            <img className="w-[26px] mt-[10px]" src={windIcon} alt="windIcon" />
                            <div>
                                <p className="font-poppins">{weatherData.windSpeed} Km/h</p>
                                <span className="block">Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                !error && <p className="text-white mt-[20px]">Enter a city to get weather info</p>
            )}
        </div>
    );
};

export default Weather;
