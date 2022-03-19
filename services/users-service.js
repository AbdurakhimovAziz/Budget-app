// const usersData = require('../public/usersData');
const bcrypt = require('bcrypt');
const UserDto = require('../controllers/mappings/user-dto');
const User = require('../models/users-model');

class UsersService {
  constructor() {
    // User.insertMany(usersData).then(() => {
    //   console.log('inserted');
    // });
  }

  create(user) {
    return new User(new UserDto(user)).save();
  }

  getAll() {
    return User.find();
  }

  getById(id) {
    return User.findById(id);
  }

  getByEmail(email) {
    return User.findOne({ email: email });
  }

  async login(email, password) {
    const user = await this.getByEmail(email);
    return user && bcrypt.compareSync(password, user.password) ? user : null;
  }
}

module.exports = new UsersService();
