import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import BlogListView from "./BlogListView";
import { withKnobs, boolean } from "@storybook/addon-knobs";

const blogs = [
  {
    id: 1,
    title: "No rhyme nor reason",
    author: "Boris",
    likes: 0,
    commentCount: 2,
    url: "www.boriswrites.com"
  },
  {
    id: 2,
    title: "Holidays are great",
    author: "Grool",
    likes: 10138,
    commentCount: 14,
    url: "www.enlightenedblogs.com"
  }
];

const Wrapper = storyFn => {
  const [selected, setSelected] = useState(new Set());
  const onSelect = blogId => {
    const next = new Set(selected);
    next.has(blogId) ? next.delete(blogId) : next.add(blogId);
    action("ids selected")(Array.from(next));
    setSelected(next);
  };
  return <div>{storyFn({ onSelect, selected })}</div>;
};

export default {
  title: "BlogList",
  decorators: [withKnobs, Wrapper]
};

export const normal = () => {
  return (
    <BlogListView
      blogs={boolean("No blogs") ? [] : blogs}
      onLike={action("liked")}
      pending={boolean("Pending blogs")}
    />
  );
};

export const selectable = ({ onSelect, selected }) => {
  return (
    <BlogListView
      blogs={blogs}
      onLike={action("like blog")}
      selectable={boolean("selectable", true)}
      pending={boolean("Pending blogs")}
      onSelect={onSelect}
      selected={selected}
    />
  );
};
