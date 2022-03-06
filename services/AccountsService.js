const accountsData = require('../public/accountsData');

class AccountsService {
  create(account) {
    accountsData.push(account);
    return account;
  }

  getAll() {
    return accountsData;
  }

  getOne(id) {
    return accountsData.find((acc) => acc.id === id);
  }

  update(account) {
    const index = accountsData.findIndex((acc) => acc.id === account.id);

    if (index !== -1) {
      accountsData.splice(index, 1, account);
    }
    return index !== 1;
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
