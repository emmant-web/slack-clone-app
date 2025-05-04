import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Messages from './pages/Messages/Messages.jsx';
import Channels from './pages/Channels/Channels.jsx';
import NotFound from './pages/NotFound/NotFound.jsx'; // To set-up later
import Navigation from './components/Navigation/Navigation.jsx';
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
 {/* Upon first loading of the app, this will be loaded first */}
            <Route
            path="/"
            element={<Login onLogin={handleLogin} />}
          />

          <Route
            path="/signup"
            element={<SignUp />}
          />



      {/* Protected pages. User should be "authenticated" first before they can access this page */}


      <Route path="/homepage" element={
              isAuthenticated ? (
                <Navigation onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }>

            <Route path="messages" element={<Messages />} />

  



            <Route path="channels" element={<Channels />} />


            <Route path="*" element={<NotFound />} />
          </Route>  


        </Routes>
      </BrowserRouter>

      </DataProvider>
    </div>
  );
}

export default App;
