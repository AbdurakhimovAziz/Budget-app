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

  async updateBalance({ oldTransaction, newTransaction }) {
    const { account_id } = newTransaction || oldTransaction;
    const account = await Account.findById(account_id);

    if (oldTransaction) {
      const { type, amount } = oldTransaction;
      if (type === 'income') account.balance -= amount;
      else account.balance += amount;
    }

    if (newTransaction) {
      const { type, amount } = newTransaction;
      if (type === 'income') account.balance += amount;
      else account.balance -= amount;
    }

    await account.save();
  }
}

module.exports = new AccountsService();
