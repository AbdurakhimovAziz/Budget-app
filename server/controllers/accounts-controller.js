const accountsService = require('../services/accounts-service');
const { handleError } = require('../utils/utils');

class AccountsController {
  async create(req, res) {
    try {
      const createdAcc = await accountsService.create(req.body);
      res.status(200).json(createdAcc);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAll(req, res) {
    try {
      const accounts = await accountsService.getAll();
      res.status(200).json(accounts);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const account = await accountsService.getById(id);

      account ? res.status(200).send(account) : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedAcc = await accountsService.update(id, req.body);
      updatedAcc ? res.status(200).json(updatedAcc) : res.status(404).json({ message: "Account doesn't exist" });
    } catch (error) {
      handleError(res, error);
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
      handleError(res, error);
    }
  }
}

module.exports = new AccountsController();
