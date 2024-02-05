import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import CountriesListPage from "./components/CountriesListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/countries" element={<CountriesListPage />} />
    </Routes>
  );
}

export default App;
