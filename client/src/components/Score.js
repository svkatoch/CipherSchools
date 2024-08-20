// src/components/Score.js
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Score.module.css";

const Score = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || {};

  const token = localStorage.getItem('authToken');
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const visitedTestSelector = JSON.parse(localStorage.getItem('visitedTestSelector'));

  useEffect(() => {
    if (!token || !isLoggedIn) {
      navigate('/login');
    } else if (!visitedTestSelector) {
      navigate('/select'); // Redirect to TestSelector if not visited
    } else {
      console.log('Token:', token);
      console.log('isLoggedIn:', isLoggedIn);
    }
  }, [navigate, token, isLoggedIn, visitedTestSelector]);

  if (!token || !isLoggedIn || !visitedTestSelector) {
    return null; // Prevent rendering if not authenticated or TestSelector not visited
  }

  return (
    <div className={styles.scoreContainer}>
      <h1>Test Score</h1>
      <p>Your Score: {score} / {total}</p>
    </div>
  );
};

export default Score;
