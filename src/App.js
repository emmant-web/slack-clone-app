import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Messages from './pages/Messages/Messages.jsx';
import Channels from './pages/Channels/Channels.jsx';
import NotFound from './pages/NotFound/NotFound.jsx'; // To set-up later
import Navigation from './components/Navigation/Navigation.jsx';
import './assets/fonts/Fonts.css'

function App() {
  return (
    <div className="App">
     <Login />
     <SignUp/>

     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Messages />} />
            <Route path="channels" element={<Channels />} />
            <Route path="*" element={<NotFound />} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
