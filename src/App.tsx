import React from 'react';
import "./assets/styles/global.scss";
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
