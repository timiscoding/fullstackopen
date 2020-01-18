const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  try {
    let { offset, limit, sort } = req.query;
    offset = Number(offset);
    limit = Number(limit);
    if (!Number.isInteger(offset) || !Number.isInteger(limit) || offset < 0) {
      return res.status(400).end();
    }
    const count = await User.estimatedDocumentCount({});
    let query = User.aggregate([
      {
        $project: {
          _id: 0,
          id: "$_id",
          username: 1,
          name: 1,
          blogCount: { $size: "$blogs" }
        }
      }
    ]);

    const SORT_BY = [
      "name-asc",
      "name-desc",
      "blogCount-asc",
      "blogCount-desc",
      "username-asc",
      "username-desc"
    ];
    if (SORT_BY.includes(sort)) {
      const [type, order] = sort.split("-");
      query = query.sort({ [type]: order }).collation({ locale: "en" });
    }
    const users = await query.skip(offset).limit(limit);
    res.json({ count, items: users });
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).end();
    }

    if (user) {
      return res.json(user);
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    if (body.password.length < 3) {
      return res.status(400).json({
        error: "Password length must be at least 3 characters"
      });
    }
    const saltRounds = 10;
    const user = {
      username: body.username,
      name: body.name,
      passwordHash: bcrypt.hashSync(body.password, saltRounds)
    };

    const newUser = new User(user);
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
