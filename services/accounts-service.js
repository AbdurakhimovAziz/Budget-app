const Account = require('../models/accounts-model');
const accountsData = require('../public/accounts-data');

class AccountsService {
  constructor() {
    // Account.insertMany(accountsData).then((data) => {
    //   Account.find()
    //     .populate('userId')
    //     .then((data) => console.log(data));
    // });
  }
  create(account) {
    if (accountsData.findIndex((el) => el.id === account.id) === -1) {
      accountsData.push(account);
      return account;
    } else return null;
  }

  async getAll() {
    return Account.find();
  }

  getOne(id) {
    return accountsData.find((acc) => acc.id === id);
  }

  update(account) {
    const index = accountsData.findIndex((acc) => acc.id === account.id);

    if (index !== -1) {
      accountsData.splice(index, 1, account);
    }
    return index !== -1;
  }

  delete(id) {
    const index = accountsData.findIndex((account) => account.id === id);

    if (index !== -1) {
      accountsData.splice(index, 1);
    }
    return index !== -1;
  }
}

module.exports = new AccountsService();
