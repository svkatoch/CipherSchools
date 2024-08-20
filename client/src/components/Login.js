import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Store token and set the boolean to true
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));

      console.log('Token:', response.data.token);
      console.log('isLoggedIn:', true);

      alert('Login successful! Redirecting to the test selector.');

      // Redirect to the test selector page
      navigate('/select');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome To CIPHER Test Application</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          className={styles.inputField}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          className={styles.inputField}
        />
        <button type="submit" className={styles.button}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.link}>
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/')} className={styles.linkButton}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
