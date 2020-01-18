import React from "react";
import CommentList from "./CommentListView";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "CommentList",
  decorators: [withKnobs]
};

const comments = [
  { body: "Lights flashing", createdAt: new Date().toISOString() },
  { body: "Advent of Code", createdAt: new Date().toISOString() },
  { body: "Santa Claus", createdAt: new Date().toISOString() },
  { body: "Naughty list", createdAt: new Date().toISOString() }
];

export const normal = () => {
  const noComments = boolean("No comments");
  return (
    <CommentList
      comments={noComments ? [] : comments}
      pending={boolean("Pending comments")}
    />
  );
};
