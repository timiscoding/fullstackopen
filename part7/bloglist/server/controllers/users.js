const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find().populate("blogs", {
      url: 1,
      title: 1,
      author: 1
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("blogs", {
      url: 1,
      title: 1,
      author: 1
    });
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
