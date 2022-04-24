const currenciesService = require('../services/currencies-service');
const { handleError } = require('../utils/utils');

class CurrencyController {
  async getAll(req, res) {
    try {
      const currencies = await currenciesService.getAll();
      res.status(200).json(currencies);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAccountCurrencies(req, res) {
    try {
      const accountCurrencies = await currenciesService.getAllAccountCurrencies();
      res.status(200).json(accountCurrencies);
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new CurrencyController();
