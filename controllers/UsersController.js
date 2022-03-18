const usersService = require('../services/UsersService');
const issueJWT = require('../utils/utils');

class UsersController {
  async register(req, res) {
    const newUser = req.body;
    const createdUser = await usersService.create(newUser);
    createdUser ? res.json(createdUser) : res.status(400).json({ message: 'user with this email already exists' });
  }

  login(req, res) {
    const user = usersService.login(req.body.email, req.body.password);
    if (user) {
      const tokenObject = issueJWT(user);
      res.json(tokenObject);
    } else {
      res.status(401).json({ message: 'wrong email or password' });
    }
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
