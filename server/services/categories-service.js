const Category = require('../models/categories-model');

class CategiresService {
  getAll(userId) {
    return userId ? Category.find({ user_id: userId }) : Category.find();
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

  delete(id) {
    return Category.findByIdAndDelete(id);
  }
}

module.exports = new CategiresService();
