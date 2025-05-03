


import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataProvider";


import LinkrFullLogo from '../../assets/logos/linkr-full-logo.svg'
import './SignUp.css'

function SignUp(){


  




    return(

        <div className="create-acc-body">

        <div className="linkr-create-account">
        <img className="create-acc-logo" src={LinkrFullLogo} />
        <div className="create-acc-container">


            <p className="create-acc-welcome">Create Account!</p>
            <p className="create-acc-welcome-p">Enter your details to create an account.</p>

        <div className="create-acc-input-divs">
            <p className="input-title">Username</p>
            <input className="ca-input" type="text" placeholder="Enter your Username" />
        </div>

    
        <div className="create-acc-input-divs">
            <p className="input-title">Password</p>
            <input className="ca-input" type="password" placeholder="Enter your Password" />
        </div>

        <div className="create-acc-input-divs">
            <p className="input-title">Confirm Password</p>
            <input className="ca-input" type="password" placeholder="Confirm your Password" />
        </div>



           <button className="create-account-button">Create Account</button>
           

           <p className="no-account-ca">Have an account?<a href="#" className="go-to-login"> Login</a></p>



        </div>
    </div>

    </div>
    )
}

export default SignUp