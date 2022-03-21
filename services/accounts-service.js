const Account = require('../models/accounts-model');

class AccountsService {
  create(account) {
    return new Account(account).save();
  }

  getAll() {
    return Account.find();
  }

  getById(id) {
    return Account.findById(id);
  }

  update(id, account) {
    return Account.findByIdAndUpdate(id, account, { new: true });
  }

  delete(id) {
    return Account.findByIdAndDelete(id);
  }

  async updateBalance(accountId, amount) {
    const account = await Account.findById(accountId);
    account.balance += amount;
    await account.save();
  }
}

module.exports = new AccountsService();
