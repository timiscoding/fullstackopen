import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import UsersView from "./UsersView";

const users = [
  {
    id: "1",
    username: "zerocool",
    name: "abel",
    blogCount: 3,
  },
  {
    id: "2",
    username: "morpheus",
    name: "jobe",
    blogCount: 12,
  },
  {
    id: "3",
    username: "powerpuff",
    name: "nancy",
    blogCount: 8,
  },
];

export default {
  title: "Users",
  decorators: [withKnobs],
};

export const normal = () => (
  <UsersView
    users={boolean("No users", false) ? [] : users}
    onUserClick={action("clicked user")}
    pending={boolean("Pending", false)}
  />
);
