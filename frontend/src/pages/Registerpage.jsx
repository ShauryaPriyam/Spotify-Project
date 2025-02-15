import React, { useEffect, useState } from 'react'
import { FaSpotify } from "react-icons/fa6"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/Usercontext';

const Registerpage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { user, registerUser, loading } = useUserContext()

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser(username, email, password, navigate)
  }
  return (
    <div className='login-container'>
      <div className="header">
        <div className='flex justify-center'>
          <FaSpotify size={34} />
        </div>
        <h1 className='h1'>Sign in to Spotify</h1>
      </div>
      <form action="" onSubmit={submitHandler} className='form'>
        <div className="input-box">
          <label htmlFor="email" className='label'>Username</label>
          <input type="text"
            name='username'
            placeholder='Username'
            className='input'
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="email" className='label'>Email</label>
          <input type="email"
            name='email'
            placeholder='name@domain.com'
            className='input'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="password" className='label'>Password</label>
          <input type="password"
            name='password'
            placeholder='Password'
            className='input'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='btn'>{loading ? " Please Wait..." : "Sign In"}</button>
      </form>
      <hr className='hr' />
      <h3 className='h3'>Already have an account? <Link to="/login" className='Link'>Login for Spotify</Link> </h3>
      <footer className='login-footer'>
        <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
      </footer>
    </div>
  )
}

export default Registerpage
