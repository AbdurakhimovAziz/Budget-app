const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  __v: {
    type: Number,
    select: false,
  },
});

categoriesSchema.pre('validate', async function (next) {
  const exists = await Category.exists({ title: this.title, type: this.type });
  console.log(this);
  if (exists) {
    const err = this.invalidate('title', 'category with this title already exists');
    next(err);
  }
});

const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;
