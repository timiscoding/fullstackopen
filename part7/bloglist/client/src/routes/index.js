import Login from "../components/Login";
import Blogs from "../components/Blogs";
import Users from "../components/Users";
import User from "../components/User";
import Register from "../components/Register";
import Blog from "../components/Blog";
import Error from "../components/Error";

const routes = [
  {
    path: "/login",
    main: Login
  },
  {
    path: "/register",
    main: Register
  },
  {
    path: "/users",
    main: Users,
    exact: true
  },
  {
    path: "/users/:id",
    main: User
  },
  {
    path: ["/", "/blogs"],
    main: Blogs,
    exact: true
  },
  {
    path: "/blogs/:id",
    main: Blog
  },
  {
    path: "/error",
    main: Error
  }
];
export default routes;
