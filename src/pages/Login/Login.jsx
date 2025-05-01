import React from 'react'
import LinkrFullLogo from '../../assets/logos/linkr-full-logo.svg'
import GoogleGLogo from '../../assets/logos/google-g-logo.svg'
import './Login.css'




function Login() {
  return (

<div className='login-slack'>

    <div className="slack-login-page">
    <img className="login-logo" src={LinkrFullLogo} />
    <div className="login-container">


        <p className="welcome">Welcome!</p>
        <p className="welcome-p">Hello! Please enter your details.</p>

    <div className="input-div">
        <p className="username">Username</p>
        <input className="username-input" type="text" placeholder="Enter your Username" />
    </div>


    <div className="input-div">
        <p className="username">Password</p>
        <input className="username-input" type="password" placeholder="Enter your Password" />
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

       <button className="login">Login</button>
       <button className="google-login">
        <img className="google-g-logo" src={GoogleGLogo} alt="google-g-logo" />
        Sign In With Google</button>

       <p className="no-account">Don't have an account? <a href="#" className="sign-up">Sign up</a></p>



    </div>
</div>


</div>
  )
}



export default Login