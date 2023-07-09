const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const WeatherData = sequelize.define("WeatherDataTable", {
  cityKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperatureCelsius: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weatherText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  
},
{
  tableName: 'WeatherDataTable',
  timestamps: false,
});

// Add the sync method to automatically create the table
  //  WeatherData.sync()
  WeatherData.sync({ alter: true })
  .then(() => {
    console.log('WeatherDataTable has been synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing WeatherDataTable:', error);
  });

module.exports = WeatherData;
