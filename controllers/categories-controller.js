const categoriesService = require('../services/categories-service');

class CategoriesControlle {
  async getAll(req, res) {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  }
}

module.exports = new CategoriesControlle();
