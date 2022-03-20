const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');
// const accounts = require('./accounts');

// const express = require('express');
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use('/', accounts);

describe('app', () => {
  // beforeAll(async (done) => {
  //   await mongoose.disconnect();
  //   await mongoose.connect(
  //     'mongodb+srv://Aziz:20025101@budgetify.1j5ou.mongodb.net/Budgetify?retryWrites=true&w=majority'
  //   );
  // });

  // afterAll(async (done) => {
  //   await mongoose.disconnect();
  // });

  describe('Test example', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true);
    });

    it('GET /', (done) => {
      request(app).get('/').expect('Content-Type', /json/).expect(200);
    });
  });
});
