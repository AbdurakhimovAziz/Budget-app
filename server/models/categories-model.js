const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    unique: false,
    enum: ['income', 'expense'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

categoriesSchema.index({ title: 1, type: 1, user_id: 1 }, { unique: true });

const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;
