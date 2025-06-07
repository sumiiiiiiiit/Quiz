import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header'; 
import welldoneImage from '../images/welldone.avif';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };


  return (
    <div style={styles.container}>
      <div style={styles.resultBox}>
      <Header />
        <h1 style={styles.title}>Quiz Completed!</h1>
        <p style={styles.scoreText}>
          You scored <span style={styles.scoreHighlight}>{score}</span> out of <span style={styles.totalHighlight}>{total}</span>
        </p>
        <button style={styles.button} onClick={() => navigate('/home')}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBox: {
    background: `url(${welldoneImage}) center center / cover no-repeat`, // Set the image as background
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: '700',
    color: '#0072ff',
  },
  scoreText: {
    fontSize: '22px',
    marginBottom: '30px',
    color: '#333',
  },
  scoreHighlight: {
    color: '#00c6ff',
    fontWeight: 'bold',
    fontSize: '26px',
  },
  totalHighlight: {
    color: '#0072ff',
    fontWeight: 'bold',
    fontSize: '26px',
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    background: '#00c6ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    background: '#0072ff',
  },
};

export default ResultPage;
