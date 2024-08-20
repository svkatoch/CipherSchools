// src/components/TestSelector.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TestSelector.module.css";
import Logout from './Logout'; // Import the Logout component

const TestSelector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';

    if (!authToken || !isLoggedIn) {
      // Token or login status is invalid
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
    } else {
      // Token is valid
      alert("Token is valid!");
      console.log('Token:', authToken);
      console.log('Is Logged In:', isLoggedIn);
    }
  }, [navigate]);

  const handleTestSelect = (testName) => {
    localStorage.setItem('fromTestSelector', 'true');
    alert(`You selected ${testName} test.`);
    navigate(`/test/${testName}`);
    navigate(`/test/${testName}`);
  };

  return (
    <div className={styles.testSelector}>
      <h1>Attempt Any Test</h1>
      <div className={styles.advice}>
        <h3>No Cheating: Any form of cheating, including using unauthorized resources, communicating with others, or copying answers, is strictly prohibited.</h3>
        <h3>Single Attempt Only: Each test can only be attempted once. Ensure you complete the test in one sitting.</h3>
        <h3>No External Help: You are not allowed to use external help, including notes, textbooks, or online resources during the test.</h3>
        <h3>Identification Verification: You must verify your identity before starting the test. This may include photo verification or biometric checks.</h3>
        <h3>No Sharing of Test Content: Do not share or discuss the test questions or answers with others. This includes posting on social media or other forums.</h3>
      </div>
      <h1>Tests</h1>
      <button onClick={() => handleTestSelect("dsa")}>Data Structure and Algorithm</button>
      <button onClick={() => handleTestSelect("aiml")}>Artificial Intelligence</button>
      {/* Include Logout Button */}
      <Logout />
    </div>
  );
};

export default TestSelector;
