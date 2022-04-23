const Currency = require('../models/currencies-model');

class CurrenciesService {
  getAll() {
    return Currency.find();
  }
}

module.exports = new CurrenciesService();
