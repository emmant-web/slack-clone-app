

import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";


import { NavLink } from "react-router";


import LinkrFullLogo from '../../assets/logos/linkr-full-logo.svg'
import GoogleGLogo from '../../assets/logos/google-g-logo.svg'
import './Login.css'

    


function Login(props) {





const { onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // react hook for automatically changing the path in the url
  const navigate = useNavigate();
  const { handleHeaders } = useData();




  const handleSubmit = async (e) => {

    e.preventDefault();
    // Add authentication here
    try {
      // try catch
      // try - run the program
      // catch - it catches the error during run time

      // axios.post(url, object that contains the request body)

      const loginCredentials = {
        email,
        password
      }

      const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);


      const { data, headers } = response;
      if(data && headers){
        const accessToken = headers["access-token"];
        const expiry = headers["expiry"];
        const client = headers["client"];
        const uid = headers["uid"];

        console.log(data);
        console.log(accessToken, expiry, client, uid);

        // keep the headers value in our context - these can now be used in other pages/components
        handleHeaders(headers);


        
        onLogin();
        navigate('/homepage');
      }
    } catch(error) {
      if(error){
        return alert("Invalid credentials");
      }
    }
  };









  return (

<div className='login-body'>

    <div className="linkr-login-page">
    <img className="login-logo" src={LinkrFullLogo} />
    <div className="login-container">

        
{/* start of form */}
<form onSubmit={handleSubmit}>    


        <p className="login-welcome">Welcome!</p>
        <p className="login-welcome-p">Hello! Please enter your details.</p>





    <div className="input-div">
        <p className="login-input-title">Username</p>
        <input className="login-input" type="text" placeholder="Enter your Username" 
          value={email}
         onChange={(e) => setEmail(e.target.value)}
         />
    </div>


    <div className="input-div">
        <p className="login-input-title">Password</p>
        <input className="login-input" type="password" placeholder="Enter your Password" 
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
    </div>

      

       <div className="rememberme-and-password">
        <div className="rememberme">
            <input type="checkbox" />
            <p>Remember me</p>
        </div>

        <div className="password">
            <p><a href="#">Forgot password?</a></p>
        </div>
       </div>



<div className="login-button-div">
<button className="login-button" type="submit">Login</button>
</div>
      


       <button className="google-login-button">
        <img className="google-g-logo" src={GoogleGLogo} alt="google-g-logo" />
        Sign In With Google</button>






       <p className="no-account">Don't have an account?  
<NavLink to="/signup">
       <a className="sign-up"> Create Account</a>
       </NavLink>
        </p>
{/* end of form */}
        </form>

    </div>
</div>


</div>
  )
}



export default Login