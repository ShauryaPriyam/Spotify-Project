import React, { useState } from 'react'
import { FaSpotify } from "react-icons/fa6"
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { loginUser, loading } = useUserContext()

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate)
  }
  return (
    <div className='login-container'>
      <div className="header">
        <div className='flex justify-center'>
          <FaSpotify size={34} className='items-center' />
        </div>
        <h1 className='h1'>Log in to Spotify</h1>
      </div>
      <form action="" onSubmit={submitHandler} className='form'>
        <div className="input-box">
          <label htmlFor="email" className='label'>Email</label>
          <input type="email"
            name='email'
            placeholder='Email'
            className='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="password" className='label'>Password</label>
          <input type="password"
            name='password'
            placeholder='Password'
            className='input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn'>{loading ? " Please Wait..." : "Log In"}</button>
      </form>
      <hr className='hr' />
      <h3 className='h3'>Don't have an account? <Link to="/register" className='Link'>Sign up for Spotify</Link> </h3>
      <footer className='login-footer'>
        <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </footer>
    </div>
  )
}

export default Loginpage
