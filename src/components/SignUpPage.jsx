import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Store error message
  const [isLoading, setIsLoading] = useState(false);

  // Validate email or phone
  const validateEmailOrPhone = (input) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/; // Simple check for a 10-digit phone number
    return emailPattern.test(input) || phonePattern.test(input);
  };

  // Handle signup
  const handleSignUp = async () => {
    // Client-side validation
    if (!emailOrPhone || !fullName || !username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!validateEmailOrPhone(emailOrPhone)) {
      setError('Please enter a valid email or phone number');
      return;
    }
    
    if (password.length !== 4 || isNaN(password)) {
      setError('Password must be exactly 4 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          fullName,
          emailOrPhone,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      alert('Sign-up successful! Please log in.');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <input
        type="text"
        placeholder="Email or Phone Number"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password (4 digits)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button 
        onClick={handleSignUp} 
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
      <p>
        Already have an account? <span style={styles.link} onClick={() => navigate('/login')}>Log In</span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)', // Blue gradient background
    height: '100vh', // Full height for mobile view
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '80%',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  link: {
    color: 'lightblue',
    cursor: 'pointer',
  },
  error: {
    color: '#ffcccc',
    margin: '10px 0',
  },
};

export default SignUpPage;
