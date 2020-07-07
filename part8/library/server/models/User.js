const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model("User", schema);
