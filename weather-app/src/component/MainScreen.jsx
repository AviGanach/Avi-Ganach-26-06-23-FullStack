import React, { useState } from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import { Link } from "react-router-dom";

const MainScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [selectedCityName, setSelectedCityName] = useState();
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleSearch = async (inputValue) => {
    if (inputValue) {
      try {
        const response = await axios.get(
          `http://localhost:3004/api/search?query=${searchQuery}`
        );
        setSearchResults(response.data);
      } catch (error) {}
    }
  };

  const handleCityClick = async (cityKey, LocalizedName) => {
    try {
      const response = await axios.get(
        `http://localhost:3004/api/currentWeather/?cityKey=${cityKey}`
      );
      setSelectedCityName(LocalizedName);
      setCurrentWeather(response.data);
    } catch (error) {}
  };

  return (
    <div>
      <div className="searchBox">
        <button onClick={() => handleSearch(searchQuery)}>Search</button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="container">
        <div className="left">
        {/* // After selected city */}
          {currentWeather && (
            <div>
              <h2>{selectedCityName}</h2>
              <WeatherDetails
                localizedName={selectedCityName}
                cityKey={currentWeather.cityKey}
                temperatureCelsius={currentWeather.temperatureCelsius}
                weatherText={currentWeather.WeatherText}
              />
            </div>
          )}
        </div>

        {/* // After the input field is filled */}
        {searchResults && (
          <div className="right">
            {searchResults.map((city) => (
              <div
                key={city.Key}
                onClick={() => handleCityClick(city.Key, city.LocalizedName)}
              >
                {city.LocalizedName}
              </div>
            ))}
          </div>
        )}
      </div>
      <Link className="link" to={"/favorites"}>
        Favorites
      </Link>
    </div>
  );
};

export default MainScreen;
