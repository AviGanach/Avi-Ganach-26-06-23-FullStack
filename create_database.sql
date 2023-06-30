CREATE DATABASE weatherdata;

-- Use the database
USE weatherdata;

-- Create the WeatherDataTable table
CREATE TABLE WeatherDataTable (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cityKey VARCHAR(255) NOT NULL,
  temperatureCelsius DECIMAL(10, 2) NOT NULL,
  WeatherText VARCHAR(255) NOT NULL,
  createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Create the favoritecityes table
CREATE TABLE favoritecityes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cityKey VARCHAR(255) NOT NULL,
  temperatureCelsius DECIMAL(5, 2) NOT NULL,
  weatherText VARCHAR(255) NOT NULL,
  createdAt DATE
);
