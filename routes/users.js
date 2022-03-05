const express = require('express');
const usersData = require('../public/usersData');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(usersData);
});

router.post('/', (req, res) => {
  const newUser = req.body;
  if (usersData.findIndex((el) => el.id === newUser.id) === -1) {
    usersData.push(newUser);
    res.json(newUser);
  } else res.json({ message: 'user with this id already exists' });
});

router.get('/:id', (req, res) => {
  const id = +req.params.id;
  const foundUser = usersData.find((el) => el.id === id);
  if (foundUser) res.json(foundUser);
  else res.status(404).json({ message: "user doesn't exist" });
});

module.exports = router;
