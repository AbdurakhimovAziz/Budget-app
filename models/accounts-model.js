const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  currency: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
  __v: {
    type: Number,
    select: false,
  },
});

module.exports = mongoose.model('Account', accountSchema);
