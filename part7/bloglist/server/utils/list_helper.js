const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 1
    ? blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
    : blogs.length === 1
    ? blogs[0].likes
    : 0;
};

const favouriteBlog = (blogs) => {
  const fave = blogs.length > 1
    ? blogs.reduce((favBlog, blog) => blog.likes > favBlog.likes ? blog : favBlog)
    : blogs.length === 1
    ? blogs[0]
    : null;

  return fave ? { author: fave.author, title: fave.title, likes: fave.likes } : null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return { author: blogs[0].author, blogs: 1 };

  return _.chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .maxBy('blogs')
    .value();
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  if (blogs.length === 1) return { author: blogs[0].author, likes: blogs[0].likes };

  return _.chain(blogs)
    .groupBy('author')
    .mapValues(blogs => blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0))
    .map((likes, author) => ({ author, likes }))
    .maxBy('likes')
    .value();
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
