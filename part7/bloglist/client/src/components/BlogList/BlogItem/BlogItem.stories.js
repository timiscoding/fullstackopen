import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import BlogItem from ".";

const Wrapper = storyFn => {
  const [selected, setSelected] = useState(false);
  const onSelect = val => {
    action(`selected val: ${val}`)();
    setSelected(!selected);
  };
  return <div>{storyFn({ selected, onSelect })}</div>;
};

export default {
  title: "BlogItem",
  decorators: [withKnobs, Wrapper]
};

const blog = {
  id: 1,
  title: "Watermelon",
  author: "Oscar",
  likes: 2,
  commentCount: 12,
  createdAt: new Date().toISOString()
};

export const normal = ({ selected, onSelect }) => {
  return (
    <BlogItem
      blog={blog}
      selectable={boolean("Selectable")}
      onSelect={onSelect}
      selected={selected}
      pending={boolean("Pending")}
    />
  );
};
