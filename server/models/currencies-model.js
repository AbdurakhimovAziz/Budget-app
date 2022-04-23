const mongoose = require('mongoose');

const currenciesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cc: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Currency', currenciesSchema);
