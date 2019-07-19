const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper.js');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArr = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArr);
});

describe('when there are initial some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs should be returned', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    expect(blogs.length).toBe(helper.initialBlogs.length);
  });

  test('a blog should have an id property', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    expect(blogs[0].id).toBeDefined();
  });
});

describe('viewing a single blog', () => {
  test('succeeds with status code 200 when given a valid id', async () => {
    const blogs = await helper.blogsInDb();
    const blogToView = blogs[0];
    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200);
    expect(response.body).toMatchObject(blogToView);
  });

  test('fails with status code 404 when given a nonexisting blog id', async () => {
    const nonExistentBlogId = await helper.nonExistentBlogId();
    await api
      .get(`/api/blogs/${nonExistentBlogId}`)
      .expect(404);
  });

  test('fails with status code 400 when given an invalid blog id', async () => {
    const invalidBlogId = "disinvalidmongoid123";
    await api
      .get(`/api/blogs/${invalidBlogId}`)
      .expect(400);
  });
});

describe('updating a blog', () => {
  test('succeeds with status code 200 when given valid data', async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const updatedBlog = { likes: blogToUpdate.likes + 1 };
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    const { body: { likes }} = response;
    expect(likes).toBe(updatedBlog.likes);
  });
});

describe('addition of a blog', () => {
  test('succeeds with status code 201 with valid data', async () => {
    const newBlog = {
      title: 'hyzer crimp bucket',
      author: 'brian shaw',
      url: 'http://www.msn.com'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map(({ author, title, url }) => ({ author, title, url }))
    expect(contents).toContainEqual(newBlog);
  });

  test('succeeds with status code 201 when no likes data is given', async () => {
    const blogNoLikes = {
      title: 'i haz no likes',
      url: 'http://www.iloveevil.com',
      author: 'johnny bach'
    };

    const response = await api
      .post('/api/blogs')
      .send(blogNoLikes)
      .expect(201);

    const savedBlog = response.body;
    expect(savedBlog.likes).toBe(0);
  });

  test('fails with status code 400 when no title and url data are given', async () => {
    const invalidBlog = {
      author: 'Freddy Chopin',
      likes: 2
    };

    await api
      .post('/api/blogs')
      .send(invalidBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 when given a valid id', async () => {
    const blogs = await helper.blogsInDb();
    const blogToDelete = blogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
  });
});

afterAll(() => mongoose.connection.close());
