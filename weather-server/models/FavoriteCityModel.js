const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const FavoriteCity = sequelize.define(
  "favoritecityes",
  {
    cityKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localizedName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "favoritecityes",
  }
);

// Add the sync method to automatically create the table
FavoriteCity.sync()

  // WeatherData.sync({ alter: true })
  .then(() => {
    console.log("FavoriteCity has been synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing FavoriteCity:", error);
  });
module.exports = FavoriteCity;
