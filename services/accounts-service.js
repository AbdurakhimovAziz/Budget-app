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

  update(account) {
    return Account.findByIdAndUpdate(account._id, account, { new: true });
  }

  delete(id) {
    return Account.findByIdAndDelete(id);
  }
}

module.exports = new AccountsService();
