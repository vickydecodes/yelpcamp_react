import React from 'react'
import './Register.css';
import { Link } from 'react-router-dom';


export default function Register() {
  return (
    <div className="login-page">
      <div className="register_container">
        <div className="header">
          <h1>Register</h1>
          <h5 className='mt-3'>A whole community awaits for your post!</h5>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="email" className='ms-1'><h5>Email</h5></label>
          <input type="text" id="email" className="email" placeholder="Enter your email"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="username" className='ms-1'><h5>Username</h5></label>
          <input type="text" id="username" className="email" placeholder="Enter your username"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="password" className='ms-1'><h5>Password</h5></label>
          <input type="password" id="password" className="password" placeholder="Enter your password"/>
        </div>
        <button className='mt-5'>Register</button>
        <p className='mt-4'>
            <Link to="/Login" className="link">Already have an account?, Login</Link>
        </p>
      </div>
    </div>
  )
}
