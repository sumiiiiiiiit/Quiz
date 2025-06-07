const express = require('express');
const router = express.Router();
const { 
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Update user
router.put('/:id', updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router; 