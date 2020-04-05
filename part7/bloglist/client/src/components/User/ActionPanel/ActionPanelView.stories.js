import React from "react";
import ActionPanel from ".";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

export default {
  title: "ActionPanel",
  decorators: [withKnobs],
};

export const normal = () => (
  <ActionPanel
    deleteMode={boolean("delete mode", false)}
    checkAll={boolean("check all", false)}
    isMobile={boolean("is mobile", true)}
    pending={boolean("pending", false)}
    deleteCount={number("delete count", 0)}
    disableDelete={boolean("disable delete", false)}
  />
);
