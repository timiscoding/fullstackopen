import React from "react";
import { action } from "@storybook/addon-actions";
import BlogListView from "./BlogListView";
import { withKnobs, boolean } from "@storybook/addon-knobs";

const blogs = [
  {
    id: 1,
    title: "No rhyme nor reason",
    author: "Boris",
    likes: 0,
    comments: Array(2).fill(),
    url: "www.boriswrites.com"
  },
  {
    id: 2,
    title: "Holidays are great",
    author: "Grool",
    likes: 10138,
    comments: Array(14).fill(),
    url: "www.enlightenedblogs.com"
  }
];

export default {
  title: "BlogList",
  decorators: [
    storyFn => (
      <div style={{ display: "flex", height: "100%" }}>{storyFn()}</div>
    )
  ]
};

export const normal = () => <BlogListView blogs={blogs} />;
export const skeleton = () => {
  const pending = boolean("Is fetching blogs?", true);
  return (
    <BlogListView
      blogs={pending ? undefined : blogs}
      onLike={action("liked")}
      pending={pending}
    />
  );
};

skeleton.story = {
  decorators: [withKnobs]
};
