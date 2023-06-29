import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./component/MainScreen";
import FavoritesScreen from "./component/FavoritesScreen";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Weather Application</h1>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
