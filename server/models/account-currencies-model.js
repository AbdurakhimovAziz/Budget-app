const mongoose = require('mongoose');

const accountCurrenciesSchema = new mongoose.Schema({
  cc: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('AccountCurrency', accountCurrenciesSchema);
