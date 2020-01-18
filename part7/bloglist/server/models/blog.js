const mongoose = require("mongoose");
const User = require("../models/user");
const Comment = require("../models/comment");

const schemaOptions = { timestamps: true };

const blogSchema = mongoose.Schema(
  {
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
    }
  },
  schemaOptions
);

blogSchema.virtual("commentCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blog",
  count: true
});

blogSchema.index({ title: 1 });
blogSchema.index({ likes: 1 });
blogSchema.index({ createdAt: 1 });

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
  },
  virtuals: true
});

const withUserAndComments = async docs => {
  if (!Array.isArray(docs)) docs = [docs];
  const promises = docs.map(doc => {
    if (!doc) return;
    return doc
      .populate("commentCount")
      .populate("user")
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
  await Comment.deleteMany({ blog: blog._id });
};

const addBlogToUser = async blog => {
  const user = await User.findById(blog.user._id);
  if (user.blogs.includes(blog.id)) return;
  user.blogs = [...user.blogs, blog.id];
  await user.save();
};

async function deleteAllBlogsFromUser() {
  const filter = this.getFilter();
  const user = await User.findById(filter.user);
  user.blogs = user.blogs.filter(
    objId => !filter._id.$in.includes(objId._id.toString())
  );
  await user.save();
}

// verifies all blogs marked for deleting belong to the user logged in
async function canUserDeleteBlogs() {
  const filter = this.getFilter();
  const blogsFound = await Blog.countDocuments(filter);
  if (filter._id.$in.length !== blogsFound) {
    const err = new Error("Unauthorised to delete specified blog ids");
    err.name = "ValidationError";
    throw err;
  }
}

async function deleteCommentsFromAllBlogs() {
  const filter = this.getFilter();
  const blogIds = filter._id.$in;
  for (let blog of blogIds) {
    await Comment.deleteMany({ blog });
  }
}

blogSchema.post("save", addBlogToUser);
blogSchema.post("findOneAndDelete", deleteBlogFromUser);
blogSchema.post("findOneAndDelete", deleteCommentsFromBlog);

blogSchema.pre("deleteMany", canUserDeleteBlogs);
blogSchema.pre("deleteMany", deleteAllBlogsFromUser);
blogSchema.pre("deleteMany", deleteCommentsFromAllBlogs);

blogSchema.post("save", withUserAndComments);
blogSchema.post("findOneAndUpdate", withUserAndComments);
blogSchema.post("find", withUserAndComments);
blogSchema.post("findOne", withUserAndComments);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
