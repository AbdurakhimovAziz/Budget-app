const Account = require('../models/accounts-model');
const accountsData = require('../public/accounts-data');

class AccountsService {
  constructor() {
    // Account.insertMany(accountsData).then((data) => {
    //   Account.find()
    //     .populate('user_id')
    //     .then((data) => console.log(data));
    // });
  }

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

  async updateBalance({ transactionBefore, transactionAfter }) {
    const { account_id } = transactionAfter || transactionBefore;
    const account = await Account.findById(account_id);

    if (transactionBefore) {
      const { type, amount } = transactionBefore;
      if (type === 'income') account.balance -= amount;
      else account.balance += amount;
    }

    if (transactionAfter) {
      const { type, amount } = transactionAfter;
      if (type === 'income') account.balance += amount;
      else account.balance -= amount;
    }

    await account.save();
  }
}

module.exports = new AccountsService();
