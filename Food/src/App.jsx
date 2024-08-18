import { BrowserRouter , Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import './index.css';

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;