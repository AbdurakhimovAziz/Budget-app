const Category = require('../models/categories-model');
const defaultCategories = require('../utils/defaultCategories');

class CategiresService {
  getAll(userId) {
    return Category.find({ user_id: userId });
  }

  getById(id) {
    return Category.findById(id);
  }

  update(id, category) {
    return Category.findByIdAndUpdate(id, category, { new: true });
  }

  create(category) {
    return new Category(category).save();
  }

  createDefault(userId) {
    defaultCategories.forEach((category) => {
      category.user_id = userId;
    });
    return Category.insertMany(defaultCategories);
  }

  delete(id) {
    return Category.findByIdAndDelete(id);
  }
}

module.exports = new CategiresService();
