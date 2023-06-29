const express = require("express");
const axios = require("axios");
const WeatherData = require("../models/WeatherDataModel");
const router = express.Router();
require("dotenv").config();
const apiKey = process.env.API_KEY;

router.get("/", async (req, res) => {
  try {
    const { cityKey } = req.query;
    // Output: "2023-06-28"
    const currentDate = new Date().toISOString().split("T")[0];
    const weatherData = await WeatherData.findOne({
      where: {
        cityKey: cityKey,
        createdAt: currentDate,
      },
    });
    if (weatherData) {
      console.log("The dates are the same");
      // Send data to client
      return res.json(weatherData);
    } else {
      const response = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`
      );
      // Create new row in WeatherDataTable
      const { Temperature, WeatherText } = response.data[0];
      await WeatherData.create({
        cityKey,
        temperatureCelsius: Temperature.Metric.Value,
        WeatherText: WeatherText,
      });
      // Send data to client
      return res.json({
        cityKey,
        temperatureCelsius: Temperature.Metric.Value,
        weatherText: WeatherText,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
