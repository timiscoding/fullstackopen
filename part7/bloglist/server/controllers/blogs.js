const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

blogsRouter.get("/", async (req, res, next) => {
  try {
    let { offset, limit, sort, userId } = req.query;
    offset = Number(offset);
    limit = Number(limit);

    if (userId && !mongoose.isValidObjectId(userId)) {
      throw new mongoose.Error.CastError("ObjectId");
    }

    let blogCount;
    if (userId) {
      blogCount = (await User.findById(userId)).blogs.length;
    } else {
      blogCount = await Blog.estimatedDocumentCount();
    }

    if (blogCount === 0) {
      return res.json({ count: 0, items: [] });
    }

    if (
      !Number.isInteger(offset) ||
      !Number.isInteger(limit) ||
      offset < 0 ||
      offset >= blogCount
    ) {
      return res.status(404).end();
    }

    let query = Blog.find(userId ? { user: userId } : {});
    const SORT_BY = [
      "createdAt-asc",
      "createdAt-desc",
      "title-asc",
      "title-desc",
      "likes-asc",
      "likes-desc"
    ];
    if (SORT_BY.includes(sort)) {
      const [type, order] = sort.split("-");
      // collation enables text to be sorted case insensitive
      query = query.sort({ [type]: order }).collation({ locale: "en" });
    }

    const blogs = await query.skip(offset).limit(limit);
    res.json({ count: blogCount, items: blogs });
  } catch (err) {
    next(err);
  }
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

blogsRouter.delete("/", async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids) {
      return res.status(400).json({
        error: "Missing 'ids' field in request body"
      });
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({
        error: "deletion could not proceed due to invalid user id"
      });
    }

    await Blog.deleteMany()
      .where("_id")
      .in(ids)
      .where("user")
      .eq(user._id.toString());
    res.status(204).end();
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
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(400)
        .json({ error: "Cannot add comment for non existent blog id" });
    }
    const comment = new Comment({ body: req.body.comment, blog: blog._id });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
});

blogsRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const { id: blog } = req.params;
    let { offset, limit, sort } = req.query;
    offset = Number(offset);
    limit = Number(limit);
    if (!Number.isInteger(offset) || !Number.isInteger(limit) || offset < 0) {
      return res.status(404).end();
    }
    const count = await Comment.countDocuments({ blog });
    let query = Comment.find({ blog });

    const SORT_BY = ["createdAt-desc", "createdAt-asc"];
    if (SORT_BY.includes(sort)) {
      const [field, order] = sort.split("-");
      query = query.sort({ [field]: order });
    }

    const comments = await query.skip(offset).limit(limit);
    res.json({ count, items: comments });
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
