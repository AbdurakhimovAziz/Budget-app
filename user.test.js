const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

describe('user', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Test example', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true);
    });

    it('should return all users', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });
  });
});
