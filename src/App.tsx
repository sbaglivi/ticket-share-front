import React, { useState } from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import MapPage from './components/MapPage';
import SellPage from './components/SellPage';
import LoginPage from './components/LoginPage';

function App() {
  const [token, setToken] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage setToken={setToken} />} />
        <Route path='/default' element={<Default />} />
        <Route path='/buy' element={<MapPage />} />
        <Route path='/sell' element={<SellPage />} />
      </Routes>
    </Router>
  );
}
const Home = () => {
  return (
    <Homepage />
  )
}
const Default = () => {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link to="/">Homepage</Link>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App;
