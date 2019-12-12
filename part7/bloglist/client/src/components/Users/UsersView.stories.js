import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import UsersView from "./UsersView";

const users = [
  {
    id: "1",
    name: "abel",
    blogs: Array(3).fill()
  },
  {
    id: "2",
    name: "jobe",
    blogs: Array(12).fill()
  },
  {
    id: "3",
    name: "nancy",
    blogs: Array(8).fill()
  }
];

export default {
  title: "Users"
};

export const normal = () => (
  <UsersView users={users} onUserClick={action("clicked user")} />
);

export const loading = () => (
  <UsersView
    users={boolean("Loading users?", true) ? null : users}
    onUserClick={action("clicked user")}
  />
);

loading.story = {
  decorators: [withKnobs]
};
