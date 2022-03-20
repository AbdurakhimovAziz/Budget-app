const accountsService = require('../services/accounts-service');
const transactionsService = require('../services/transactions-service');

class TransactionsController {
  async getAll(req, res) {
    try {
      const transactions = await transactionsService.getAll();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const transaction = await transactionsService.getById(id);
      transaction ? res.status(200).json(transaction) : res.status(404).json({ message: "transaction doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req, res) {
    try {
      const transaction = await transactionsService.create(req.body);
      await accountsService.updateBalance({ transactionAfter: transaction });
      res.status(200).json(transaction);
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const transaction = req.body;
      const updatedTransaction = await transactionsService.update(id, transaction);
      if (transaction.amount !== updatedTransaction.amount)
        await accountsService.updateBalance({ transactionBefore: updatedTransaction, transactionAfter: transaction });
      res.status(200).json(transaction);
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      res.status(status).json({ message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTransaction = await transactionsService.delete(id);
      await accountsService.updateBalance({ transactionBefore: deletedTransaction });
      deletedTransaction
        ? res.status(200).json(deletedTransaction)
        : res.status(404).json({ message: "transaction doesn't exist" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new TransactionsController();
