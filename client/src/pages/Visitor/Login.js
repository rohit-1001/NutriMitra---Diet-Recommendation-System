import React from 'react'
import '../../css_files/login.css'

const Login = () => {
  return (
    <>
        <div className="login_container">
        <div className="login_main">  	
            <input type="checkbox" id="login_chk" aria-hidden="true"/>
    
            <div className="login_login">
                <form className="login_form">
                    <label className='login_label' htmlFor="login_chk" aria-hidden="true">Log in</label>
                    <input className="login_input" type="email" name="email" placeholder="Email" required />
                    <input className="login_input" type="password" name="pswd" placeholder="Password" required />
                    <button>Log in</button>
                </form>
            </div>
    
            <div className="login_register">
                <form className="login_form">
                    <label className='login_label' htmlFor="login_chk" aria-hidden="true">Register</label>
                    <input className="login_input" type="text" name="txt" placeholder="Username" required />
                    <input className="login_input" type="email" name="email" placeholder="Email" required />
                    <input className="login_input" type="password" name="pswd" placeholder="Password" required />
                    <button>Register</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
