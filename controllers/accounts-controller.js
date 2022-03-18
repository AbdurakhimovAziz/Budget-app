const accountsService = require('../services/accounts-service');

class AccountsController {
  async create(req, res) {
    const newAcc = req.body;
    const createdAcc = await accountsService.create(newAcc);
    createdAcc
      ? res.status(200).json(createdAcc)
      : res.status(400).json({ message: 'account with this title already exists' });
  }

  async getAll(req, res) {
    const accounts = await accountsService.getAll();
    res.status(200).json(accounts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const account = await accountsService.getById(id);

    account ? res.status(200).send(account) : res.status(404).json({ message: "account doesn't exist" });
  }

  async update(req, res) {
    const account = req.body;
    const updatedAcc = await accountsService.update(account);

    updatedAcc ? res.status(200).json(updatedAcc) : res.status(404).json({ message: "account doesn't exist" });
  }

  async delete(req, res) {
    const { id } = req.params;

    accountsService.delete(id)
      ? res.status(200).json({ message: 'success' })
      : res.status(404).json({ message: "account doesn't exist" });
  }
}

module.exports = new AccountsController();
