const usersService = require('../services/users-service');
const issueJWT = require('../utils/utils');

class UsersController {
  async register(req, res) {
    try {
      const createdUser = await usersService.create(req.body);
      res.status(200).json(createdUser);
    } catch (error) {
      res.status(400).json({ message: 'user with this email already exists' });
    }
  }

  async login(req, res) {
    const user = await usersService.login(req.body.email, req.body.password);
    if (user) {
      const tokenObject = issueJWT(user);
      res.status(200).json(tokenObject);
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
      user ? res.status(200).json(user) : res.status(404).json({ message: "user doesn't exist" });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new UsersController();
