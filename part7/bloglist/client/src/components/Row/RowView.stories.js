import React from "react";
import {
  withKnobs,
  number,
  radios,
  text,
  boolean,
} from "@storybook/addon-knobs";
import Row from "./";
import Button from "../Button";

export default {
  title: "Row",
  decorators: [withKnobs],
};

export const normal = () => (
  <Row
    cols={number("cols", 2)}
    justify={radios(
      "justify (justify-content values)",
      {
        start: "start",
        center: "center",
        end: "end",
        "space-around": "space-around",
        "space-between": "space-between",
      },
      "start"
    )}
    colWidth={text("colWidth", "auto")}
    noResponsive={boolean("noResponsive", false)}
  >
    <Button>Do the thing</Button>
    <Button>Cancel thing</Button>
    <a href="/#">Thingaloo</a>
  </Row>
);
