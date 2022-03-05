const express = require('express');
const accountsData = require('../public/accountsData');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(accountsData);
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;
  const foundAcc = accountsData.find((acc) => acc.id === id);
  if (foundAcc) res.send(foundAcc);
  else res.status(404).json({ message: "user doesn't exist" });
});

router.post('/', (req, res) => {
  const newAcc = req.body;
  if (accountsData.findIndex((el) => el.id === newAcc.id) === -1) {
    accountsData.push(newAcc);
    res.json(newAcc);
  } else res.json({ message: 'account with this id already exists' });
});

router.put('/:id', (req, res) => {
  const updatedAcc = req.body;
  const id = +req.params.id;
  updatedAcc.id = id;
  const index = accountsData.findIndex((account) => account.id === id);

  if (index !== -1) {
    accountsData.splice(index, 1, updatedAcc);
    res.json(updatedAcc);
  } else res.json({ message: "account doesn't exist" });
});

router.delete('/:id', (req, res) => {
  const id = +req.params.id;
  const index = accountsData.findIndex((account) => account.id === id);

  if (index !== -1) {
    accountsData.splice(index, 1);
    res.json({ message: 'success' });
  } else res.json({ message: "account doesn't exist" });
});

module.exports = router;
