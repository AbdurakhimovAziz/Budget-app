const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.getAll);
router.post('/', UsersController.create);
router.get('/:id', UsersController.getOne);

module.exports = router;
