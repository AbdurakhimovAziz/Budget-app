const accountsService = require('../services/accounts-service');

class AccountsController {
  async create(req, res) {
    try {
      const createdAcc = await accountsService.create(req.body);
      res.status(200).json(createdAcc);
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async getAll(req, res) {
    try {
      const accounts = await accountsService.getAll();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const account = await accountsService.getById(id);

      account ? res.status(200).send(account) : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedAcc = await accountsService.update(id, req.body);
      updatedAcc ? res.status(200).json(updatedAcc) : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedAccount = await accountsService.delete(id);
      deletedAccount
        ? res.status(200).json(deletedAccount)
        : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AccountsController();
