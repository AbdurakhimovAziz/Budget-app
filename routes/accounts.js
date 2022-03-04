const express = require('express');
let accountsData = require('../public/accountsData');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(accountsData);
});

router.get('/:id', (req, res) => {
  const foundAcc = accountsData.find((acc) => acc.id === +req.params.id);
  if (foundAcc) res.send(foundAcc);
  else res.status(404).json({ message: "user doesn't exist" });
});

router.post('/', (req, res) => {
  const newAcc = req.body;
  console.log(newAcc);
  accountsData.push(newAcc);
  res.json(newAcc);
});

router.put('/:id', (req, res) => {
  const updatedAcc = req.body;
  console.log(updatedAcc);

  accountsData = accountsData.map((account) => (account.id === +req.params.id ? updatedAcc : account));
  res.json(updatedAcc);
});

router.delete('/:id', (req, res) => {
  accountsData = accountsData.filter((account) => account.id !== +req.params.id);
  res.json({ message: 'success' });
});

module.exports = router;
