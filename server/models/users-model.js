const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  country: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
});

module.exports = mongoose.model('User', userSchema);
