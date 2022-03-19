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

  async getAll() {
    return Category.find();
  }
}

module.exports = new CategiresService();
