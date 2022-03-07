const accountsService = require('../services/AccountsService');

class AccountsController {
  create(req, res) {
    const newAcc = req.body;
    const createdAcc = accountsService.create(newAcc);
    createdAcc ? res.json(createdAcc) : res.status(400).json({ message: 'invalid request' });
  }

  getAll(req, res) {
    const accounts = accountsService.getAll();
    res.json(accounts);
  }

  getOne(req, res) {
    const id = +req.params.id;
    const account = accountsService.getOne(id);

    account ? res.send(account) : res.status(404).json({ message: "account doesn't exist" });
  }

  update(req, res) {
    const account = req.body;
    account.id = +req.params.id;

    accountsService.update(account) ? res.json(account) : res.status(404).json({ message: "account doesn't exist" });
  }

  delete(req, res) {
    const id = +req.params.id;

    accountsService.delete(id)
      ? res.json({ message: 'success' })
      : res.status(404).json({ message: "account doesn't exist" });
  }
}

module.exports = new AccountsController();
