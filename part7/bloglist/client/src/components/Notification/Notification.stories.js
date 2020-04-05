import React, { useState } from "react";
import faker from "faker";
import Notification from "./NotificationView";
import { withKnobs, button, optionsKnob, number } from "@storybook/addon-knobs";

export default {
  title: "Notification",
  decorators: [
    withKnobs,
    storyFn => {
      return (
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
      );
    }
  ]
};

export const AlwaysShown = () => {
  const type = optionsKnob(
    "Type",
    { success: "success", error: "error" },
    "success",
    {
      display: "radio"
    }
  );
  return (
    <Notification notification={{ message: faker.lorem.sentence(), type }} />
  );
};

export const Generate = () => {
  const [notif, setNotif] = useState();
  const type = optionsKnob(
    "Type",
    { success: "success", error: "error" },
    "success",
    {
      display: "radio"
    }
  );
  button("New notification", () => {
    setNotif({ message: faker.lorem.sentence(), type });
  });
  return (
    <Notification
      notification={notif}
      onClear={() => setNotif(null)}
      timeoutMs={number("timeout (ms)", 5000, { step: 1000 })}
    />
  );
};
