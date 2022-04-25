const Account = require('../models/accounts-model');

class AccountsService {
  async create(account) {
    const acc = await new Account(account).save();
    return acc.populate('currency');
  }

  getAll(userId) {
    return Account.find({ user_id: userId }).populate('currency');
  }

  getById(id) {
    return Account.findById(id).populate('currency');
  }

  update(id, account) {
    return Account.findByIdAndUpdate(id, account, { new: true }).populate('currency');
  }

  delete(id) {
    return Account.findByIdAndDelete(id);
  }

  async updateBalance(accountId, amount, tranasctionType) {
    const account = await Account.findById(accountId);
    tranasctionType === 'income' ? (account.balance += amount) : (account.balance -= amount);
    await account.save();
  }
}

module.exports = new AccountsService();
