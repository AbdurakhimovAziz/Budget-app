const bcrypt = require('bcrypt');

class UserDto {
  constructor(user) {
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, 10);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.dob = user.dob;
    this.gender = user.gender;
    this.country = user.country;
    this.role = user.role;
  }
}

module.exports = UserDto;
