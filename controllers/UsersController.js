const usersService = require('../services/UsersService');
const issueJWT = require('../utils/utils');

class UsersController {
  async register(req, res) {
    try {
      const newUser = req.body;
      const createdUser = await usersService.create(newUser);
      createdUser ? res.json(createdUser) : res.status(400).json({ message: 'user with this email already exists' });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async login(req, res) {
    const user = await usersService.login(req.body.email, req.body.password);
    if (user) {
      const tokenObject = issueJWT(user);
      res.json(tokenObject);
    } else {
      res.status(401).json({ message: 'wrong email or password' });
    }
  }

  async getAll(req, res) {
    try {
      const users = await usersService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await usersService.getById(id);
      user ? res.json(user) : res.status(404).json({ message: "user doesn't exist" });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}

module.exports = new UsersController();
