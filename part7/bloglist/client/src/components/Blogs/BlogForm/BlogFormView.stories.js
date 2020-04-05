import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import BlogForm from "./BlogFormView";
import { ADD_BLOG_SUCCESS } from "../../../constants/actionTypes";

export default {
  title: "Forms",
  decorators: [withKnobs]
};

export const Blog = () => (
  <BlogForm
    pending={boolean("pending")}
    toggleableOpen={boolean("toggleable open")}
    blogAdded={action("blog added")}
    addBlog={(...args) => {
      action("add blog")(...args);
      return Promise.resolve({ type: ADD_BLOG_SUCCESS });
    }}
  />
);
