import React from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/default' element={<Default/>} /> 
      </Routes> 
    </Router>
  );
}
const Home = () => {
  return (
    <Homepage/>
  )
}
const Default = () => {
  return (
    <div className="App">
      <Header/>
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
