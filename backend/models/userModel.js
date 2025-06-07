const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Please add a full name'],
    },
    emailOrPhone: {
      type: String,
      required: [true, 'Please add an email or phone'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

// Method to check if entered password matches stored password (plaintext)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 