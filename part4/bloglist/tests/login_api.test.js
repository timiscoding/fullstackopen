const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);
const [initialUser] = helper.initialUsers;

beforeEach(async () => {
  await User.deleteMany();

  const user = new User(initialUser);
  await user.save();
});

describe('when db has initial user', () => {
  test('login succeeds with status 200 with correct credentials', async () => {
    const response = await api
      .post('/api/login')
      .send(initialUser)
      .expect(200)
      .expect('content-type', /application\/json/);

    expect(response.body.token).toBeDefined();
  });

  test('login fails with status 401 with incorrect password', async () => {
    await api
      .post('/api/login')
      .send({ ...initialUser, password: 'incorrectpass' })
      .expect(401);
  });

  test('login fails with status 401 with invalid username', async () => {
    await api
      .post('/api/login')
      .send({ username: 'nonexistentuser', password: 'incorrectpass' })
      .expect(401);
  });
});

afterAll(() => mongoose.connection.close());
