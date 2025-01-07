"use client";

import { useEffect, useState } from "react";
import { api } from "@lib/config";

export default function WeatherPage() {
    const [weatherData, setWeatherData] = useState([]);
    const [selectedArea, setSelectedArea] = useState("");
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await api.get("/weather");
                setWeatherData(response.data.data);
            } catch (error) {}
        };
        fetchWeather();
    }, []);

    const handleChangeArea = (event) => {
        const area = event.target.value;
        setSelectedArea(area);

        const selectedForecast = weatherData.find(
            (weather) => weather.area === area
        );
        setForecast(selectedForecast ? selectedForecast.forecast : null);
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            <h1 className="font-bold mb-4">Weather Forecast</h1>

            {/* dropdown for list of areas */}
            <div className="w-full max-w-xs mx-auto mt-2">
                <select
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChangeArea}
                    value={selectedArea}
                >
                    <option value="">Select an area</option>
                    {weatherData.map((weather) => (
                        <option key={weather.area} value={weather.area}>
                            {weather.area}
                        </option>
                    ))}
                </select>
            </div>

            {/* display forecast for the selected area */}
            <span className={`mt-2 min-h-[40px]`}>
                {forecast}
            </span>
        </div>
    );
}
