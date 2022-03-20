const Transaction = require('../models/transactions-model');
const accountsService = require('./accounts-service');

class TransactionsService {
  getAll() {
    return Transaction.find().populate('categories', 'title');
  }

  getById(id) {
    return Transaction.findById(id);
  }

  async create(transaction) {
    const newTransaction = await new Transaction(transaction).save();
    await accountsService.updateBalance({ newTransaction: transaction });
    return newTransaction;
  }

  async update(id, transaction) {
    const oldTransaction = await Transaction.findByIdAndUpdate(id, transaction);
    if (transaction.amount !== oldTransaction.amount)
      await accountsService.updateBalance({ oldTransaction: oldTransaction, newTransaction: transaction });
    return oldTransaction;
  }

  async delete(id) {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    await accountsService.updateBalance({ oldTransaction: deletedTransaction });
    return deletedTransaction;
  }
}

module.exports = new TransactionsService();
