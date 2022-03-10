const usersData = require('../public/usersData');
const bcrypt = require('bcrypt');

class UsersService {
  create(user) {
    if (usersData.findIndex((el) => el.email === user.email) === -1) {
      const newUser = { ...user, password: bcrypt.hashSync(user.password, 10) };
      usersData.push(newUser);
      return newUser;
    } else return null;
  }

  getAll() {
    return usersData;
  }

  getOne(id) {
    return usersData.find((el) => el.id === id);
  }

  login(user) {}
}

module.exports = new UsersService();
