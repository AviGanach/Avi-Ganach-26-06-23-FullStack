const express = require('express');
const { sequelize } = require('./database');
const cors = require('cors');
const searchRouter = require('./routes/search');
const currentWeatherRouter = require('./routes/currentWeather');
const favoritesRouter = require('./routes/favorites');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/search', searchRouter);
app.use('/api/currentWeather', currentWeatherRouter);
app.use('/api/favorites', favoritesRouter);

sequelize.sync().then(() => {
    app.listen(3004, () => {
      console.log('Server started on port 3004');
    });
  });