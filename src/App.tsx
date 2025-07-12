// import { useState } from 'react'
import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Post from './pages/Post';

const App: React.FC = () => {

  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
