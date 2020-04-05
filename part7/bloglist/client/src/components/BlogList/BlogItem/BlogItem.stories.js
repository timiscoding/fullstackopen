import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BlogItem from ".";

export default {
  title: "Blog List",
  decorators: [withKnobs]
};

const blog = {
  id: "blog1",
  title: "Watermelon",
  author: "Oscar",
  url: "http://www.fruit.com",
  likes: 2,
  commentCount: 12,
  createdAt: new Date().toISOString()
};

export const BlogItemStory = () => {
  const [selected, setSelected] = useState(false);
  const onSelect = val => {
    action(`selected val: ${val}`)();
    setSelected(!selected);
  };
  const onLike = () => action("Liked blog")();
  return (
    <BlogItem
      blog={blog}
      selectable={boolean("Selectable")}
      onSelect={onSelect}
      selected={selected}
      pending={boolean("Pending")}
      onLike={onLike}
    />
  );
};

BlogItemStory.story = { name: "Blog Item" };
