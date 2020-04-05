import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import CommentForm from "./CommentFormView";

export default {
  title: "Forms",
  decorators: [withKnobs]
};

export const Comment = () => (
  <CommentForm onComment={action("submitting")} pending={boolean("pending")} />
);
