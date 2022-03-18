const usersData = [
  {
    id: 1,
    email: 'example@mail.com',
    password: '$2b$10$QR01iOjI8wgOQ.H3eHDld.BkIpLOzgDBcRk7FNBNwDdAPKwvkcIJC', // '12345'
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date(1999, 2, 11),
    gender: 'male',
    country: 'USA',
    role: 'user',
  },
  {
    id: 2,
    email: 'example1@mail.com',
    password: '$2b$10$pDwpMRhOmHFAkuX5/OeRHenHrAtmRpgPjNToCA.RqVIQS/XEBatQi', // 'adfhdaj'
    firstName: 'Mary',
    lastName: 'Jane',
    dob: new Date(1995, 8, 25),
    gender: 'female',
    country: 'UK',
    role: 'user',
  },
  {
    id: 3,
    email: 'example2@mail.com',
    password: '$2b$10$5GX1825Jlhg9DFnv9Lfl5.nLdbFbQycknYBWVxyDk/jfEUb8xCYeG', // 'qwerty'
    firstName: 'Aziz',
    lastName: 'Abdurakhimov',
    dob: new Date(2002, 9, 15),
    gender: 'male',
    country: 'Uzbekistan',
    role: 'admin',
  },
];

module.exports = usersData;
