const usersService = require('../services/UsersService');

class UsersController {
  create(req, res) {
    const newUser = req.body;
    const createdUser = usersService.create(newUser);
    createdUser ? res.json(createdUser) : res.status(400).json({ message: 'user with this email already exists' });
  }

  getAll(req, res) {
    const users = usersService.getAll();
    res.json(users);
  }

  getOne(req, res) {
    const id = +req.params.id;
    const user = usersService.getOne(id);
    user ? res.json(user) : res.status(404).json({ message: "user doesn't exist" });
  }
}

module.exports = new UsersController();
