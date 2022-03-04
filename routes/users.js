const express = require('express');
const usersData = require('../public/usersData');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(usersData);
});

router.post('/', (req, res) => {
  const newUser = req.body;
  usersData.push(newUser);
  res.json(newUser);
});

router.get('/:id', (req, res) => {
  const foundUser = usersData.find((el) => el.id === +req.params.id);
  if (foundUser) res.json(foundUser);
  else res.status(404).json({ message: "user doesn't exist" });
});

module.exports = router;
