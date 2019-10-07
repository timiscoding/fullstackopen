const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);
const [initialUser] = helper.initialUsers;

beforeEach(async () => {
  await User.deleteMany();
  const user = new User(initialUser);
  await user.save();
});

describe('when db has initial user', () => {
  test('it returns json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('it returns the users', async () => {
    const response = await api.get('/api/users');
    expect(response.body.length).toBe(1);
  });
});

describe('addition of a user', () => {
  test('succeeds with status code 201 with valid data', async () => {
    const user = {
      username: 'uniquename',
      password: 'longerthan3chars',
      name: 'somename'
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201);

    expect(response.body.username).toBe(user.username);
    expect(response.body.name).toBe(user.name);
    expect(response.body.id).toBeDefined();
  });

  test('fails with status code 400 when username not given', async () => {
    const user = { password: 'validpassword', name: 'somename' };
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);
    expect(response.body.error).toContain('`username` is required');
  });

  test('fails with status code 400 when username too short', async () => {
    const user = { username: 'a', password: 'validpassword', name: 'somename' };
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);
    expect(response.body.error).toMatch(/username.*shorter.*minimum.*length/);
  });

  test('fails with status code 400 when username is taken', async () => {
    const response = await api
      .post('/api/users')
      .send(initialUser)
      .expect(400);

    expect(response.body.error).toContain('`username` to be unique');
  });

  test('fails with status code 400 when password too short', async () => {
    const user = { ...initialUser, password: 'a' };
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400);

    expect(response.body.error).toContain('Password length must be at least 3 characters');
  });
})

afterAll(() => {
  mongoose.connection.close();
});
