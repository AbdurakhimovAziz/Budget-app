// const usersData = require('../public/usersData');
const bcrypt = require('bcrypt');
const UserDto = require('../controllers/mappings/UserDto');
const User = require('../models/users');

class UsersService {
  constructor() {
    // User.insertMany(usersData).then(() => {
    //   console.log('inserted');
    // });
  }

  async create(user) {
    if (!(await this.getByEmail(user.email))) {
      const newUser = new User(new UserDto(user));
      await newUser.save();
      return newUser;
    } else return null;
  }

  async getAll() {
    return User.find();
  }

  async getById(id) {
    return User.findById(id);
  }

  async getByEmail(email) {
    return User.findOne({ email: email });
  }

  async login(email, password) {
    const user = await this.getByEmail(email);
    return user && bcrypt.compareSync(password, user.password) ? user : null;
  }
}

module.exports = new UsersService();
