import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import Blog from "./BlogView";

export default {
  title: "Blog",
  decorators: [withKnobs]
};

const blog = [
  {
    title: "Top 5 things you should do",
    author: "Doris",
    url: "http://www.dostuff.com",
    likes: 32,
    user: {
      id: "idForHarry",
      username: "Harry Houdini"
    },
    createdAt: "2019-10-18T01:31:03.032Z",
    commentCount: 3
  },
  {
    title:
      "How to blog like a real professional: Tales from the jolly swagman as told by Australian great Banjo Patterson",
    author: "Jenkins Klaus Alexander Samantha Randolph the first",
    url: "http://www.how2bloganinfinitelylonguniformresourceindicator.com",
    likes: 10201,
    user: {
      id: "idForMegan",
      username: "Megan Marble"
    },
    createdAt: "2019-10-18T01:31:03.032Z",
    commentCount: 323508
  }
];

export const normal = () => {
  return (
    <Blog
      blog={blog[0]}
      onActions={{}}
      pending={{ blog: boolean("Pending blog") }}
    />
  );
};

export const overflow = () => (
  <div style={{ maxWidth: 380 }}>
    <Blog blog={blog[1]} onActions={{}} pending={{}} />
  </div>
);

export const loggedIn = () => {
  const pending = {
    blog: boolean("Pending blog"),
    delete: boolean("Deleting blog"),
    like: boolean("Liking blog")
  };
  return (
    <Blog
      blog={blog[0]}
      onActions={{
        like: action("like blog"),
        delete: action("delete blog")
      }}
      pending={pending}
    />
  );
};
