import React from "react";
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
      url: "www.news.com.au"
    },
    {
      id: "2",
      title:
        "Central banks across the globe considering negative interest rates",
      author: "Alexis Carey",
      url: "www.news.com.au"
    }
  ]
};

export default {
  title: "User"
};

export const empty = () => <UserView user={{ ...user, blogs: [] }} />;
export const normal = () => <UserView user={user} />;
