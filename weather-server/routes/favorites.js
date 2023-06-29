const express = require("express");
const FavoriteCity = require("../models/FavoriteCityModel");
const router = express.Router();

// Route to retrieve all favorites
router.get("/getAllFavorites", async (req, res) => {
  try {
    const favorites = await FavoriteCity.findAll();
    console.log(favorites);
    return res.json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
// Route to retrieve all favorites
router.get("/getOne", async (req, res) => {
  try {
    const { cityKey } = req.query;
    const existingFavorite = await FavoriteCity.findOne({ where: { cityKey } });
    if (existingFavorite) {
      return res.json(existingFavorite);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// use Post just in case of sending sensitive date or long date ..
router.post("/addToFavoriteCity", async (req, res) => {
  try {
    const { cityKey, localizedName } = req.body;
    const existingFavorite = await FavoriteCity.findOne({
      where: { cityKey, localizedName },
    });
    if (existingFavorite) {
      return res.status(400).json({ error: "City already in favorites" });
    } else {
      const newFavorite = await FavoriteCity.create({ cityKey, localizedName });
      return res.json(newFavorite);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteFavorite", async (req, res) => {
  try {
    const { cityKey } = req.query;
    const favorite = await FavoriteCity.findOne({ where: { cityKey } });
    if (favorite) {
      await favorite.destroy();
      return res.sendStatus(204);
    } else {
      return res.status(404).json({ error: "City not found in favorites" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
