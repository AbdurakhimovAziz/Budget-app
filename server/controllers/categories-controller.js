const categoriesService = require('../services/categories-service');
const { handleError } = require('../utils/utils');

class CategoriesControlle {
  async getAll(req, res) {
    try {
      const { userId } = req.query;
      if (userId) {
        const categories = await categoriesService.getAll(userId);
        res.status(200).json(categories);
      } else {
        throw new Error({ message: 'User id is required', status: 400 });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const category = await categoriesService.getById(id);
      category ? res.status(200).json(category) : res.status(404).json({ message: "Category doesn't exist" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async create(req, res) {
    try {
      const createdCategory = await categoriesService.create(req.body);
      res.status(200).json(createdCategory);
    } catch (error) {
      handleError(res, error);
    }
  }

  async createDefault(req, res) {
    try {
      const { userId } = req.query;
      const createdCategories = await categoriesService.createDefault(userId);
      res.status(200).json(createdCategories);
    } catch (error) {
      handleError(res, error);
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
      handleError(res, error);
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
      handleError(res, error);
    }
  }
}

module.exports = new CategoriesControlle();
