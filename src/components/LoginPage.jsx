import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pwd) => {
    const regex = /^\d{4}$/; // Exactly 4 digits
    return regex.test(pwd);
  };

  const handleLogin = async () => {
    // Client-side validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be exactly 4 digits (e.g., 1234)");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid username or password');
      }
      
      // Save user info in localStorage for state management
      localStorage.setItem('userInfo', JSON.stringify({
        id: data._id,
        username: data.username,
        fullName: data.fullName,
        emailOrPhone: data.emailOrPhone
      }));
      
      // Successful login
      navigate('/home');
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
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="4-digit Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button 
        onClick={handleLogin} 
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
      <p>
        Don't have an account?{' '}
        <span style={styles.link} onClick={() => navigate('/signup')}>Sign up</span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
    height: '100vh',
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

export default LoginPage;
