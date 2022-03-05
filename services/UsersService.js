const usersData = require('../public/usersData');

class UsersService {
  create(user) {
    if (usersData.findIndex((el) => el.id === user.id) === -1) {
      usersData.push(user);
      return user;
    } else return null;
  }

  getAll() {
    return usersData;
  }

  getOne(id) {
    const foundUser = usersData.find((el) => el.id === id);
    return foundUser ? foundUser : null;
  }
}

module.exports = new UsersService();
