import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header'; 

const RulesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // This function will navigate to the quiz page when the user clicks the start button
  const handleStartQuiz = () => {
    navigate(`/quiz/${category}`);  // Redirect to the quiz page with the chosen category
  };

  return (
    <div style={styles.container}>
       <Header />
      <h1 style={styles.title}>Quiz Rules</h1>
      <ul style={styles.rulesList}>
        <li>1. You need to choose an option in 10 seconds.</li>
        <li>2. If no option is chosen, it will automatically go to the next question.</li>
        <li>3. All your correct answers will be collected, and the result will be shown at the end.</li>
        <li>4. Timer will start after pressing the start button.</li>
      </ul>
      <button onClick={handleStartQuiz} style={styles.startButton}>
        Start Quiz
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',  // Blue gradient background
    height: '100vh', // Full height for mobile view
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: '32px',
    marginBottom: '20px',
  },
  rulesList: {
    color: 'white',
    fontSize: '22px',  // Increased font size for the rules
    listStyleType: 'none',
    padding: '20px',  // Added padding for more space
    marginBottom: '40px',  // Increased margin to separate from the start button
    lineHeight: '1.6',  // Increased line height for better readability
  },
  startButton: {
    padding: '15px 30px',
    backgroundColor: '#4CAF50',  // Green background
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s',
  },
};

export default RulesPage;
