const accountsService = require('../services/AccountsService');

class AccountsController {
  create(req, res) {
    const newAcc = req.body;

    if (accountsService.create(newAcc)) res.json(newAcc);
    else res.json({ message: 'account with this id already exists' });
  }

  getAll(req, res) {
    const accounts = accountsService.getAll();
    res.send(accounts);
  }

  getOne(req, res) {
    const id = +req.params.id;
    const account = accountsService.getOne(id);

    if (account) res.send(account);
    else res.status(404).json({ message: "user doesn't exist" });
  }

  update(req, res) {
    const account = req.body;
    account.id = +req.params.id;

    if (accountsService.update(account)) res.json(account);
    else res.json({ message: "account doesn't exist" });
  }

  delete(req, res) {
    const id = +req.params.id;

    if (accountsService.delete(id)) res.json({ message: 'success' });
    else res.json({ message: "account doesn't exist" });
  }
}

module.exports = new AccountsController();
