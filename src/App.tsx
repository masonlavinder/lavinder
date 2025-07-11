// import { useState } from 'react'
import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/About';

const App: React.FC = () => {

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
