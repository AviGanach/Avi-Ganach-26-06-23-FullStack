import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import { Link } from "react-router-dom";

const FavoritesScreen = () => {
  const [favoritesCities, setFavoritesCities] = useState();
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesResponse = await axios.get(
          "http://localhost:3004/api/favorites/getAllFavorites"
        );
        setFavoritesCities(favoritesResponse.data);
      } catch (error) {}
    };

    fetchFavorites();
  }, []);

  const handleDelete = (cityKey) =>
    setFavoritesCities((prev) =>
      prev.filter((city) => city.cityKey !== cityKey)
    );

  const handleCityClick = async (city) => {
    try {
      const weatherRequests = await axios.get(
        `http://localhost:3004/api/currentWeather/?cityKey=${city.cityKey}`
      );
      setCurrentWeather({ ...city, ...weatherRequests.data });
    } catch (error) {}
  };

  return (
    <div>
      <h1> Favorites Screen</h1>
      <div className="container">
        <div className="left">
          {currentWeather && (
            <div>
              <h2>{currentWeather.localizedName}</h2>
              <WeatherDetails
                isFavoriteDefault={true}
                localizedName={currentWeather.localizedName}
                cityKey={currentWeather.cityKey}
                temperatureCelsius={currentWeather.temperatureCelsius}
                weatherText={currentWeather.weatherText}
                handleDelete={handleDelete}
              />
            </div>
          )}
        </div>

        {(favoritesCities && favoritesCities.length > 0) && (
          <div className="right">
            {favoritesCities.map((city) => (
              <div key={city.cityKey} onClick={() => handleCityClick(city)}>
                {city.localizedName}
              </div>
            ))}
          </div>
        )}
      </div>
      <Link className="link" to={"/"}>
        back
      </Link>
    </div>
  );
};

export default FavoritesScreen;
