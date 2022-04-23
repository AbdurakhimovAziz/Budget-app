const express = require('express');
const router = express.Router();
const CurrencyController = require('../controllers/currencies-controller');

router.get('/', CurrencyController.getAll);

module.exports = router;
