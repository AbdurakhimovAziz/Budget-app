const Transaction = require('../models/transactions-model');

class TransactionsService {
  constructor() {
    this.transactions = [
      {
        title: 'dfa',
        type: 'income',
        amount: 50,
        date: new Date(),
        categories: ['6235d6381a80712715f7a784'],
        account_id: '6235f9b06eead15af706dbdd',
      },
      {
        title: 'sdd',
        type: 'income',
        amount: 50,
        date: new Date(),
        categories: ['6235d6381a80712715f7a784'],
        account_id: '6235f9b06eead15af706dbdd',
      },
    ];

    // Transaction.insertMany(this.transactions);
  }

  getAll() {
    return Transaction.find().populate('categories', 'title');
  }

  getById(id) {
    return Transaction.findById(id);
  }

  create(transaction) {
    return new Transaction(transaction).save();
  }

  update(transaction) {
    return Transaction.findByIdAndUpdate(transaction._id, transaction);
  }

  delete(id) {
    return Transaction.findByIdAndDelete(id);
  }
}

module.exports = new TransactionsService();
