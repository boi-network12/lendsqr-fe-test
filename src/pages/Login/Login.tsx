import React from 'react'
import FormImg from "../../assets/pablo-sign-in 1.svg"
import './Login.scss'
import { Link } from 'react-router-dom'

const Login = () => {

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <div className='login-page'>
        <div className='image-container'>
            <img src={FormImg} alt='form bg'/>
        </div>
        <div className='form-container'>
            <form action="" onSubmit={handleLogin}>
                <div className='textBox'>
                    <h1>welcome</h1>
                    <span>Enter details login.</span>
                </div>

                <div className='input-container'>
                    <input type="text" placeholder='Email' />
                </div>
                <div className='input-container'>
                    <input type="password" placeholder='Password' />
                    <span>show</span>
                </div>

                <p className='link'>
                    <Link to='/forgot-password'>
                       Forgot password
                    </Link>
                </p>

                <button className='btn' >
                    Log in 
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login