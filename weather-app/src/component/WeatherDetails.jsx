import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const WeatherDetails = ({
  temperatureCelsius,
  weatherText,
  localizedName,
  cityKey,
  isFavoriteDefault,
  handleDelete,
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteDefault);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/api/favorites/getOne/?cityKey=${cityKey}`)
      .then((res) => setIsFavorite(true))
      .catch((error) => setIsFavorite(false));
  }, [cityKey]);

  const handleAddToFavorites = async () => {
    try {
      if (!isFavorite) {
        await axios.post(
          "http://localhost:3004/api/favorites/addToFavoriteCity",
          { cityKey, localizedName }
        );
      } else {
        axios.delete(
          `http://localhost:3004/api/favorites/deleteFavorite/?cityKey=${cityKey}`
        );
        if (handleDelete) handleDelete(cityKey);
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {}
  };

  return (
    <div>
      <p>Temperature: {temperatureCelsius}</p>
      <p>Weather: {weatherText}</p>
      <div className="btnContainer">
        <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "black"} />
        <button onClick={handleAddToFavorites}>
          {isFavorite ? "Remove" : "Add"} To Favorites
        </button>
      </div>
    </div>
  );
};

export default WeatherDetails;
