import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import footballImage from '../images/football.jpg';
import basketballImage from '../images/basketball.jpg';
import cricketImage from '../images/cricket.jpg';
import Header from './Header';

const HomePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    emailOrPhone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get user information from localStorage on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedInfo);
      setEditForm({
        fullName: parsedInfo.fullName,
        emailOrPhone: parsedInfo.emailOrPhone
      });
    }
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    navigate(`/rules/${category}`);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Toggle user info modal
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
    setError('');
    setSuccess('');
  };

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle update submission
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update user');
      }

      // Update local storage with new user info
      const updatedUserInfo = {
        ...userInfo,
        fullName: data.fullName,
        emailOrPhone: data.emailOrPhone
      };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);
      setIsEditing(false);
      setSuccess('User information updated successfully!');
      setError('');
    } catch (error) {
      setError(error.message);
      setSuccess('');
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      fullName: userInfo.fullName,
      emailOrPhone: userInfo.emailOrPhone
    });
    setError('');
    setSuccess('');
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  // Handle delete user
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userInfo.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }

      // Clear local storage and redirect to login
      localStorage.removeItem('userInfo');
      navigate('/login');
    } catch (error) {
      setError(error.message);
      setShowDeleteConfirm(false);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setError('');
  };

  return (
    <div style={styles.container}>
      <Header />
      
      {/* Buttons container */}
      <div style={styles.buttonsContainer}>
        <button onClick={toggleUserInfo} style={styles.infoButton}>
          User Info
        </button>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      
      {/* User info modal */}
      {showUserInfo && userInfo && (
        <div style={styles.userInfoModal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>User Information</h3>
            <button onClick={toggleUserInfo} style={styles.closeIconButton}>
              ✕
            </button>
          </div>
          {!isEditing ? (
            <>
              <div style={styles.infoItem}>
                <p><strong>Username:</strong> {userInfo.username}</p>
              </div>
              <div style={styles.infoItem}>
                <p><strong>Full Name:</strong> {userInfo.fullName}</p>
              </div>
              <div style={styles.infoItem}>
                <p><strong>Email/Phone:</strong> {userInfo.emailOrPhone}</p>
              </div>
              <div style={styles.actionButtons}>
                <button onClick={handleEdit} style={styles.editButton}>
                  Edit Info
                </button>
                <button onClick={handleDeleteConfirm} style={styles.deleteButton}>
                  Delete Account
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={styles.formGroup}>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email/Phone:</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={editForm.emailOrPhone}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.actionButtons}>
                <button onClick={handleUpdate} style={styles.updateButton}>
                  Update
                </button>
                <button onClick={handleCancel} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </>
          )}
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div style={styles.confirmModal}>
          <div style={styles.confirmContent}>
            <h3 style={styles.modalTitle}>Confirm Delete</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div style={styles.actionButtons}>
              <button onClick={handleDelete} style={styles.deleteButton}>
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete} style={styles.cancelButton}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <h2 style={styles.subtitle}>Select a Category to Start:</h2>
      <div style={styles.imageContainer}>
        <div style={styles.imageWrapper} onClick={() => handleCategorySelect('football')}>
          <img src={footballImage} alt="Football" style={styles.image} />
        </div>
        <div style={styles.imageWrapper} onClick={() => handleCategorySelect('basketball')}>
          <img src={basketballImage} alt="Basketball" style={styles.image} />
        </div>
        <div style={styles.imageWrapper} onClick={() => handleCategorySelect('cricket')}>
          <img src={cricketImage} alt="Cricket" style={styles.image} />
        </div>
      </div>
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
    position: 'relative',
  },
  title: {
    color: 'white',
    marginBottom: '20px',
  },
  subtitle: {
    color: 'white',
    marginBottom: '20px',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
  },
  imageWrapper: {
    textAlign: 'center',
    cursor: 'pointer',
    width: '250px',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  imageLabel: {
    marginTop: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    gap: '10px',
  },
  logoutButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  infoButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  userInfoModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    zIndex: 10,
    width: '350px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeIconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    fontSize: '18px',
  },
  infoItem: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'center',
  },
  editButton: {
    padding: '8px 15px',
    backgroundColor: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  deleteButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  updateButton: {
    padding: '8px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    color: '#333',
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  error: {
    color: '#f44336',
    margin: '10px 0',
    fontSize: '14px',
    textAlign: 'center',
  },
  success: {
    color: '#4CAF50',
    margin: '10px 0',
    fontSize: '14px',
    textAlign: 'center',
  },
  confirmModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  confirmContent: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    width: '350px',
    textAlign: 'center',
  },
};

export default HomePage;
