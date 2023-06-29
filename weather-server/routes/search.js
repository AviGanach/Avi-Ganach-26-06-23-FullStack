const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();
const apiKey = process.env.API_KEY;

router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) {
      // Handle case where query parameter is missing
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
