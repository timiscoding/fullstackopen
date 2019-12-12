/* eslint-disable react/display-name */
import React from "react";
import Notification from "./NotificationView";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "Notification",
  decorators: [
    storyFn => (
      <div
        style={{
          border: "1px solid rgba(75%, 25%, 0%, .5)",
          marginTop: 20,
          width: "75%",
          height: "200%",
          margin: "20px auto"
        }}
      >
        <div
          style={{
            position: "fixed",
            width: "75%",
            border: "1px solid black",
            height: 40
          }}
        >
          Header
          {storyFn()}
        </div>
      </div>
    )
  ]
};

const toggleNotification = notification => () => (
  <Notification
    notification={boolean("Enable notification?", false) ? notification : null}
  />
);

export const success = () => (
  <Notification notification={{ message: "Hurray", type: "success" }} />
);

export const error = () => (
  <Notification notification={{ message: "Oh no", type: "error" }} />
);

export const successAnimation = toggleNotification({
  message: "I did the thing",
  type: "success"
});
successAnimation.story = {
  decorators: [withKnobs]
};

export const errorAnimation = toggleNotification({
  message: "The thing didn't work",
  type: "error"
});
errorAnimation.story = {
  decorators: [withKnobs]
};
