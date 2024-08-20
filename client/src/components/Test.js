import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Test.module.css";
import dsaQuestions from "./dsa.json";
import aimlQuestions from "./aiml.json";


// Mapping subjects to their question files
const questionsMap = {
  dsa: dsaQuestions,
  
  aiml: aimlQuestions,
  
};

const Test = () => {
  const { subject } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60 * 45); // 45 minutes
  const [cameraGranted, setCameraGranted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

  // Handle authentication
  useEffect(() => {
    if (!token || !isLoggedIn) {
      navigate('/login');
    } else {
      console.log('Token:', token);
      console.log('isLoggedIn:', isLoggedIn);
    }
  }, [navigate, token, isLoggedIn]);

  // Ensure the subject is valid
  useEffect(() => {
    if (!questionsMap[subject]) {
      navigate('/');
    }
  }, [subject, navigate]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && cameraGranted && !testSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, cameraGranted, testSubmitted]);

  // Request camera permission
  useEffect(() => {
    if (subject) {
      const requestCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraGranted(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch {
          alert("Camera access is required to start the test.");
        }
      };

      requestCameraPermission();
    }
  }, [subject]);

  const handleOptionClick = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));

    if (option === questionsMap[subject]?.[currentQuestionIndex]?.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsMap[subject]?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    navigate('/score', { state: { score, total: questionsMap[subject]?.length } });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completedQuestions = Object.keys(selectedAnswers).length;
  const pendingQuestions = questionsMap[subject]?.length - completedQuestions;

  if (testSubmitted) {
    return (
      <div className={styles.testCompleted}>
        <p>You have already submitted the test.</p>
      </div>
    );
  }

  if (!questionsMap[subject]) {
    return (
      <div className={styles.error}>
        <p>Test subject not found. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className={styles.testContainer}>
      <div className={styles.header}>
        <h2>{subject ? `${subject.charAt(0).toUpperCase() + subject.slice(1)} Test` : "Test"}</h2>
        <div className={styles.timer}>
          <p>Time Left</p>
          <p>{formatTime(timeLeft)}</p>
        </div>
      </div>
      {!cameraGranted ? (
        <div className={styles.cameraWarning}>
          <p>Waiting for camera permission...</p>
        </div>
      ) : (
        <div className={styles.mainContent}>
          <div className={styles.questionSection}>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{questionsMap[subject]?.[currentQuestionIndex]?.question}</p>
            <div className={styles.options}>
              {questionsMap[subject]?.[currentQuestionIndex]?.options.map((option, index) => (
                <div key={index} className={styles.option}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={selectedAnswers[currentQuestionIndex] === option}
                    onChange={() => handleOptionClick(option)}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
            <div className={styles.controls}>
              <button onClick={handlePreviousQuestion} className={styles.previous}>
                Previous
              </button>
              <button onClick={handleNextQuestion} className={styles.next}>
                Next
              </button>
            </div>
            <button className={styles.submitTest} onClick={handleSubmitTest}>
              Submit Test
            </button>
            <p>Completed: {completedQuestions} / {questionsMap[subject]?.length}</p>
            <p>Pending: {pendingQuestions} / {questionsMap[subject]?.length}</p>
          </div>
          <div className={styles.cameraPreview}>
            <video ref={videoRef} autoPlay muted></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
