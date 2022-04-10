const Transaction = require('../models/transactions-model');
const accountsService = require('./accounts-service');

class TransactionsService {
  getAll(accountId) {
    return accountId
      ? Transaction.find({ account_id: accountId }).populate('categories', 'title')
      : Transaction.find().populate('categories', 'title');
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
    const { account_id, amount, type } = transaction;
    let newAmount = 0;
    if (type === oldTransaction.type) newAmount = transaction.amount - oldTransaction.amount;
    else newAmount = amount + oldTransaction.amount;
    console.log(newAmount);

    await accountsService.updateBalance(account_id, newAmount, type);
    return oldTransaction;
  }

  async delete(id) {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    const { account_id, amount, type } = deletedTransaction;
    await accountsService.updateBalance(account_id, -amount, type);
    return deletedTransaction;
  }
}

module.exports = new TransactionsService();
