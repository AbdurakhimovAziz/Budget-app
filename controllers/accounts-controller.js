const accountsService = require('../services/accounts-service');

class AccountsController {
  async create(req, res) {
    try {
      const createdAcc = await accountsService.create(req.body);
      res.status(200).json(createdAcc);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'An account with this title already exists' });
    }
  }

  async getAll(req, res) {
    const accounts = await accountsService.getAll();
    res.status(200).json(accounts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const account = await accountsService.getById(id);

    account ? res.status(200).send(account) : res.status(404).json({ message: "Account doesn't exist" });
  }

  async update(req, res) {
    try {
      const updatedAcc = await accountsService.update(req.body);
      updatedAcc ? res.status(200).json(updatedAcc) : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      res.status(400).json({ message: 'An account with this title already exists' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const deletedAccount = await accountsService.delete(id);
    deletedAccount ? res.status(200).json(deletedAccount) : res.status(404).json({ message: "Account doesn't exist" });
  }
}

module.exports = new AccountsController();
