import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overlay from './components/Overlay';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Overlay />} />
      <Route path="/home" element={
        <>
          <Navbar />
          <Home />
        </>
      } />
      {/* Additional routes */}
    </Routes>
  );
}

export default App;