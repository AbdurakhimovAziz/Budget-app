const mongoose = require('mongoose'),
  { ObjectId } = mongoose.Types;

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  desciption: {
    type: String,
  },
  categories: {
    type: [ObjectId],
    ref: 'Category',
    required: true,
  },
  account_id: {
    type: ObjectId,
    ref: 'Account',
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
