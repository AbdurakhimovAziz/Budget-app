const Transaction = require('../models/transactions-model');
const accountsService = require('./accounts-service');

class TransactionsService {
  getAll(accountId) {
    return Transaction.find({ account_id: accountId }).populate('categories', 'title');
  }

  getById(id) {
    return Transaction.findById(id);
  }

  async create(transaction) {
    const newTransaction = await new Transaction(transaction).save();
    const { account_id, amount, type } = newTransaction;
    await accountsService.updateBalance(account_id, amount, type);
    return newTransaction;
  }

  async update(id, transaction) {
    const oldTransaction = await Transaction.findByIdAndUpdate(id, transaction);
    if (oldTransaction) {
      const { account_id, amount, type } = transaction;
      let newAmount = 0;

      if (oldTransaction.amount !== amount)
        throw new Error({ message: 'Transaction type can not be changed', status: 400 });
      else newAmount = transaction.amount - oldTransaction.amount;

      await accountsService.updateBalance(account_id, newAmount, type);
    }
    return oldTransaction;
  }

  async delete(id) {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (deletedTransaction) {
      const { account_id, amount, type } = deletedTransaction;
      await accountsService.updateBalance(account_id, -amount, type);
    }
    return deletedTransaction;
  }
}

module.exports = new TransactionsService();
