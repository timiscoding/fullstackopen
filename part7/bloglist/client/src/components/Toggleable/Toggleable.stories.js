import React from "react";
import Toggleable from "./";

export default {
  title: "Toggleable"
};

export const normal = () => (
  <Toggleable buttonLabel={() => <span>Toggle</span>}>
    <div>Peekaboo</div>
  </Toggleable>
);
