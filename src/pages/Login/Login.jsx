import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login_container">
        <div className="header_login">
          <h1>Login</h1>
          <h5 className='mt-3'>Welcome back to YelpCamp!</h5>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="email" className='ms-1'><h5>Email</h5></label>
          <input type="text" id="email" className="email" placeholder="Enter your email"/>
        </div>
        <div className='text-start mt-4'>
          <label htmlFor="password" className='ms-1'><h5>Password</h5></label>
          <input type="password" id="password" className="password" placeholder="Enter your password"/>
        </div>
        <button className='mt-5'>Login</button>
        <p className='mt-4'>
            <Link to="/register" className="link">Don't have an account?,  Register</Link>
        </p>
      </div>
    </div>
  );
}
