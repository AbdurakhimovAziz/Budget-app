const Category = require('../models/categories-model');

class CategiresService {
  getAll() {
    return Category.find();
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
