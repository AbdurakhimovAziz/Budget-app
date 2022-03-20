const categoriesService = require('../services/categories-service');

class CategoriesControlle {
  async getAll(req, res) {
    try {
      const categories = await categoriesService.getAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const category = await categoriesService.getById(id);
      category ? res.status(200).json(category) : res.status(404).json({ message: "Category doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req, res) {
    try {
      const createdCategory = await categoriesService.create(req.body);
      res.status(200).json(createdCategory);
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedCategory = await categoriesService.update(id, req.body);
      updatedCategory
        ? res.status(200).json(updatedCategory)
        : res.status(404).json({ message: "Category doesn't exist" });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCategory = await categoriesService.delete(id);
      deletedCategory
        ? res.status(200).json(deletedCategory)
        : res.status(404).json({ message: "Category doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new CategoriesControlle();
