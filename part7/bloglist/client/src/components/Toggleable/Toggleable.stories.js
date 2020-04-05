import React from "react";
import { action } from "@storybook/addon-actions";
import Toggleable from "./";
import AddIcon from "../../icons/add.svg";

export default {
  title: "Toggleable",
};

export const normal = () => (
  <Toggleable buttonLabel="Toggle" buttonIcon={AddIcon}>
    {(opened) => {
      action(`Toggle opened render prop: ${opened}`)();
      return <div>Peekaboo</div>;
    }}
  </Toggleable>
);
