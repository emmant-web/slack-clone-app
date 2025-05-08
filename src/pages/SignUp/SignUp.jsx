


import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";

import { NavLink } from "react-router";

import LinkrFullLogo from '../../assets/logos/linkr-full-logo.svg'
import './SignUp.css'

function SignUp(){



   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
        setError("Passwords do not match");
        return;
    }

    if (!email){
        setError("Email is required");
        return;
    }

    if (!password){
        setError("Password is required");
        return;
    }


    if (!confirmPassword){
        setError("Confirm Password is required");
        return;
    }

    setError("");

    try {
        const signUpCredentials = {
            email,
            password,
            password_confirmation: confirmPassword, // Corrected key name
        }

        const response = await axios.post(`${API_URL}/auth`, signUpCredentials);

        const { data } = response;
        console.log(data);
    

        navigate("/login");
    } 
    
    
    catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error Response:", error.response.data);
            console.error("Status Code:", error.response.status);
            setError(error.response.data.errors.join(', ')); // Display error message from the server
          } 
          
          else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.error("Error Request:", error.request);
            setError("No response from server. Please check your network.");
          } 
          
          
          else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error Message:", error.message);
            setError("An error occurred. Please try again.");
          }
    }


   };


   




    return(

        <div className="create-acc-body">

        <div className="linkr-create-account">
        <img className="create-acc-logo" src={LinkrFullLogo} />
        <div className="create-acc-container">




        <form onSubmit={handleSubmit}>

            <p className="create-acc-welcome">Create Account!</p>
            <p className="create-acc-welcome-p">Enter your details to create an account.</p>

        <div className="create-acc-input-divs">
            <p className="input-title">Username</p>
            <input className="ca-input" type="text" placeholder="Enter your Username" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            />
        </div>

    
        <div className="create-acc-input-divs">
            <p className="input-title">Password</p>
            <input className="ca-input" type="password" placeholder="Enter your Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="create-acc-input-divs">
            <p className="input-title">Confirm Password</p>
            <input className="ca-input" type="password" placeholder="Confirm your Password"
            
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            
            />
        </div>
        {error && <p className="error-message">{error}</p>}



<div className="create-account-button-div">
<button className="create-account-button">Create Account</button>
</div>
           
           

           <p className="no-account-ca">Have an account?
            
           

            <NavLink to="/">
            <a href="#" className="go-to-login"> Login</a>
            </NavLink>
            
            </p>

        </form>



        </div>
    </div>

    </div>
    )
}

export default SignUp