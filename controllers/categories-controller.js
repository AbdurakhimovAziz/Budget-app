const categoriesService = require('../services/categories-service');

class CategoriesControlle {
  async getAll(req, res) {
    const categories = await categoriesService.getAll();
    res.status(200).json(categories);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const category = await categoriesService.getById(id);
    category ? res.status(200).json(category) : res.status(404).json({ message: "Category doesn't exist" });
  }

  async create(req, res) {
    try {
      const createdCategory = await categoriesService.create(req.body);
      res.status(200).json(createdCategory);
    } catch (error) {
      res.status(400).json({ message: 'A category with this title already exists' });
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
      res.status(400).json({ message: 'A category with this title already exists' });
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
      res.status(400).json(error);
    }
  }
}

module.exports = new CategoriesControlle();
