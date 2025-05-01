

import LinkrFullLogo from '../../assets/logos/linkr-full-logo.svg'
import './SignUp.css'

function SignUp(){
    return(
        <div className="linkr-create-account">
        <img className="login-logo" src={LinkrFullLogo} alt="" />
        <div className="login-container">


            <p className="welcome">Create Account!</p>
            <p className="welcome-p">Enter your details to create an account.</p>

        <div className="input-div">
            <p className="input-title">Username</p>
            <input className="input" type="text" placeholder="Enter your Username" />
        </div>

    
        <div className="input-div">
            <p className="input-title">Password</p>
            <input className="input" type="password" placeholder="Enter your Password" />
        </div>

        <div className="input-div">
            <p className="input-title">Confirm Password</p>
            <input className="input" type="password" placeholder="Confirm your Password" />
        </div>



           <button className="create-account">Create Account</button>
           

           <p className="no-account">Have an account?<a href="#" className="go-to-login"> Login</a></p>



        </div>
    </div>
    )
}

export default SignUp