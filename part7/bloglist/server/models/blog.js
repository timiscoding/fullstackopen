const mongoose = require("mongoose");
const User = require("../models/user");
const Comment = require("../models/comment");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    if (!doc.user) {
      ret.user = {};
    } else {
      // when .populate('user') used, user will be an object
      // when populate unused, user will be string id
      ret.user = doc.user.toJSON();
    }
    delete ret._id;
    delete ret.__v;
  }
});

const withUserAndComments = async docs => {
  if (!Array.isArray(docs)) docs = [docs];
  const promises = docs.map(doc => {
    if (!doc) return;
    return doc
      .populate("user")
      .populate("comments")
      .execPopulate();
  });
  await Promise.all(promises);
};

const deleteBlogFromUser = async blog => {
  const user = await User.findById(blog.user._id);
  user.blogs = user.blogs.filter(objId => objId._id.toString() !== blog.id);
  await user.save();
};

const deleteCommentsFromBlog = async blog => {
  const { comments } = blog;
  const commentIds = comments.map(comment => comment._id);
  await Comment.deleteMany()
    .where("_id")
    .in(commentIds);
};

const addBlogToUser = async blog => {
  const user = await User.findById(blog.user._id);
  if (user.blogs.includes(blog.id)) return;
  user.blogs = [...user.blogs, blog.id];
  await user.save();
};

blogSchema.post("save", addBlogToUser);
blogSchema.post("findOneAndDelete", deleteBlogFromUser);
blogSchema.post("findOneAndDelete", deleteCommentsFromBlog);

blogSchema.post("save", withUserAndComments);
blogSchema.post("findOneAndUpdate", withUserAndComments);
blogSchema.post("find", withUserAndComments);
blogSchema.post("findOne", withUserAndComments);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
