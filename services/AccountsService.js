const accountsData = require('../public/accountsData');

class AccountsService {
  create(account) {
    if (accountsData.findIndex((el) => el.id === account.id) === -1) {
      accountsData.push(account);
      return account;
    } else return null;
  }
  getAll() {
    return accountsData;
  }
  getOne(id) {
    const foundAcc = accountsData.find((acc) => acc.id === id);
    return foundAcc ? foundAcc : null;
  }
  update(updatedAcc) {
    const index = accountsData.findIndex((account) => account.id === updatedAcc.id);

    if (index !== -1) {
      accountsData.splice(index, 1, updatedAcc);
      return true;
    } else return false;
  }

  delete(id) {
    const index = accountsData.findIndex((account) => account.id === id);

    if (index !== -1) {
      accountsData.splice(index, 1);
      return true;
    } else return false;
  }
}

module.exports = new AccountsService();
