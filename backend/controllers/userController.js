const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, emailOrPhone, password } = req.body;

  // Validation
  if (!username || !fullName || !emailOrPhone || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  // 4-digit password validation
  if (password.length !== 4 || isNaN(password)) {
    res.status(400);
    throw new Error('Password must be exactly 4 digits');
  }

  // Check if user exists
  const userExists = await User.findOne({ 
    $or: [{ username }, { emailOrPhone }] 
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    username,
    fullName,
    emailOrPhone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      emailOrPhone: user.emailOrPhone,
      message: 'User registered successfully'
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    res.status(400);
    throw new Error('Please provide username and password');
  }

  // Find the user
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      fullName: user.fullName,
      emailOrPhone: user.emailOrPhone,
      message: 'Login successful'
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Update user information
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const { fullName, emailOrPhone } = req.body;
  const userId = req.params.id;

  // Find user
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Update user
  user.fullName = fullName || user.fullName;
  user.emailOrPhone = emailOrPhone || user.emailOrPhone;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    fullName: updatedUser.fullName,
    emailOrPhone: updatedUser.emailOrPhone,
    message: 'User updated successfully'
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Find user
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Delete user
  await user.deleteOne();

  res.status(200).json({
    message: 'User deleted successfully'
  });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
}; 