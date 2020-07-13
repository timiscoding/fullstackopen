const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    unique: true,
    alias: "author",
  },
  born: Number,
});

// use populated virtual to retrieve total books by author
schema.virtual("bookCount", {
  ref: "Book",
  foreignField: "author",
  localField: "_id",
  count: true,
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", schema);
