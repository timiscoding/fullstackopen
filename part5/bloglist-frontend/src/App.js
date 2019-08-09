import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import loginService from './services/login';
import blogsService from './services/blogs';

const loggedInUserKey ='loggedInBlogappUser';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });
  const blogFormRef = React.createRef();

  const addUserId = user => {
    const [, tokenData] = user.token.split('.');
    const decodedTokenData = JSON.parse(atob(tokenData));
    return { ...user, id: decodedTokenData.id };
  };

  const checkLogin = () => {
    const loggedUserJSON = window.localStorage.getItem(loggedInUserKey);
    if (!loggedUserJSON) return;
    const loggedUser = addUserId(JSON.parse(loggedUserJSON));
    setUser(loggedUser);
    blogsService.setToken(loggedUser.token);
  };

  const getBlogs = () => {
    (async  () => {
      const blogs = await blogsService.getAll();
      setBlogs(blogs);
    })();
  };

  useEffect(getBlogs, []);
  useEffect(checkLogin, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(addUserId(user));
      window.localStorage.setItem(loggedInUserKey, JSON.stringify(user));
      blogsService.setToken(user.token);
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(loggedInUserKey);
    setUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const savedBlog = await blogsService.addBlog(blog);
      blogFormRef.current.toggleVisible();
      setBlogs(blogs.concat(savedBlog));
      showSuccessMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
    } catch (err) {
      showErrorMessage(err.message);
      throw Error(err);
    }
  };

  const showSuccessMessage = (message) => {
    showMessage(message, 'success');
  };

  const showErrorMessage = (message) => {
    showMessage(message, 'error');
  };

  const showMessage = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null }), 5000);
  };

  const addLike = async ({ author, title, url, likes, user, id }) => {
    try {
      const likedBlog = { author, title, url, user: user.id, likes: likes + 1 };
      const updatedBlog = await blogsService.updateBlog(id, likedBlog);
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  const deleteBlog = async ({ id, title, author }) => {
    try {
      const ok = window.confirm(`Delete ${title} by ${author}?`);
      if (!ok) return;
      await blogsService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      showSuccessMessage(`Deleted blog ${title} by ${author}`);
    } catch (err) {
      showErrorMessage(err.message);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to the application</h2>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>);
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <Toggleable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      {blogs
        .sort((a,b) => a.likes-b.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={addLike}
            onDelete={deleteBlog}
            canDelete={blog.user.id ? blog.user.id === user.id : true}
          />
        ))}
    </div>
  );
}

export default App;
