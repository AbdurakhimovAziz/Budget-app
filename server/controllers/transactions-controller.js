const transactionsService = require('../services/transactions-service');
const { handleError } = require('../utils/utils');

class TransactionsController {
  async getAll(req, res) {
    try {
      const { accountId } = req.query;
      if (accountId) {
        const transactions = await transactionsService.getAll(accountId);
        res.status(200).json(transactions);
      } else throw new Error({ message: 'Accound id is required', status: 400 });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const transaction = await transactionsService.getById(id);
      transaction ? res.status(200).json(transaction) : res.status(404).json({ message: "transaction doesn't exist" });
    } catch (error) {
      handleError(res, error);
    }
  }

  async create(req, res) {
    try {
      const transaction = await transactionsService.create(req.body);
      res.status(200).json(transaction);
    } catch (error) {
      handleError(res, error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const transaction = req.body;
      await transactionsService.update(id, transaction);

      res.status(200).json(transaction);
    } catch (error) {
      handleError(res, error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTransaction = await transactionsService.delete(id);
      deletedTransaction
        ? res.status(200).json(deletedTransaction)
        : res.status(404).json({ message: "transaction doesn't exist" });
    } catch (error) {
      handleError(res, error);
    }
  }
}

module.exports = new TransactionsController();
