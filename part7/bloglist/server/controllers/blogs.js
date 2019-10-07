const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
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

blogsRouter.post("/", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ ...req.body, user: user._id });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const blogToDelete = await Blog.findById(req.params.id);
    const user = await User.findById(decodedToken.id);
    if (
      blogToDelete.user &&
      blogToDelete.user._id.toString() !== user._id.toString()
    ) {
      return res.status(401).json({
        error: "deletion permitted by creator only"
      });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const blogToUpdate = await Blog.findById(req.params.id);
    const comment = new Comment({ body: req.body.comment });
    const savedComment = await comment.save();
    const comments = [savedComment._id, ...blogToUpdate.comments];
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogToUpdate.id,
      { comments },
      { new: true }
    );
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
