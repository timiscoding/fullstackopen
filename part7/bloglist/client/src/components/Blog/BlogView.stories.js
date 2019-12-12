import React from "react";
import { action } from "@storybook/addon-actions";
import Blog from "./BlogView";

export default {
  title: "Blog"
};

const blog = [
  {
    title: "Top 5 things you should do",
    author: "Doris",
    url: "www.dostuff.com",
    likes: 32,
    user: {
      name: "John User"
    },
    createdAt: "2019-10-18T01:31:03.032Z",
    comments: Array(3).fill()
  },
  {
    title:
      "How to blog like a real professional: Tales from the jolly swagman as told by Australian great Banjo Patterson",
    author: "Jenkins Klaus Alexander Samantha Randolph the first",
    url: "www.how2bloganinfinitelylonguniformresourceindicator.com",
    likes: 10201,
    user: {
      name: "John User"
    },
    createdAt: "2019-10-18T01:31:03.032Z",
    comments: Array(323508).fill()
  }
];

export const normal = () => <Blog blog={blog[0]} onActions={{}} />;

export const overflow = () => (
  <div style={{ maxWidth: 380 }}>
    <Blog blog={blog[1]} onActions={{}} />
  </div>
);

export const loggedIn = () => (
  <Blog
    blog={blog[0]}
    onActions={{
      like: action("like blog"),
      delete: action("delete blog")
    }}
    pending={{ like: false, delete: false }}
  />
);
