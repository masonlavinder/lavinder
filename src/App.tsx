// import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import NotFound from './pages/NotFound';
import Blog from './pages/BlogList/BlogList';
import LinkList from './pages/LinkList/LinkList'
import MenuBar from './components/MenuBar/MenuBar';

const App: React.FC = () => {
  return (
    <>
    <Router>
        <MenuBar
          items={[
            { id: 'home', label: 'Home', href: '/' },
            { id: 'blog', label: 'Blog', href: '/blog' },
            { id: 'link-list', label: 'Link List', href: '/link-list '},
          ]}
        />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/link-list" element={<LinkList />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/*" element={<Home />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
