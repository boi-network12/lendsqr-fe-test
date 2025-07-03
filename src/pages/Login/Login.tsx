// Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import FormImg from '../../assets/pablo-sign-in 1.svg';
import './Login.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Clear error and proceed with login
    setError('');
    // Simulate successful login (replace with actual authentication logic)
    navigate('/users'); // Navigate to /users
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-page'>
      <div className='image-container'>
        <img src={FormImg} alt='form bg' />
      </div>
      <div className='form-container'>
        <form onSubmit={handleLogin}>
          <div className='textBox'>
            <h1>welcome</h1>
            <span>Enter details to login.</span>
          </div>

          {error && (
            <div className='error-message'>
              {error}
            </div>
          )}

          <div className='input-container'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='input-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? 'hide' : 'show'}
            </span>
          </div>

          <p className='link'>
            <Link to='/forgot-password'>Forgot password</Link>
          </p>

          <button className='btn' type='submit'>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;