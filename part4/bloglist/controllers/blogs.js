const blogsRouter = require('express').Router();
const Blog = require('../models//blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).send(blog);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
