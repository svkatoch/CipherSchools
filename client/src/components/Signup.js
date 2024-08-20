import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // Import the Signup CSS module

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email,
        password
      });
      console.log('Signup successful:', response.data);
      alert("User registered successful");
      // Optionally redirect to login after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      alert('User already exist');
    }
  };

  return (
    <div className={styles.container}>
       <h1 className={styles.heading}>Welcome To CIPHER Test Application</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            className={styles.inputField} 
          />
        </div>
        <div className={styles.formGroup}>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className={styles.inputField} 
          />
        </div>
        <button type="submit" className={styles.button}>Signup</button>
      </form>
      <div className={styles.link}>
        <p>Already have an account?</p>
        <button onClick={() => navigate('/login')} className={styles.linkButton}>Log In</button>
      </div>
    </div>
  );
};

export default Signup;
