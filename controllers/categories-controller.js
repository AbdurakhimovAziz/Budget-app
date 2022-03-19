const categoriesService = require('../services/categories-service');

class CategoriesControlle {
  async getAll(req, res) {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  }

  async create(req, res) {
    try {
      const createdCategory = await categoriesService.create(req.body);
      res.status(200).json(createdCategory);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new CategoriesControlle();
