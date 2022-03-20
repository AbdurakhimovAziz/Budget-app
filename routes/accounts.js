const express = require('express');
const router = express.Router();
const AccountsController = require('../controllers/accounts-controller');

router.get('/', AccountsController.getAll);
router.get('/:id', AccountsController.getOne);
router.post('/', AccountsController.create);
router.put('/:id', AccountsController.update);
router.delete('/:id', AccountsController.delete);

module.exports = router;
