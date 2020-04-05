import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import BlogListView from "./BlogListView";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import faker from "faker";

const makeBlog = () => ({
  id: faker.random.uuid(),
  title: faker.random.words(),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  likes: faker.random.number(),
  commentCount: faker.random.number(),
  url: faker.internet.url(),
  createdAt: faker.date.past()
});

let blogs = [
  {
    id: "blog1",
    title: "No rhyme nor reason",
    author: "Boris",
    likes: 0,
    commentCount: 2,
    url: faker.internet.url()
  },
  ...Array(3)
    .fill()
    .map(makeBlog)
];

export default {
  title: "Blog List",
  decorators: [withKnobs]
};

export const Normal = () => {
  return (
    <BlogListView
      blogs={boolean("No blogs") ? [] : blogs}
      onLike={action("liked")}
      pending={boolean("Pending blogs")}
    />
  );
};

export const Selectable = () => {
  const [selected, setSelected] = useState(new Set());
  const onSelect = blogId => {
    const next = new Set(selected);
    next.has(blogId) ? next.delete(blogId) : next.add(blogId);
    action("ids selected")(Array.from(next));
    setSelected(next);
  };
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
