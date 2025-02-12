import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Nav from './Components/Nav';

import Home from './Pages/home';
import Favorites from './Pages/favorites';
import Category from './Pages/category';
import BookDetails from './Pages/book-details';
import Error from './error';

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <Router>
      <Header onSearch={setQuery}/>
      <Nav/>
      <Routes>
        <Route path='*' element={<Error query={query}/>}/>
        <Route path='/' element={<Home query={query}/>}/>
        <Route path='/favorites' element={<Favorites query={query}/>}/>
        <Route path='/category/:category' element={<Category query={query}/>}/>
        <Route path='/book/:id' element={<BookDetails query={query}/>}/>
      </Routes>
    </Router>
  );
};