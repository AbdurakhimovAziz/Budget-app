const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories-controller');

router.get('/', CategoriesController.getAll);
router.get('/:id', CategoriesController.getOne);
router.post('/', CategoriesController.create);
router.put('/:id', CategoriesController.update);
router.delete('/:id', CategoriesController.delete);

module.exports = router;
