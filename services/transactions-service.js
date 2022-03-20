const Transaction = require('../models/transactions-model');

class TransactionsService {
  getAll() {
    return Transaction.find().populate('categories', 'title');
  }

  getById(id) {
    return Transaction.findById(id);
  }

  create(transaction) {
    return new Transaction(transaction).save();
  }

  update(id, transaction) {
    return Transaction.findByIdAndUpdate(id, transaction);
  }

  delete(id) {
    return Transaction.findByIdAndDelete(id);
  }
}

module.exports = new TransactionsService();
