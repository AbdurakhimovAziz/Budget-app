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
  async create(account) {
    const foundAcc = await Account.findOne({ title: account.title, user_id: account.user_id });

    if (!foundAcc) {
      const newAccount = await new Account(account).save();
      return newAccount;
    } else return null;
  }

  async getAll() {
    return Account.find();
  }

  async getById(id) {
    return Account.findById(id);
  }

  async update(account) {
    const updatedAcc = await Account.findByIdAndUpdate(account._id, account, { new: true });
    return updatedAcc;
  }

  async delete(id) {
    return Account.deleteOne({ _id: id });
  }
}

module.exports = new AccountsService();
