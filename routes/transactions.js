const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions-controller');

router.get('/', TransactionsController.getAll);
router.get('/:id', TransactionsController.getOne);
router.post('/', TransactionsController.create);
router.put('/:id', TransactionsController.update);
router.delete('/:id', TransactionsController.delete);

module.exports = router;
