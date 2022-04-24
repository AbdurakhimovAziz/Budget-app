const Currency = require('../models/currencies-model');
const AccountCurrency = require('../models/account-currencies-model');

class CurrenciesService {
  getAll() {
    return Currency.find();
  }

  getAllAccountCurrencies() {
    return AccountCurrency.find();
  }
}

module.exports = new CurrenciesService();
