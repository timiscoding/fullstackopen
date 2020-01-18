import React from "react";
import Loading from "./LoadingView";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "Loading"
};

export const pending = () => (
  <Loading pending>
    <h2>This is loading</h2>
  </Loading>
);
export const loaded = () => (
  <Loading>
    <h2>This has loaded</h2>
  </Loading>
);

export const toggle = () => {
  const pending = boolean("Pending", true);
  return (
    <Loading pending={pending}>
      <h2>{pending ? "This is loading" : "This has loaded"}</h2>
    </Loading>
  );
};

toggle.story = {
  decorators: [withKnobs]
};
