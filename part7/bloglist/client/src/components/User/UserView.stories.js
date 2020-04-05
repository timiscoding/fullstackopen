import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import UserView from "./UserView";

const user = {
  id: "1",
  name: "Julia Dorf",
  username: "BlueMoon",
  blogs: [
    {
      id: "1",
      title: "Tourist’s candid photo goes viral",
      author: "Janine Puhak",
      url: "www.news.com.au",
      likes: 1000,
      commentCount: 38021,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title:
        "Central banks across the globe considering negative interest rates",
      author: "Alexis Carey",
      url: "www.news.com.au",
      likes: 32,
      commentCount: 32,
      createdAt: new Date().toISOString(),
    },
  ],
};

export default {
  title: "User",
  decorators: [withKnobs],
};

export const normal = () => (
  <UserView
    user={user}
    blogPage={{ currentPage: 1, lastPage: 2, items: user.blogs }}
    showActions={boolean("Logged in user", false)}
    pending={{
      user: boolean("Pending user", false),
      blogs: boolean("Pending blogs", false),
    }}
  />
);
