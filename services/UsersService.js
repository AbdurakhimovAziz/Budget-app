const usersData = require('../public/usersData');
const bcrypt = require('bcrypt');
const UserDto = require('../controllers/mappings/UserDto');
const User = require('../models/users');

class UsersService {
  constructor() {
    // User.insertMany(usersData).then(() => {
    //   console.log('inserted');
    // });
    this.getByEmail('rs@mail.com').then((data) => console.log(data));
  }

  async create(user) {
    if (!(await this.getByEmail(user.email))) {
      // usersData.push(newUser);
      const newUser = new User(new UserDto(user));
      await newUser.save();
      console.log(newUser);
      return newUser;
    } else return null;
  }

  getAll() {
    return usersData;
  }

  getOne(id) {
    return usersData.find((el) => el.id === id);
  }

  async getByEmail(email) {
    return await User.findOne({ email: email });
    // return usersData.find((el) => el.email === email);
  }

  login(email, password) {
    const user = this.getByEmail(email);
    return user && bcrypt.compareSync(password, user.password) ? user : null;
  }
}

module.exports = new UsersService();
