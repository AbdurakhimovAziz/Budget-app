const Category = require('../models/categories-model');

class CategiresService {
  constructor() {
    this.categories = [
      {
        title: 'Food',
        type: 'expense',
        user_id: '623418427775e062b27f417d',
      },
      {
        title: 'Housing',
        type: 'expense',
        user_id: '623418427775e062b27f417d',
      },
      {
        title: 'Education',
        type: 'expense',
        user_id: '623418427775e062b27f417d',
      },
      {
        title: 'salary',
        type: 'income',
        user_id: '623418427775e062b27f417d',
      },
      {
        title: 'gift',
        type: 'income',
        user_id: '623418427775e062b27f417d',
      },
    ];

    // Category.insertMany(this.categories);
  }

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
