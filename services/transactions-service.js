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
    const { account_id, amount } = newTransaction;
    await accountsService.updateBalance(account_id, amount);
    return newTransaction;
  }

  async update(id, transaction) {
    const oldTransaction = await Transaction.findByIdAndUpdate(id, transaction);
    if (transaction.amount !== oldTransaction.amount) {
      const { account_id, amount } = oldTransaction;
      let newAmount = transaction.amount - amount;
      await accountsService.updateBalance(account_id, newAmount);
    }
    return oldTransaction;
  }

  async delete(id) {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    const { account_id, amount } = deletedTransaction;
    await accountsService.updateBalance(account_id, -amount);
    return deletedTransaction;
  }
}

module.exports = new TransactionsService();
