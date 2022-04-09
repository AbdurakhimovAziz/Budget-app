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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: String,
});

accountSchema.index({ title: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Account', accountSchema);