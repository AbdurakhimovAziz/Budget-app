const UsersService = require('../services/UsersService');

class UsersController {
  create(req, res) {
    const newUser = req.body;
    if (UsersService.create(newUser)) res.json(newUser);
    else res.json({ message: 'user with this id already exists' });
  }

  getAll(req, res) {
    const users = UsersService.getAll();
    res.json(users);
  }

  getOne(req, res) {
    const id = +req.params.id;
    const user = UsersService.getOne(id);
    if (user) res.json(user);
    else res.status(404).json({ message: "user doesn't exist" });
  }
}

module.exports = new UsersController();
