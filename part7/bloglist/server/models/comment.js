const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: String
});

commentSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
