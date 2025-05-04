import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Messages from './pages/Messages/Messages.jsx';
import Channels from './pages/Channels/Channels.jsx';
import './assets/fonts/Fonts.css'


import DataProvider from "./context/DataProvider";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  }




  return (
    <div className="App">

      <DataProvider>
        <BrowserRouter>
          <Routes>
           
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />}
            />

          <Route
            path="/signup"
            element={<SignUp />}
          />

            <Route path="/homepage" element={
                isAuthenticated ? (
                <Messages onLogout={handleLogout} />
                ) : (
                <Navigate to="/login" />
                )
              } 
            />

            <Route path="/channels" element={<Channels />} />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
