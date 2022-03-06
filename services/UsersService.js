const usersData = require('../public/usersData');

class UsersService {
  create(user) {
    if (usersData.findIndex((el) => el.email === user.email) === -1) {
      usersData.push(user);
      return user;
    } else return null;
  }

  getAll() {
    return usersData;
  }

  getOne(id) {
    return usersData.find((el) => el.id === id);
  }
}

module.exports = new UsersService();
