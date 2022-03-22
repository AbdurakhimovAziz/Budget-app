const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users-model');

const bodies = [
  { email: 'example@gmail.com', password: '12345' },
  { email: 'example@mail.com', password: '123456' },
  {},
];

describe('Test users route', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toBeDefined();
    });
  });

  describe('GET /users/:id', () => {
    it('should return one user if id is valid', async () => {
      const response = await request(app).get('/users/6235fb7e280289ab63b414fa');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toMatchObject({
        _id: expect.anything(),
        email: expect.any(String),
        password: expect.any(String),
      });
    });

    it('should return error message if id is invalid', async () => {
      const response = await request(app).get('/users/6235fb7e280289ab63b41455');

      expect(response.status).toBe(404);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toEqual({ message: "user doesn't exist" });
    });
  });

  describe('POST /users/login', () => {
    it('should return token when the request is valid', async () => {
      const response = await request(app).post('/users/login').send({ email: 'example@mail.com', password: '12345' });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toEqual({
        token: expect.any(String),
        expires: '1h',
      });
    });

    it('should return error message when the request is invalid', async () => {
      for (body of bodies) {
        const response = await request(app).post('/users/login').send(body);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'wrong email or password' });
      }
    });
  });

  describe('POST /users/register', () => {
    it('should return new user when the request is valid', async () => {
      await User.deleteOne({ email: 'abcd@gmail.com' });
      const user = {
        email: 'abcd@gmail.com',
        firstName: 'testName',
        lastName: 'testLast',
        gender: 'male',
        role: 'user',
        country: 'UK',
      };

      const response = await request(app)
        .post('/users/register')
        .send({ password: '12345', dob: new Date(2000, 5, 5), ...user });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
      expect(response.body).toMatchObject({
        _id: expect.anything(),
        password: expect.any(String),
        dob: expect.any(String),
        ...user,
      });
    });

    it('should return error message when the request is invalid', async () => {
      for (body of bodies) {
        const response = await request(app).post('/users/register').send(body);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: expect.any(String) });
      }
    });
  });
});
