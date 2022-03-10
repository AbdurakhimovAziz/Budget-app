const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

router.get('/', UsersController.getAll);
router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.get('/:id', UsersController.getOne);

module.exports = router;
