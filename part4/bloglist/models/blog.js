const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
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
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
