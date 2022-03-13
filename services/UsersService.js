const usersData = require('../public/usersData');
const bcrypt = require('bcrypt');
const { mapUser } = require('../utils/utils');

class UsersService {
  create(user) {
    if (!this.getByEmail(user.email)) {
      const newUser = mapUser(user);
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

  getByEmail(email) {
    return usersData.find((el) => el.email === email);
  }

  login(email, password) {
    const user = this.getByEmail(email);
    return user && bcrypt.compareSync(password, user.password) ? user : null;
  }
}

module.exports = new UsersService();
